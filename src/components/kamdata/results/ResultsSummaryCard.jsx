import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SECTION_COLORS } from '@/App';

const ResultsSummaryCard = ({ results }) => {
  const { overallScorePercent, overallLevel, totalRawScore, totalMaxScore } = results;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="mb-12"
    >
      <Card className="result-card gradient-card border-gray-300 text-center shadow-lg" style={{borderColor: overallLevel.color}}>
        <CardHeader>
          <CardTitle className="text-3xl" style={{color: SECTION_COLORS.default}}>Tu Chip Digital: Resumen</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl">{overallLevel.emoji}</div>
            <h2 className="text-3xl font-bold" style={{color: overallLevel.color}}>
              Puntuación Global: {overallScorePercent}%
            </h2>
            <p className="text-xl font-semibold" style={{ color: overallLevel.color }}>
              Nivel General: {overallLevel.level}
            </p>
            <p className="text-lg text-gray-700">
              Puntaje Total: {totalRawScore}/{totalMaxScore}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultsSummaryCard;