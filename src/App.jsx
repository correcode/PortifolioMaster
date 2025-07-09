import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Home from '@/components/Home';
import AboutMe from '@/components/AboutMe';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';
import Contact from '@/components/Contact';
import { ThemeProvider } from '@/providers/ThemeProvider';
import MovingCubesBackground from '@/components/ui/MovingCubesBackground';
import ParticlesBackground from '@/components/ui/ParticlesBackground';

function AppContent() {
  const [showModal, setShowModal] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura aproximada da navbar (16px + mt-4 + padding)
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Alisson Corrêa - Desenvolvedor Full Stack</title>
        <meta name="description" content="Portfólio pessoal de Alisson Corrêa, desenvolvedor de jogos e full stack, com uma interface futurista e interativa." />
      </Helmet>
      <MovingCubesBackground />
      <div className="scanner-bar"></div>
      <ParticlesBackground />
      <div className={`min-h-screen font-mono transition-colors duration-500 bg-black text-gray-200`}>
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/40 to-black"></div>
        </div>
        <div className="relative z-10">
          <Header scrollToSection={scrollToSection} />
          <main className="overflow-hidden">
            <Home onDownloadClick={() => setShowModal(true)} />
            <AboutMe />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <AnimatePresence>
            {showModal && <ResumeModal onClose={() => setShowModal(false)} />}
          </AnimatePresence>
          <Toaster />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;