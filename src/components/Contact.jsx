import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/providers/ThemeProvider';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const { isDarkMode } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Transmission Error",
        description: "All fields required for message transmission.",
        variant: "destructive",
      });
      return;
    }
    setIsSending(true);
    try {
      await emailjs.send(
        'service_aliba', // Service ID
        'template_eib0sbn', // Template ID de contato
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'aliba.truta@gmail.com',
        },
        'PlpQwc8eOcKP3qv63' // Public Key
      );
      toast({
        title: "Transmission Successful",
        description: "Your message has been sent through the void. I'll be in touch.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Try again later.",
        variant: "destructive",
      });
    }
    setIsSending(false);
  };

  return (
    <motion.section
      id="contact"
      className="py-20 px-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-orbitron text-3xl md:text-5xl font-bold text-center mb-16 text-cyan-400 uppercase tracking-widest"
          style={{ textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4' }}
        >
          Establish Comms
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hud-panel p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-cyan-300 mb-2 tracking-wider">CALLSIGN (NAME)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-cyan-500/50 rounded-sm p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                placeholder="Enter your callsign"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block text-cyan-300 mb-2 tracking-wider">FREQUENCY (EMAIL)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-cyan-500/50 rounded-sm p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                placeholder="Enter your frequency"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="block text-cyan-300 mb-2 tracking-wider">MESSAGE</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-cyan-500/50 rounded-sm p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
              placeholder="Type your message..."
            ></textarea>
          </div>
          <div className="text-center">
            <motion.button
              type="submit"
              disabled={isSending}
              className="font-orbitron text-base md:text-lg tracking-widest relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white uppercase transition-all duration-300 bg-cyan-600 rounded-sm group hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative flex items-center">
                <Send className="mr-3" size={20} />
                {isSending ? 'TRANSMITTING...' : 'SEND MESSAGE'}
              </span>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;