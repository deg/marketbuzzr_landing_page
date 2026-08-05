import React, { useState, useCallback, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { useOptions, canonicaliseOptions } from "./hooks/useOptions";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import EmailCaptureModal from "./components/EmailCaptureModal";
import Home from "./pages/Home";
import UseCasePage from "./pages/UseCasePage";
import IndustryPage from "./pages/IndustryPage";
import HowItWorks from "./pages/HowItWorks";
import Industries from "./pages/Industries";
import NotImplemented from "./pages/NotImplemented";
import { ModalContext } from "./ModalContext";
import { biotech } from "./content/biotech";
import { tech } from "./content/tech";
import { fintech } from "./content/fintech";
import { medtech } from "./content/medtech";

// Review options set from the address bar. The registry in options.js is empty
// today — ?theme=light|dark was the one entry and dark is now simply the design
// (mbz-et8e.49) — so this currently sets nothing and rewrites nothing. It is
// kept wired up because the next question about an unfinished design will want
// it, and options.js says how to register one.
//
const useReviewOptions = () => {
  const options = useOptions();
  // Objects are new every render, so the effect keys off the values instead.
  const applied = Object.values(options).join("|");

  useEffect(() => {
    for (const [name, value] of Object.entries(options)) {
      document.documentElement.dataset[name] = value;
    }
    canonicaliseOptions(options);
    // Keyed off `applied`, not `options`: the object is rebuilt every render, so
    // depending on it would re-run this forever.
  }, [applied]);
};

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
  useReviewOptions();

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
            {/* The two industries Manu has now supplied sketches for. These
                URLs are the ones content/home.js already links to from the
                Industries section, so building them closes two of the four dead
                links that mbz-et8e.18 gates on. */}
            <Route
              path="/industries/financial-technology"
              element={<IndustryPage data={fintech} />}
            />
            <Route
              path="/industries/medical-technology"
              element={<IndustryPage data={medtech} />}
            />
            {/* The entry page the homepage's "Explore all industries" link
                has pointed at since §6 was built. Until now that link reached
                the placeholder; drop_06 supplied the page's copy. */}
            <Route path="/industries" element={<Industries />} />
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
