import React from 'react';
import { motion } from 'framer-motion';
import { technologies } from '@/data/technologies';
import { useTheme } from '@/providers/ThemeProvider';

const AboutMe = () => {
  const { isDarkMode } = useTheme();
  return (
    <motion.section
      id="about"
      className="py-20 px-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-cyan-400/50 animate-pulse"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-orbitron text-3xl md:text-5xl font-bold text-center mb-16 text-cyan-400 uppercase tracking-widest"
          style={{ textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4' }}
        >
          Mission Briefing
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hud-panel p-8 space-y-6 relative overflow-hidden"
          >
            <div className="neon-snake"></div>
            <h3 className="font-orbitron text-xl md:text-2xl text-cyan-300 tracking-wider">Personal File: Alisson Corrêa</h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-300">
              Hi, I'm Alisson, a programmer passionate about technology. From creating simple designs to implementing features, I see every challenge as an opportunity to learn and grow. My greatest passion is the constant learning that programming provides, exploring the unlimited universe of possibilities it offers. I am always looking for new knowledge and practices to improve my skills and contribute to innovative solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hud-panel p-8 space-y-6 relative overflow-hidden"
          >
            <div className="neon-snake"></div>
            <h3 className="font-orbitron text-xl md:text-2xl text-cyan-300 tracking-wider">Skill Matrix</h3>
            <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <img src={tech.logo} alt={tech.name + ' logo'} className="w-8 h-8" />
                      <span className="font-semibold text-base md:text-lg tracking-wide flex items-center gap-2">
                        {tech.name}
                        <span className="font-orbitron text-cyan-400 text-sm md:text-base ml-2">{tech.level}%</span>
                      </span>
                    </div>
                  </div>
                  <div className="h-4 bg-cyan-900/50 rounded-sm overflow-hidden border border-cyan-500/30 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.2 }}
                      className="h-full bg-cyan-400 rounded-sm"
                      style={{ boxShadow: '0 0 8px #06b6d4, inset 0 0 4px #67e8f9' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;