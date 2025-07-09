import React from 'react';
import { motion } from 'framer-motion';

const cubes = Array.from({ length: 32 }); // mais cubos
const random = (min, max) => Math.random() * (max - min) + min;

const MovingCubesBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {cubes.map((_, i) => {
        const size = random(60, 120); // cubos maiores
        const left = random(0, 100); // %
        const delay = random(0, 6); // s
        const duration = random(12, 26); // s
        const opacity = random(0.28, 0.5); // mais visível
        const blur = random(0, 2);
        return (
          <motion.div
            key={i}
            initial={{ y: '110vh' }}
            animate={{ y: '-20vh' }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration,
              delay,
              ease: 'linear',
            }}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              opacity,
              filter: `blur(${blur}px)`,
              background: 'rgba(59,130,246,0.22)', // azul translúcido
              border: '1.5px solid rgba(59,130,246,0.18)'
            }}
            className="absolute rounded-md shadow-xl"
          />
        );
      })}
    </div>
  );
};

export default MovingCubesBackground; 