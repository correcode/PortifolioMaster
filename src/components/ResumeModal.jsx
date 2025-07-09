import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Download, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/providers/ThemeProvider';

const ResumeModal = ({ isDarkMode, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const { toast } = useToast();
  const { isDark } = useTheme();

  const handleDownload = async () => {
    setError('');
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Data fields cannot be empty. Authentication required.");
      return;
    }
    if (!formData.email.includes('@')) {
      setError("Invalid email format. Re-enter frequency.");
      return;
    }

    // Disparar e-mail via EmailJS
    try {
      await emailjs.send(
        'service_aliba', // Service ID
        'template_ybqsywr', // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          to_email: 'aliba.truta@gmail.com',
        },
        'PlpQwc8eOcKP3qv63' // Public Key
      );
    } catch (e) {
      // Opcional: mostrar erro de envio de email
      toast({
        title: 'Erro ao enviar e-mail',
        description: 'Não foi possível enviar notificação por e-mail.',
        variant: 'destructive',
      });
    }

    // Iniciar download do CV
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Access Granted",
      description: "Downloading secure file... Stand by.",
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="modal-container w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 relative">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-orbitron text-xl md:text-2xl font-bold text-cyan-300 tracking-wider">SECURE DOWNLOAD</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-cyan-400 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-cyan-300 mb-2 tracking-wider">NAME:</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="modal-input"
                placeholder="> ENTER YOUR NAME"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-cyan-300 mb-2 tracking-wider">EMAIL:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="modal-input"
                placeholder="> ENTER YOUR EMAIL"
              />
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 bg-red-900/50 border border-red-500/50 p-3 rounded-sm"
              >
                <AlertTriangle size={20} />
                <span className="font-semibold">{error}</span>
              </motion.div>
            )}

            <button
              onClick={handleDownload}
              className="download-button group w-full"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Download className="mr-3" size={20} />
                INITIATE DOWNLOAD
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeModal;