import React from 'react';
import { motion } from 'framer-motion';
import KamdataLogo from '@/components/kamdata/KamdataLogo';
import { SECTION_COLORS } from '@/App';

const ResultsBarChart = ({ data, logoSrc, isPDF = false }) => {
  return (
    <div className={`p-6 rounded-lg ${isPDF ? 'bg-white' : 'bg-white border border-gray-300 shadow-lg'}`}>
      {!isPDF && (
        <div className="flex justify-center mb-4">
          <KamdataLogo src={logoSrc} alt="Kamdata Chart Logo" width={100} height={33} />
        </div>
      )}
      <h3 className={`text-xl font-bold mb-6 text-center ${isPDF ? 'text-lg' : ''}`} style={{color: SECTION_COLORS.default}}>Tu Perfil de Chip Digital</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className={`text-sm font-medium text-gray-700 flex items-center ${isPDF ? 'text-xs' : ''}`}>{item.icon} {item.name}</span>
              <span className={`text-sm font-bold ${isPDF ? 'text-xs' : ''}`} style={{ color: item.color }}>{item.score}%</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full ${isPDF ? 'h-4' : 'h-5'}`}>
              <motion.div
                className={`rounded-full ${isPDF ? 'h-4' : 'h-5'}`}
                style={{ backgroundColor: item.color }}
                initial={isPDF ? false : { width: 0 }}
                animate={isPDF ? { width: `${item.score}%`, transition: { duration: 0} } : { width: `${item.score}%` }}
                transition={isPDF ? {duration: 0} : { duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsBarChart;