import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import EmailCaptureModal from "./components/EmailCaptureModal";
import Home from "./pages/Home";
import UseCasePage from "./pages/UseCasePage";
import HowItWorks from "./pages/HowItWorks";
import { ModalContext } from "./ModalContext";
import { biotech } from "./content/biotech";
import { tech } from "./content/tech";

// Each tab is a "page", so reset scroll to top on navigation.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <ErrorBoundary>
      <ModalContext.Provider value={openModal}>
        <ScrollToTop />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/use-cases/biotech"
              element={<UseCasePage data={biotech} />}
            />
            <Route
              path="/use-cases/tech"
              element={<UseCasePage data={tech} />}
            />
            <Route
              path="/use-cases"
              element={<Navigate to="/use-cases/biotech" replace />}
            />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <EmailCaptureModal open={isModalOpen} onClose={closeModal} />
      </ModalContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
