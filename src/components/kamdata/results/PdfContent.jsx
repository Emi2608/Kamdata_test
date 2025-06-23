import React from 'react';
import ResultsBarChart from '@/components/kamdata/results/ResultsBarChart';
import { CheckCircle, MessageSquarePlus, CalendarDays, TrendingUp, Info, AlertCircle, Zap, Rocket, Check, Cog, Sprout, BarChart3 } from 'lucide-react';
import { SECTION_COLORS } from '@/App';

const PdfContent = React.forwardRef(({ formData, resultsData, chartData, getPuntosFuertes, getAreasOportunidad, logoSrc, overallLevel }, ref) => {
  const { overallScorePercent, totalRawScore, totalMaxScore } = resultsData;
  const communityLink = "https://chat.whatsapp.com/BvACW4lMPaPCxA4UQ1jX2g";
  const calendarLink = "https://calendar.app.google/ixLA3YjntzATmxPC8"; 
  
  let interpretationData = {
    level: 'Inicial',
    title: '🛠️ Tienes mucho por construir… y eso está bien',
    description: 'Este resultado no es un juicio. Es un mapa de tus hábitos actuales. Y el primer paso para crecer es reconocer dónde estás hoy.',
    nextStepText: 'Agenda una microcita estratégica gratuita para entender tus primeros pasos y construir una base sólida.',
    nextStepButtonText: 'Definir Mis Primeros Pasos',
    bgColorClass: `rgba(${parseInt(SECTION_COLORS.crecimiento.slice(1,3),16)},${parseInt(SECTION_COLORS.crecimiento.slice(3,5),16)},${parseInt(SECTION_COLORS.crecimiento.slice(5,7),16)},0.1)`,
    borderColor: SECTION_COLORS.crecimiento,
    textColor: SECTION_COLORS.crecimiento, 
    icon: <AlertCircle size={18} style={{ color: SECTION_COLORS.crecimiento, marginRight: '5px' }} />
  };

  if (overallScorePercent >= 85) { // Alto
    interpretationData = {
      level: 'Avanzado',
      title: '✨ ¡Tu Chip Digital está activado!',
      description: 'Has desarrollado hábitos sólidos en todas o casi todas las dimensiones. Tu mentalidad digital refleja proactividad, apertura al aprendizaje, visión estratégica y capacidad de adaptación.',
      nextStepText: 'Agenda una microcita estratégica gratuita para trazar una hoja de ruta alineada con tu perfil y potenciar aún más tu impacto.',
      nextStepButtonText: 'Potenciar Mi Impacto',
      bgColorClass: `rgba(${parseInt(SECTION_COLORS.agil.slice(1,3),16)},${parseInt(SECTION_COLORS.agil.slice(3,5),16)},${parseInt(SECTION_COLORS.agil.slice(5,7),16)},0.1)`,
      borderColor: SECTION_COLORS.agil,
      textColor: SECTION_COLORS.agil,
      icon: <CheckCircle size={18} style={{ color: SECTION_COLORS.agil, marginRight: '5px' }} />
    };
  } else if (overallScorePercent >= 60) { // Medio
    interpretationData = {
      level: 'Intermedio',
      title: '⚙️ Estás en marcha, con mucho potencial',
      description: 'Tienes avances importantes, pero aún hay áreas por desbloquear. Esto no es una evaluación, es una brújula para saber qué hábito digital trabajar primero.',
      nextStepText: 'Agenda una microcita estratégica de 15 minutos para ordenar tus ideas y definir un enfoque práctico para desbloquear tu siguiente nivel.',
      nextStepButtonText: 'Ordenar Mis Ideas',
      bgColorClass: `rgba(${parseInt(SECTION_COLORS.exponencial.slice(1,3),16)},${parseInt(SECTION_COLORS.exponencial.slice(3,5),16)},${parseInt(SECTION_COLORS.exponencial.slice(5,7),16)},0.1)`,
      borderColor: SECTION_COLORS.exponencial,
      textColor: SECTION_COLORS.exponencial,
      icon: <Info size={18} style={{ color: SECTION_COLORS.exponencial, marginRight: '5px' }} />
    };
  }

  const finalPuntosFuertes = getPuntosFuertes();
  const finalAreasOportunidad = getAreasOportunidad();

  const pdfChartData = chartData.map(item => {
    let IconComponent;
    switch(item.name) {
      case 'Mentalidad Ágil': IconComponent = Cog; break;
      case 'Mentalidad de Crecimiento': IconComponent = Sprout; break;
      case 'Mentalidad Exponencial': IconComponent = BarChart3; break;
      default: IconComponent = Zap; 
    }
    return { ...item, icon: <IconComponent size={14} style={{ marginRight: '4px', color: item.color }} /> };
  });


  return (
    <div 
        style={{ 
            position: 'absolute', 
            left: '-9999px', 
            top: '0px', 
            width: '210mm', 
            minHeight: '297mm', 
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#FFFFFF', 
            visibility: 'hidden', 
            zIndex: -1, 
            boxSizing: 'border-box',
            color: '#333333'
        }} 
        id="pdf-content-area-refactor" 
        ref={ref}
    >
      <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', padding: '10mm' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '8mm', borderBottom: `3px solid ${interpretationData.borderColor}`, paddingBottom: '8mm' }}>
          {logoSrc && <img src={logoSrc} alt="Kamdata Logo" style={{ width: '150px', height: 'auto', margin: '0 auto 8mm auto', objectFit: 'contain' }} crossOrigin="anonymous" />}
          <h1 style={{ color: SECTION_COLORS.default, fontSize: '20pt', fontWeight: 'bold', margin: '0 0 4mm 0' }}>Reporte de Chip Digital</h1>
          <p style={{ fontSize: '11pt', margin: '0', color: '#555555' }}>Resultados Personalizados para: <strong style={{color: SECTION_COLORS.agil}}>{formData.nombre}</strong></p>
        </header>

         <section style={{ textAlign: 'center', marginBottom: '8mm', padding: '5mm', backgroundColor: interpretationData.bgColorClass, borderRadius: '8px', border: `1px solid ${interpretationData.borderColor}` }}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3mm'}}>
                {interpretationData.icon}
                <h2 style={{ color: interpretationData.textColor, fontSize: '15pt', fontWeight: 'bold', margin: '0' }}>
                    {interpretationData.title}
                </h2>
            </div>
            <p style={{ fontSize: '10pt', fontWeight: 'bold', color: interpretationData.textColor, margin: '0 0 2mm 0' }}>
                Nivel General: {interpretationData.level} (Puntuación Global: {overallScorePercent}%)
            </p>
            <p style={{ fontSize: '9pt', margin: '0', color: '#444444', lineHeight: 1.4 }}>{interpretationData.description}</p>
        </section>

        <section style={{ marginBottom: '8mm', padding: '5mm', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ color: SECTION_COLORS.default, fontSize: '13pt', fontWeight: 'bold', borderBottom: `1px solid ${SECTION_COLORS.default}`, paddingBottom: '3mm', marginBottom: '5mm', textAlign: 'center' }}>
            Dashboard de Mentalidad Digital
          </h3>
           <p style={{ fontSize: '9pt', margin: '0 0 5mm 0', color: '#555555', textAlign: 'center' }}>Total: {totalRawScore}/{totalMaxScore} puntos</p>
          <ResultsBarChart data={pdfChartData} isPDF={true} />
        </section>
        
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8mm', marginBottom: '8mm' }}>
          <div style={{ backgroundColor: `rgba(${parseInt(SECTION_COLORS.agil.slice(1,3),16)},${parseInt(SECTION_COLORS.agil.slice(3,5),16)},${parseInt(SECTION_COLORS.agil.slice(5,7),16)},0.05)`, padding: '5mm', borderRadius: '8px', border: `1px solid ${SECTION_COLORS.agil}` }}>
            <h3 style={{ color: SECTION_COLORS.agil, fontSize: '11pt', fontWeight: 'bold', marginBottom: '3mm', display: 'flex', alignItems: 'center' }}>
              <Check size={14} style={{ marginRight: '4px', color: SECTION_COLORS.agil }} />Puntos Fuertes
            </h3>
            <ul style={{ listStyle: 'none', paddingLeft: '0', fontSize: '8pt', lineHeight: '1.4', color: '#444444' }}>
              {finalPuntosFuertes.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '1.5mm', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ width: '4px', height: '4px', backgroundColor: SECTION_COLORS.agil, borderRadius: '50%', marginRight: '5px', marginTop: '4px', flexShrink: 0 }}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ backgroundColor: `rgba(${parseInt(SECTION_COLORS.exponencial.slice(1,3),16)},${parseInt(SECTION_COLORS.exponencial.slice(3,5),16)},${parseInt(SECTION_COLORS.exponencial.slice(5,7),16)},0.05)`, padding: '5mm', borderRadius: '8px', border: `1px solid ${SECTION_COLORS.exponencial}` }}>
            <h3 style={{ color: SECTION_COLORS.exponencial, fontSize: '11pt', fontWeight: 'bold', marginBottom: '3mm', display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={14} style={{ marginRight: '4px', color: SECTION_COLORS.exponencial }} />Áreas de Oportunidad
            </h3>
            <ul style={{ listStyle: 'none', paddingLeft: '0', fontSize: '8pt', lineHeight: '1.4', color: '#444444' }}>
              {finalAreasOportunidad.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '1.5mm', display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ width: '4px', height: '4px', backgroundColor: SECTION_COLORS.exponencial, borderRadius: '50%', marginRight: '5px', marginTop: '4px', flexShrink: 0 }}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ marginTop: 'auto', paddingTop: '8mm', borderTop: '1px solid #DDDDDD', textAlign: 'center' }}>
            <h3 style={{ color: SECTION_COLORS.default, fontSize: '12pt', fontWeight: 'bold', marginBottom: '2mm', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} style={{ marginRight: '5px', color: SECTION_COLORS.default }} /> Siguiente Paso
            </h3>
            <p style={{ fontSize: '9pt', color: '#555555', marginBottom: '4mm', lineHeight: 1.4 }}>
                {interpretationData.nextStepText}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '5mm', marginTop: '5mm' }}>
              <a href={communityLink} target="_blank" rel="noopener noreferrer" style={{ 
                  backgroundColor: '#25D366', color: 'white', padding: '3mm 5mm', borderRadius: '6px', textDecoration: 'none', fontSize: '9pt', fontWeight: 'bold', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <MessageSquarePlus size={14} style={{ marginRight: '5px' }} /> Unirme a Comunidad
              </a>
              <a href={calendarLink} target="_blank" rel="noopener noreferrer" style={{ 
                  backgroundColor: interpretationData.borderColor, color: 'white', padding: '3mm 5mm', borderRadius: '6px', textDecoration: 'none', fontSize: '9pt', fontWeight: 'bold', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <CalendarDays size={14} style={{ marginRight: '5px' }} /> {interpretationData.nextStepButtonText}
              </a>
            </div>
        </section>

        <footer style={{ textAlign: 'center', fontSize: '7pt', color: '#777777', marginTop: 'auto', paddingTop: '8mm', borderTop: '1px solid #EEEEEE' }}>
          <p>© {new Date().getFullYear()} KAMDATA | <a href="https://kamdata.com.mx" target="_blank" rel="noopener noreferrer" style={{ color: SECTION_COLORS.agil, textDecoration: 'underline' }}>kamdata.com.mx</a></p>
          <p>Este es un reporte autogenerado. Para una asesoría personalizada, contacta a KAMDATA.</p>
        </footer>
      </div>
    </div>
  );
});

export default PdfContent;