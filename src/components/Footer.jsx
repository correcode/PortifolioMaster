import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Github, Linkedin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/providers/ThemeProvider';

const Footer = () => {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/correcode' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/alisson-correa-alves-500770310' }
  ];

  const handleSocialClick = () => {
    toast({
      title: "External Link",
      description: "This feature is not yet implemented. Stand by for future updates.",
      variant: "default",
    });
  };

  return (
    <footer className="py-8 px-4 bg-black/70 border-t-2 border-cyan-500/30 relative">
      <div className="absolute inset-0 bg-grid-cyan opacity-10"></div>
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-6 mb-6"
        >
          {socialLinks.map((social) => (
            social.href ? (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5, color: '#22d3ee', filter: 'drop-shadow(0 0 8px #22d3ee)' }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={28} />
              </motion.a>
            ) : (
              <motion.button
                key={social.label}
                whileHover={{ scale: 1.2, y: -5, color: '#22d3ee', filter: 'drop-shadow(0 0 8px #22d3ee)' }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 transition-all duration-300"
                onClick={handleSocialClick}
                aria-label={social.label}
              >
                <social.icon size={28} />
              </motion.button>
            )
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 tracking-wider"
        >
          © {new Date().getFullYear()} Alisson Corrêa // All Rights Reserved
        </motion.p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);