import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KamdataLogo from '@/components/kamdata/KamdataLogo';

const TestStep = ({
  currentSection,
  currentQuestion,
  progress,
  questions,
  scaleLabels, // Este prop podría necesitar ajuste o ya no ser usado para 'agil'
  sectionNames,
  sectionDescriptions,
  onAnswer,
  logoSrc,
  // Props para las nuevas escalas específicas de crecimiento y exponencial
  growthMindsetScales, 
  exponentialMindsetScales,
}) => {
  const currentQuestionData = questions[currentSection][currentQuestion];
  const questionText = typeof currentQuestionData === 'string' ? currentQuestionData : currentQuestionData.text;
  const options = typeof currentQuestionData === 'string' ? null : currentQuestionData.options;

  let currentOptionsToDisplay = [];
  if (options) { // Si la pregunta actual tiene sus propias opciones (como en la nueva sección ágil)
    currentOptionsToDisplay = options;
  } else if (currentSection === 'crecimiento' && growthMindsetScales) {
    currentOptionsToDisplay = growthMindsetScales.map(label => ({ main: label, sub: null }));
  } else if (currentSection === 'exponencial' && exponentialMindsetScales) {
    currentOptionsToDisplay = exponentialMindsetScales.map(label => ({ main: label, sub: null }));
  } else { // Fallback a scaleLabels si no hay opciones específicas y no es crecimiento/exponencial con sus escalas
    currentOptionsToDisplay = scaleLabels.map(label => ({ main: label, sub: null }));
  }


  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-lg p-4">
        <div className="container mx-auto flex items-center justify-between">
          <KamdataLogo src={logoSrc} alt="Kamdata Test Header Logo" width={100} height={33} className="hidden md:block"/>
          <div className="flex-grow md:ml-4">
            <p className="text-black text-center mb-1 font-semibold text-sm md:text-base">
              Sección: {sectionNames[currentSection]} | Progreso: {Math.round(progress)}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
              <div
                className="progress-fill h-2 md:h-3 rounded-full"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: '#0492C2'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="question-card gradient-card border-black">
              <CardHeader className="text-center">
                <CardTitle className="kamdata-red text-3xl mb-4">
                  {sectionNames[currentSection]}
                </CardTitle>
                <p className="text-black text-lg">
                  {sectionDescriptions[currentSection]}
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <span className="text-sm text-gray-600 font-semibold">
                    Pregunta {currentQuestion + 1} de {questions[currentSection].length}
                  </span>
                </div>
                
                <div className="bg-white p-6 rounded-lg border-2 border-black">
                  <p className="text-black text-xl font-medium text-center leading-relaxed">
                    {questionText}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-black text-center font-semibold">
                    Selecciona tu nivel de identificación:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentOptionsToDisplay.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => onAnswer(index + 1)}
                        className="score-button h-auto p-4 text-left text-black font-medium"
                        style={{ 
                          backgroundColor: '#EBAC3F',
                          borderRadius: '10px'
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center mt-1">
                            {index + 1}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-sm">{option.main}</span>
                            {option.sub && (
                              <span className="text-xs italic text-gray-700 mt-1">{option.sub}</span>
                            )}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default TestStep;