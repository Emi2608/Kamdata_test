import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import IntroStep from '@/components/kamdata/IntroStep';
import TestStep from '@/components/kamdata/TestStep';
import ResultsStep from '@/components/kamdata/ResultsStep';
import Footer from '@/components/kamdata/Footer';
import WhatsAppButton from '@/components/kamdata/WhatsAppButton';
import KamdataLogo from '@/components/kamdata/KamdataLogo';
import CommunityModal from '@/components/kamdata/CommunityModal'; 
import { supabase } from '@/lib/supabaseClient';
import { questions, scaleLabels, sectionNames, sectionDescriptions, growthMindsetScales, exponentialMindsetScales } from '@/components/kamdata/testConfig';

const LOGO_URL_TRANSPARENT_BG = "https://storage.googleapis.com/hostinger-horizons-assets-prod/523ce8ca-63e1-4ac1-8cb2-73d544b3a60a/e79671c661ce0643f346b724a472a545.png";
const KAMDATA_BRAND_LOGO = "https://storage.googleapis.com/hostinger-horizons-assets-prod/523ce8ca-63e1-4ac1-8cb2-73d544b3a60a/321c660b51e356d0c9c9d16f6eaa1792.png";

export const SECTION_COLORS = {
  agil: '#0492C2', // Cerulean
  crecimiento: '#FC4C4E', // Strawberry
  exponencial: '#E8AC41', // Hunyadi Yellow
  default: '#EA4E51' // Kamdata Red (fallback or general)
};

function App() {
  const [currentStep, setCurrentStep] = useState('intro');
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    email: '',
    empresa: '',
    rol: '',
    localidad: '',
    terminos: false,
    info_mentorias: false, 
  });
  const [currentSection, setCurrentSection] = useState('agil');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    agil: Array(questions.agil.length).fill(0),
    crecimiento: Array(questions.crecimiento.length).fill(0),
    exponencial: Array(questions.exponencial.length).fill(0)
  });
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const totalQuestions = Object.values(questions).flat().length;
    const answeredQuestions = Object.values(answers).flat().filter(ans => ans !== 0).length;
    setProgress((answeredQuestions / totalQuestions) * 100);
  }, [answers]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terminos) {
      toast({
        title: "⚠️ Términos requeridos",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentStep('test');
    toast({
      title: "¡Perfecto! 🎉",
      description: "Comenzando tu evaluación de Chip Digital..."
    });
  };

  const handleAnswer = async (score) => {
    const newAnswers = { ...answers };
    newAnswers[currentSection][currentQuestion] = score;
    setAnswers(newAnswers);

    if (currentQuestion < questions[currentSection].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const sections = ['agil', 'crecimiento', 'exponencial'];
      const currentIndex = sections.indexOf(currentSection);
      
      if (currentIndex < sections.length - 1) {
        setCurrentSection(sections[currentIndex + 1]);
        setCurrentQuestion(0);
      } else {
        setIsSubmitting(true);
        toast({
          title: "💾 Guardando tus resultados...",
          description: "Un momento por favor."
        });
        
        const agilRawScore = calculateRawScore(newAnswers.agil);
        const crecimientoRawScore = calculateRawScore(newAnswers.crecimiento);
        const exponencialRawScore = calculateRawScore(newAnswers.exponencial);

        const agilScorePercent = calculateScorePercent(newAnswers.agil);
        const crecimientoScorePercent = calculateScorePercent(newAnswers.crecimiento);
        const exponencialScorePercent = calculateScorePercent(newAnswers.exponencial);
        
        const overallScorePercent = Math.round((agilScorePercent + crecimientoScorePercent + exponencialScorePercent) / 3);

        try {
          const { data, error } = await supabase
            .from('kamdata_test_results')
            .insert([
              { 
                nombre: formData.nombre,
                celular: formData.celular,
                email: formData.email,
                empresa: formData.empresa,
                rol: formData.rol,
                localidad: formData.localidad,
                answers_agil: newAnswers.agil,
                answers_crecimiento: newAnswers.crecimiento,
                answers_exponencial: newAnswers.exponencial,
                score_agil: agilScorePercent,
                score_crecimiento: crecimientoScorePercent,
                score_exponencial: exponencialScorePercent,
                overall_score: overallScorePercent,
                completed_at: new Date().toISOString(),
                info_mentorias: formData.info_mentorias 
              }
            ])
            .select();

          if (error) {
            throw error;
          }
          
          toast({
            title: "¡Resultados Guardados! ✅",
            description: "Tus resultados han sido guardados exitosamente."
          });
          setCurrentStep('results');

        } catch (error) {
          console.error('Error saving results to Supabase:', error);
          toast({
            title: "Error 😥",
            description: `No se pudieron guardar tus resultados: ${error.message}. Inténtalo de nuevo.`,
            variant: "destructive",
            duration: 7000,
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };
  
  const calculateRawScore = (sectionAnswers) => {
    if (!sectionAnswers || sectionAnswers.length === 0) return 0;
    return sectionAnswers.reduce((sum, score) => sum + (score || 0), 0);
  };

  const calculateScorePercent = (sectionAnswers) => {
    if (!sectionAnswers || sectionAnswers.length === 0) return 0;
    const total = sectionAnswers.reduce((sum, score) => sum + (score || 0), 0);
    const maxPossibleScore = sectionAnswers.length * 4;
    if (maxPossibleScore === 0) return 0;
    return Math.round((total / maxPossibleScore) * 100);
  };

  const getScoreLevel = (scorePercent) => {
    if (scorePercent >= 85) return { level: 'Avanzado', color: SECTION_COLORS.agil, emoji: '🚀' }; // Avanzado usa color Ágil (Cerulean)
    if (scorePercent >= 60) return { level: 'Intermedio', color: SECTION_COLORS.exponencial, emoji: '⚡' }; // Intermedio usa color Exponencial (Hunyadi Yellow)
    return { level: 'Inicial', color: SECTION_COLORS.crecimiento, emoji: '🛠️' }; // Inicial usa color Crecimiento (Strawberry)
  };
  
  const getInterpretation = (rawScore, sectionKey) => {
    const maxScoreForSection = questions[sectionKey].length * 4;
    const percent = (rawScore / maxScoreForSection) * 100;

    if (percent >= 80) return "Bien activada. ¡Sigue potenciándola!";
    if (percent >= 60) return "En buen camino. Fortalece hábitos.";
    if (percent >= 40) return "En transición. La conciencia es el primer paso.";
    return "Gran oportunidad de crecimiento.";
  };

  const getOverallScorePercent = () => {
    const agilScore = calculateScorePercent(answers.agil);
    const crecimientoScore = calculateScorePercent(answers.crecimiento);
    const exponencialScore = calculateScorePercent(answers.exponencial);
    
    const validSections = [answers.agil, answers.crecimiento, answers.exponencial].filter(s => s.length > 0 && s.some(ans => ans !== 0));
    if (validSections.length === 0) return 0;

    return Math.round((agilScore + crecimientoScore + exponencialScore) / 3);
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Toaster />
      
      <div className={`w-full py-4 flex justify-center items-center ${currentStep !== 'test' ? 'bg-[#0492C2]' : 'bg-transparent'}`}>
        {currentStep !== 'test' && currentStep !== 'results' && (
            <KamdataLogo 
                src={LOGO_URL_TRANSPARENT_BG} 
                alt="Kamdata Logo" 
                width={160} 
                height={53}
                className="my-4"
            />
        )}
        {currentStep === 'results' && (
           <KamdataLogo 
                src={KAMDATA_BRAND_LOGO} 
                alt="Kamdata Brand Logo" 
                width={160} 
                height={53}
                className="my-4"
            />
        )}
      </div>


      <main className="flex-grow">
        {currentStep === 'intro' && (
          <IntroStep
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
          />
        )}

        {currentStep === 'test' && (
          <TestStep
            currentSection={currentSection}
            currentQuestion={currentQuestion}
            progress={progress}
            questions={questions}
            scaleLabels={scaleLabels} 
            growthMindsetScales={growthMindsetScales} 
            exponentialMindsetScales={exponentialMindsetScales} 
            sectionNames={sectionNames}
            sectionDescriptions={sectionDescriptions}
            onAnswer={handleAnswer}
            logoSrc={LOGO_URL_TRANSPARENT_BG}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 'results' && (
          <ResultsStep
            formData={formData}
            answers={answers}
            calculateRawScore={calculateRawScore}
            calculateScorePercent={calculateScorePercent}
            getScoreLevel={getScoreLevel}
            getOverallScorePercent={getOverallScorePercent}
            getInterpretation={getInterpretation}
            logoSrc={KAMDATA_BRAND_LOGO}
            onOpenCommunityModal={() => setShowCommunityModal(true)}
          />
        )}
      </main>
      <Footer logoSrc={KAMDATA_BRAND_LOGO} />
      <WhatsAppButton />
      {showCommunityModal && (
        <CommunityModal onClose={() => setShowCommunityModal(false)} />
      )}
    </div>
  );
}

export default App;