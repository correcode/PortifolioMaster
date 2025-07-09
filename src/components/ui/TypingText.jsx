import React from 'react';
import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.01,
    },
  }),
};

const TypingText = ({ text, className }) => {
  return (
    <h1 className={className}>
      {text.split('').map((char, i) => (
        <motion.span key={i} custom={i} variants={textVariants} initial="hidden" animate="visible">
          {char}
        </motion.span>
      ))}
    </h1>
  );
};

export default TypingText; 