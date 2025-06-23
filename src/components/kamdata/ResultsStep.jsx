import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { questions } from '@/components/kamdata/testConfig';
import ResultsSummaryCard from '@/components/kamdata/results/ResultsSummaryCard';
import ResultsBarChart from '@/components/kamdata/results/ResultsBarChart';
import ResultsSectionCards from '@/components/kamdata/results/ResultsSectionCards';
import ResultsActions from '@/components/kamdata/results/ResultsActions';
import PdfContent from '@/components/kamdata/results/PdfContent';
import ResultsInterpretation from '@/components/kamdata/results/ResultsInterpretation'; 
import StrategicSessionCTA from '@/components/kamdata/results/StrategicSessionCTA';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Cog, Sprout, BarChart3 } from 'lucide-react';
import { SECTION_COLORS } from '@/App';

const ResultsStep = ({
  formData,
  answers,
  calculateRawScore,
  calculateScorePercent,
  getScoreLevel,
  getOverallScorePercent,
  getInterpretation,
  logoSrc, 
  onOpenCommunityModal
}) => {
  const { toast } = useToast();
  const resultsRef = useRef(null);
  const pdfContentRef = useRef(null);

  const agilRawScore = calculateRawScore(answers.agil);
  const crecimientoRawScore = calculateRawScore(answers.crecimiento);
  const exponencialRawScore = calculateRawScore(answers.exponencial);

  const agilScorePercent = calculateScorePercent(answers.agil);
  const crecimientoScorePercent = calculateScorePercent(answers.crecimiento);
  const exponencialScorePercent = calculateScorePercent(answers.exponencial);
  
  const overallScorePercent = getOverallScorePercent();
  const overallLevel = getScoreLevel(overallScorePercent);

  const totalRawScore = agilRawScore + crecimientoRawScore + exponencialRawScore;
  const totalMaxScore = (questions.agil.length + questions.crecimiento.length + questions.exponencial.length) * 4;

  const getPuntosFuertes = () => {
    const fuertes = [];
    if (overallScorePercent >= 85) { 
        if (agilScorePercent >= 80) fuertes.push("Navegas la incertidumbre con claridad y resuelves problemas rápidamente (Mentalidad Ágil).");
        if (crecimientoScorePercent >= 80) fuertes.push("Tu apertura al aprendizaje y a la retroalimentación te impulsa constantemente (Mentalidad de Crecimiento).");
        if (exponencialScorePercent >= 80) fuertes.push("Tienes una visión estratégica y ya estás utilizando herramientas digitales para escalar (Mentalidad Exponencial).");
         if (fuertes.length < 2 && (agilScorePercent + crecimientoScorePercent + exponencialScorePercent)/3 >=80) fuertes.push("Mentalidad digital proactiva y sólida en múltiples dimensiones.")
    } else if (overallScorePercent >= 60) { 
        if (agilScorePercent >= 60) fuertes.push("Te adaptas a los cambios, aunque a veces necesites un empujón (Mentalidad Ágil).");
        if (crecimientoScorePercent >= 60) fuertes.push("Estás dispuesto/a a aprender de tus errores y a mejorar con la práctica (Mentalidad de Crecimiento).");
        if (exponencialScorePercent >= 60) fuertes.push("Empiezas a explorar nuevas tecnologías y a pensar en un mayor alcance (Mentalidad Exponencial).");
        if (fuertes.length < 2 && (agilScorePercent + crecimientoScorePercent + exponencialScorePercent)/3 >=60) fuertes.push("Identificas la importancia del esfuerzo y la mejora continua.")
    } else { 
        if (formData.info_mentorias) fuertes.push("Mostrar interés en mentorías es un gran primer paso hacia el crecimiento.");
        fuertes.push("Completar este test demuestra tu disposición a identificar áreas de mejora.");
        if (agilScorePercent > 30 || crecimientoScorePercent > 30 || exponencialScorePercent > 30) fuertes.push("Algunas de tus respuestas reflejan una conciencia inicial de los hábitos digitales clave.");
    }
    return fuertes.length > 0 ? fuertes : ["Comenzar este diagnóstico es un excelente primer paso."];
  };
  
  const getAreasOportunidad = () => {
    const oportunidades = [];
     if (overallScorePercent >= 85) { 
        if (agilScorePercent < 95) oportunidades.push("Experimenta con metodologías ágiles más avanzadas para optimizar flujos de trabajo (Mentalidad Ágil).");
        if (crecimientoScorePercent < 95) oportunidades.push("Busca activamente roles de mentoría para consolidar y compartir tu conocimiento (Mentalidad de Crecimiento).");
        if (exponencialScorePercent < 95) oportunidades.push("Desarrolla estrategias de colaboración y networking para expandir tu impacto exponencialmente (Mentalidad Exponencial).");
         if (oportunidades.length < 2) oportunidades.push("Sigue explorando nuevas tendencias y tecnologías emergentes para mantenerte a la vanguardia.")
    } else if (overallScorePercent >= 60) { 
        if (agilScorePercent < 70) oportunidades.push("Practica la toma de decisiones y la ejecución de tareas en ciclos más cortos (sprints) (Mentalidad Ágil).");
        if (crecimientoScorePercent < 70) oportunidades.push("Establece metas de aprendizaje específicas y busca retroalimentación constructiva de forma proactiva (Mentalidad de Crecimiento).");
        if (exponencialScorePercent < 70) oportunidades.push("Identifica una nueva herramienta digital para aprender y aplicar en los próximos 30 días (Mentalidad Exponencial).");
        if (oportunidades.length < 2) oportunidades.push("Fortalece la mentalidad de 'entrega de valor continua' en lugar de esperar la perfección.")
    } else { 
        if (agilScorePercent < 50) oportunidades.push("Comienza por pequeños cambios: comparte ideas antes de que estén 'perfectas' (Mentalidad Ágil).");
        if (crecimientoScorePercent < 50) oportunidades.push("Celebra los pequeños aprendizajes, incluso de los errores. Ve cada error como una lección (Mentalidad de Crecimiento).");
        if (exponencialScorePercent < 50) oportunidades.push("Empieza a usar una herramienta digital básica que facilite alguna tarea cotidiana (Mentalidad Exponencial).");
        if (oportunidades.length < 2) oportunidades.push("Pide ayuda o consejo a alguien que admires por su manejo de lo digital.")
    }
    return oportunidades.length > 0 ? oportunidades : ["Define un pequeño hábito digital para practicar esta semana."];
  };

  const chartData = [
    { name: 'Mentalidad Ágil', score: agilScorePercent, color: SECTION_COLORS.agil, icon: <Cog size={20} className="mr-2" style={{color: SECTION_COLORS.agil}} /> },
    { name: 'Mentalidad de Crecimiento', score: crecimientoScorePercent, color: SECTION_COLORS.crecimiento, icon: <Sprout size={20} className="mr-2" style={{color: SECTION_COLORS.crecimiento}} /> },
    { name: 'Mentalidad Exponencial', score: exponencialScorePercent, color: SECTION_COLORS.exponencial, icon: <BarChart3 size={20} className="mr-2" style={{color: SECTION_COLORS.exponencial}} /> },
  ];
  
  const handleDownloadPDF = async () => {
    const pdfElement = document.getElementById('pdf-content-area-refactor'); 
    if (!pdfElement) {
        toast({ title: "Error", description: "No se encontró el contenido para el PDF.", variant: "destructive" });
        return;
    }

    toast({ title: "🚀 Preparando tu PDF...", description: "Esto puede tomar unos segundos." });
    
    pdfElement.style.visibility = 'visible';
    pdfElement.style.position = 'fixed'; 
    pdfElement.style.left = '0px';
    pdfElement.style.top = '0px';
    pdfElement.style.zIndex = '-1'; 

    try {
      const canvas = await html2canvas(pdfElement, { 
        scale: 2, 
        useCORS: true,
        logging: true,
        width: pdfElement.offsetWidth, 
        height: pdfElement.offsetHeight, 
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); 
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps= pdf.getImageProperties(imgData);
      const canvasWidth = imgProps.width;
      const canvasHeight = imgProps.height;

      const canvasAspectRatio = canvasWidth / canvasHeight;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let finalImgWidth, finalImgHeight;

      if (canvasAspectRatio > pdfAspectRatio) {
        finalImgWidth = pdfWidth;
        finalImgHeight = pdfWidth / canvasAspectRatio;
      } else {
        finalImgHeight = pdfHeight;
        finalImgWidth = pdfHeight * canvasAspectRatio;
      }
      
      const xOffset = (pdfWidth - finalImgWidth) / 2;
      const yOffset = (pdfHeight - finalImgHeight) / 2;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalImgWidth, finalImgHeight);
      pdf.save(`Resultados_Chip_Digital_${formData.nombre.replace(/\s+/g, '_')}.pdf`);
      toast({ title: "✅ ¡PDF Descargado!", description: "Tus resultados personalizados están listos." });

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({ title: "😥 Error al generar PDF", description: `Hubo un problema al crear tu PDF: ${error.message}. Inténtalo de nuevo.`, variant: "destructive", duration: 7000 });
    } finally {
        pdfElement.style.visibility = 'hidden';
        pdfElement.style.position = 'absolute';
        pdfElement.style.left = '-9999px';
        pdfElement.style.top = 'auto';
        pdfElement.style.zIndex = 'auto';
    }
  };
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `¡Descubrí mi Chip Digital con KAMDATA! Mis resultados: ${overallScorePercent}% Overall.`;
  const shareText = `Acabo de completar el test de Chip Digital de KAMDATA y obtuve un ${overallScorePercent}% en mi mentalidad digital. ¡Descubre la tuya!`;

  const handleShare = (platform) => {
    let url = '';
    switch(platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`;
        break;
      case 'x':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      default:
        toast({ title: "🚧 ¡Próximamente!", description: "Esta función de compartir aún no está implementada.", variant: "destructive"});
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
    toast({ title: "🔗 ¡Compartido!", description: `Tus resultados han sido compartidos en ${platform}.` });
  };


  const resultsData = {
    agilRawScore,
    crecimientoRawScore,
    exponencialRawScore,
    agilScorePercent,
    crecimientoScorePercent,
    exponencialScorePercent,
    overallScorePercent,
    overallLevel,
    totalRawScore,
    totalMaxScore
  };

  return (
    <>
      <div ref={resultsRef} className="container mx-auto px-4 py-8 max-w-6xl bg-[#E8AC41]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 pt-8 md:pt-0" 
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{color: SECTION_COLORS.default}}>Tu Perfil de Chip Digital</h1>
          <p className="text-xl text-black mb-6">
            Hola <strong style={{color: SECTION_COLORS.agil}}>{formData.nombre}</strong>, aquí están tus resultados detallados:
          </p>
        </motion.div>

        <ResultsSummaryCard results={resultsData} />
        
        <div className="mb-12">
          <ResultsBarChart data={chartData} logoSrc={logoSrc} isPDF={false} />
        </div>
        
        <ResultsInterpretation 
          overallScorePercent={overallScorePercent}
          puntosFuertes={getPuntosFuertes()}
          areasOportunidad={getAreasOportunidad()}
        />

        <ResultsSectionCards
            results={resultsData}
            getScoreLevel={getScoreLevel}
            getInterpretation={getInterpretation}
            questions={questions}
        />
        
        <StrategicSessionCTA />

        <ResultsActions
            onDownloadPDF={handleDownloadPDF}
            onShare={handleShare}
            onOpenCommunityModal={onOpenCommunityModal}
        />

      </div>
      <PdfContent
        ref={pdfContentRef}
        formData={formData}
        resultsData={resultsData}
        chartData={chartData}
        getPuntosFuertes={getPuntosFuertes}
        getAreasOportunidad={getAreasOportunidad}
        logoSrc={logoSrc} 
        overallLevel={overallLevel}
      />
    </>
  );
};

export default ResultsStep;