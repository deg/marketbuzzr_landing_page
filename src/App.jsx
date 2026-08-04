import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import EmailCaptureModal from "./components/EmailCaptureModal";
import Home from "./pages/Home";
import UseCasePage from "./pages/UseCasePage";
import IndustryPage from "./pages/IndustryPage";
import HowItWorks from "./pages/HowItWorks";
import NotImplemented from "./pages/NotImplemented";
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
        {/* First thing in the tab order, so keyboard users can jump the eight
            nav items instead of traversing them on every page. */}
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Biotech is the pilot for the new industry-page structure and has
                moved to IndustryPage; tech stays on UseCasePage until the pilot
                is judged (mbz-et8e.38). Two templates on purpose, temporarily. */}
            <Route
              path="/use-cases/biotech"
              element={<IndustryPage data={biotech} />}
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
            {/* FIX-BEFORE-RELEASE (mbz-et8e.18): keep this route, revisit what it renders.
                Anything else lands on a visible placeholder. This used to
                redirect silently to "/", which meant a typo or a stale link
                left the visitor back at the start with no explanation — and it
                is why linking to unbuilt pages was previously unsafe. */}
            <Route path="*" element={<NotImplemented />} />
          </Routes>
        </main>
        <Footer />
        <EmailCaptureModal open={isModalOpen} onClose={closeModal} />
      </ModalContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
