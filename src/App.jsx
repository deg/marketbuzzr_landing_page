import React, { useState, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Features from './components/Features';
import ProblemCards from './components/ProblemCards';
import Footer from './components/Footer';
import EmailCaptureModal from './components/EmailCaptureModal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ErrorBoundary>
      <Nav onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <Features />
      <ProblemCards onOpenModal={openModal} />
      <Footer onOpenModal={openModal} />
      <EmailCaptureModal open={isModalOpen} onClose={closeModal} />
    </ErrorBoundary>
  );
};

export default App;