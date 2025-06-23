import React from 'react';
import { motion } from 'framer-motion';

const KamdataLogo = ({ src, alt, width, height, className }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default KamdataLogo;