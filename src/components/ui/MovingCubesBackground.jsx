import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const random = (min, max) => Math.random() * (max - min) + min;

// Detect mobile device
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const MovingCubesBackground = () => {
  // Reduce cubes on mobile for better performance
  const cubeCount = useMemo(() => isMobile() ? 12 : 20, []);
  
  const cubes = useMemo(() => {
    return Array.from({ length: cubeCount }, (_, i) => {
      const size = random(60, 120);
      const left = random(0, 100);
      const delay = random(0, 6);
      const duration = random(12, 26);
      const opacity = random(0.28, 0.5);
      const blur = random(0, 2);
      return { size, left, delay, duration, opacity, blur, id: i };
    });
  }, [cubeCount]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          initial={{ y: '110vh' }}
          animate={{ y: '-20vh' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: cube.duration,
            delay: cube.delay,
            ease: 'linear',
          }}
          style={{
            width: cube.size,
            height: cube.size,
            left: `${cube.left}%`,
            opacity: cube.opacity,
            filter: `blur(${cube.blur}px)`,
            background: 'rgba(59,130,246,0.22)',
            border: '1.5px solid rgba(59,130,246,0.18)',
            willChange: 'transform'
          }}
          className="absolute rounded-md shadow-xl"
        />
      ))}
    </div>
  );
};

export default React.memo(MovingCubesBackground); 