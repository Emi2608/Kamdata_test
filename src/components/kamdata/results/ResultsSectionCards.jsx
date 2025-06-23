import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog, Sprout, BarChart3 } from 'lucide-react'; 
import { SECTION_COLORS } from '@/App';

const ResultsSectionCards = ({ results, getScoreLevel, getInterpretation, questions }) => {
  const { agilRawScore, agilScorePercent, crecimientoRawScore, crecimientoScorePercent, exponencialRawScore, exponencialScorePercent } = results;
  
  const sectionsData = [
    { 
      key: 'agil', 
      rawScore: agilRawScore, 
      scorePercent: agilScorePercent, 
      icon: Cog, 
      title: 'Mentalidad Ágil', 
      maxScore: questions.agil.length * 4,
      color: SECTION_COLORS.agil
    },
    { 
      key: 'crecimiento', 
      rawScore: crecimientoRawScore, 
      scorePercent: crecimientoScorePercent, 
      icon: Sprout, 
      title: 'Mentalidad de Crecimiento', 
      maxScore: questions.crecimiento.length * 4,
      color: SECTION_COLORS.crecimiento
    },
    { 
      key: 'exponencial', 
      rawScore: exponencialRawScore, 
      scorePercent: exponencialScorePercent, 
      icon: BarChart3, 
      title: 'Mentalidad Exponencial', 
      maxScore: questions.exponencial.length * 4,
      color: SECTION_COLORS.exponencial
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {sectionsData.map((section, index) => {
        const interpretationText = getInterpretation(section.rawScore, section.key);
        return (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="result-card gradient-card border-gray-300 h-full flex flex-col shadow-lg" style={{borderColor: section.color}}>
              <CardHeader className="text-center">
                  <section.icon className="w-12 h-12 mx-auto mb-2" style={{ color: section.color }} />
                  <CardTitle className="text-2xl" style={{ color: section.color }}>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1" style={{ color: section.color }}>
                    {section.scorePercent}%
                  </p>
                  <p className="text-md text-gray-700 font-semibold mb-2">
                    ({section.rawScore}/{section.maxScore} pts)
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {interpretationText}
                  </p>
                </div>
                <div className="mt-auto bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${section.scorePercent}%`,
                      backgroundColor: section.color
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ResultsSectionCards;