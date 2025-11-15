import React, { useMemo } from 'react';

const random = (min, max) => Math.random() * (max - min) + min;

// Detect mobile device
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const ParticlesBackground = () => {
  // Reduce particles on mobile for better performance
  const particleCount = useMemo(() => isMobile() ? 12 : 20, []);
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const size = random(2, 7);
      const left = random(0, 100);
      const top = random(0, 100);
      const duration = random(6, 18);
      const delay = random(0, 6);
      return { size, left, top, duration, delay, id: i };
    });
  }, [particleCount]);

  return (
    <div className="particles-bg" style={{ willChange: 'transform' }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `particle-move ${particle.duration}s linear ${particle.delay}s infinite alternate`,
            willChange: 'transform'
          }}
        />
      ))}
      <style>{`
        @keyframes particle-move {
          0% { transform: translateY(0); opacity: 0.15; }
          100% { transform: translateY(-30px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default React.memo(ParticlesBackground); 