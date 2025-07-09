import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { navItems } from '@/data/navItems';
import { Home, User, FolderOpen, Mail, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

const iconMap = { Home, User, FolderOpen, Mail };

const Header = ({ scrollToSection }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="hud-header mx-auto mt-4 max-w-4xl">
        <div className="flex justify-between items-center h-16 px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-orbitron text-xl md:text-2xl font-bold text-cyan-400 tracking-widest logo-text"
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux logo" className="w-8 h-8 filter grayscale" />
            <span>Developer</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="nav-button"
              >
                {iconMap[item.icon] && React.createElement(iconMap[item.icon], { size: 18 })}
                <span className="ml-2">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm border border-cyan-500/30 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-end md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-64 bg-black/90 border-l-2 border-cyan-400 shadow-2xl h-full flex flex-col py-8 px-6 space-y-4 animate-slide-in-right relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setMobileMenuOpen(false); scrollToSection(item.id); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-base md:text-lg font-bold text-cyan-300 bg-black/40 rounded-md hover:bg-cyan-400/10 hover:text-cyan-200 neon-glow transition-all duration-200"
                >
                  {iconMap[item.icon] && React.createElement(iconMap[item.icon], { size: 22 })}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;