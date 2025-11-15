import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/providers/ThemeProvider';
import { projectsData } from '@/data/projectsData';
import { motion } from 'framer-motion';

// Mapeamento de ícones por linguagem principal
const languageIcons = {
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
};

// Mapeamento manual para cada projeto
const projectLanguages = {
  1: 'JavaScript', // To-Do List
  2: 'PHP',       // StockProject
  3: 'PHP',       // BarberShop
  4: 'Java',      // Projeto Interface iPhone
};

const Projects = () => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();

  const handleProjectClick = () => {
    toast({
      title: "External Link",
      description: "Redirecting to external repository. Stand by.",
    });
    // In a real scenario, you would use window.open(project.url, '_blank')
  };

  return (
    <motion.section
      id="projects"
      className="py-20 px-4 relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="font-orbitron text-3xl md:text-5xl font-bold text-center mb-16 text-cyan-400 uppercase tracking-widest neon-glow"
          style={{ textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4' }}
        >
          Active Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {projectsData.map((project) => (
            <a
              key={project.id}
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card bg-black/60 backdrop-blur-md rounded-lg cursor-pointer border-2 border-transparent relative overflow-hidden block"
              style={{ textDecoration: 'none' }}
            >
              <div className="relative p-6 z-10">
                <div className="mb-4 overflow-hidden rounded-md border-2 border-cyan-500/30">
                  <img 
                    alt={project.imageAlt}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                    decoding="async"
                    src={project.image} 
                  />
                </div>

                <h3 
                  className="font-orbitron text-xl md:text-2xl font-bold mb-3 text-cyan-300 tracking-wider flex items-center gap-2"
                >
                  {project.title}
                  {languageIcons[projectLanguages[project.id]] && (
                    <img
                      src={languageIcons[projectLanguages[project.id]]}
                      alt={projectLanguages[project.id] + ' logo'}
                      className="w-7 h-7 ml-2"
                      loading="lazy"
                      decoding="async"
                      style={{ filter: 'drop-shadow(0 0 6px #06b6d4)' }}
                    />
                  )}
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                <div
                  className="mt-4 flex items-center text-cyan-400 opacity-70 hover:underline"
                >
                  <Github size={16} className="mr-2" />
                  <span className="text-sm font-semibold tracking-wider">Access Repository</span>
                  <ExternalLink size={16} className="ml-auto" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default React.memo(Projects);