import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import TypingText from '@/components/ui/TypingText';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

const Home = ({ onDownloadClick }) => {
  const { isDarkMode } = useTheme();
  const [imgError, setImgError] = useState(false);
  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center justify-center p-4 pt-24 md:pt-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
       <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl opacity-50 animate-blob"
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"
        />
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 text-center md:text-left"
        >
          <TypingText 
            text="Alisson Corrêa"
            className="text-4xl md:text-7xl font-bold neon-glow"
            style={{ textShadow: '0 0 15px rgba(147, 197, 253, 0.7)' }}
          />

          <motion.p
            className={`text-base md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <span className="block font-bold">Full Stack Developer.</span>
            I turn ideas into efficient and intuitive digital solutions.<br/>
            Fueled by coffee, clean code, and creativity.<br/>
            Passionate about technology, development, and innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <div className="flex flex-col items-start gap-3 md:gap-4 w-full max-w-xs">
              <Button
                onClick={onDownloadClick}
                className="group relative w-40 md:w-48 inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-bold btn-neon rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-500 z-0"></span>
                <span className="relative flex items-center z-10">
                  <Download className="mr-2" size={16} />
                  DOWNLOAD CV
                </span>
              </Button>
              <a
                href="https://github.com/correcode"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-40 md:w-48 inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-bold btn-neon rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all duration-200"
              >
                <Github className="mr-2" size={16} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/alisson-correa-alves-500770310"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-40 md:w-48 inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-bold btn-neon rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all duration-200"
              >
                <Linkedin className="mr-2" size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <img 
                alt="Alisson Corrêa - Desenvolvedor Full Stack"
                className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 ${imgError ? 'border-red-500' : 'border-blue-500/50'} shadow-2xl shadow-blue-500/20`}
                src="/foto2.jpg"
                onError={() => setImgError(true)}
              />
              {imgError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-full text-red-400 font-bold text-center">
                  Erro ao carregar a imagem<br/>/profile-alt.jpg
                </div>
              )}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
              {/* Radar effect: animated dots orbiting the photo */}
              <RadarDots count={14} radius={180} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// RadarDots component: renders several animated dots orbiting a center point
const RadarDots = ({ count = 12, radius = 160 }) => {
  // Gera um array de ângulos igualmente espaçados
  const dots = Array.from({ length: count });
  return (
    <>
      {dots.map((_, i) => {
        // Cada bolinha tem um ângulo inicial diferente
        const angle = (i / count) * 2 * Math.PI;
        // Cada bolinha pode ter uma velocidade diferente
        const duration = 4 + (i % 3) * 1.2;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 16,
              height: 16,
              marginLeft: -8,
              marginTop: -8,
              zIndex: 2,
            }}
            animate={{
              rotate: 360,
            }}
            initial={{ rotate: 0 }}
            transition={{
              repeat: Infinity,
              duration,
              ease: 'linear',
              delay: i * 0.2,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: `${Math.cos(angle) * radius}px`,
                top: `${Math.sin(angle) * radius}px`,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #67e8f9 60%, #0ea5e9 100%)',
                boxShadow: '0 0 8px #67e8f9, 0 0 16px #0ea5e9',
                opacity: 0.85,
              }}
            />
          </motion.div>
        );
      })}
    </>
  );
};

export default Home;