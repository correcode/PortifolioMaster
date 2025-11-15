import React, { useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import { ThemeProvider } from '@/providers/ThemeProvider';
import MovingCubesBackground from '@/components/ui/MovingCubesBackground';
import ParticlesBackground from '@/components/ui/ParticlesBackground';

// Lazy load components
const Home = lazy(() => import('@/components/Home'));
const AboutMe = lazy(() => import('@/components/AboutMe'));
const Projects = lazy(() => import('@/components/Projects'));
const Footer = lazy(() => import('@/components/Footer'));
const ResumeModal = lazy(() => import('@/components/ResumeModal'));
const Contact = lazy(() => import('@/components/Contact'));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
  </div>
);

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
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" style={{ willChange: 'auto' }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900/40 to-black"></div>
        </div>
        <div className="relative z-10">
          <Header scrollToSection={scrollToSection} />
          <main className="overflow-hidden">
            <Suspense fallback={<SectionLoader />}>
              <Home onDownloadClick={() => setShowModal(true)} />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <AboutMe />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <AnimatePresence>
            {showModal && (
              <Suspense fallback={null}>
                <ResumeModal onClose={() => setShowModal(false)} />
              </Suspense>
            )}
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