import React from 'react';

const particles = Array.from({ length: 32 });
const random = (min, max) => Math.random() * (max - min) + min;

const ParticlesBackground = () => (
  <div className="particles-bg">
    {particles.map((_, i) => {
      const size = random(2, 7);
      const left = random(0, 100);
      const top = random(0, 100);
      const duration = random(6, 18);
      const delay = random(0, 6);
      return (
        <div
          key={i}
          className="particle"
          style={{
            width: size,
            height: size,
            left: `${left}%`,
            top: `${top}%`,
            animation: `particle-move ${duration}s linear ${delay}s infinite alternate`,
          }}
        />
      );
    })}
    <style>{`
      @keyframes particle-move {
        0% { transform: translateY(0); opacity: 0.15; }
        100% { transform: translateY(-30px); opacity: 0.3; }
      }
    `}</style>
  </div>
);

export default ParticlesBackground; 