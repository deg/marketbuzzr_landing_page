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
import IndustryPage from "./pages/IndustryPage";
import HowItWorks from "./pages/HowItWorks";
import Industries from "./pages/Industries";
import NotImplemented from "./pages/NotImplemented";
import { ModalContext } from "./ModalContext";
import { biotech } from "./content/biotech";
import { enterpriseTech } from "./content/enterpriseTech";
import { fintech } from "./content/fintech";
import { medtech } from "./content/medtech";
import { otherIndustries } from "./content/otherIndustries";
import { cybersecurity } from "./content/cybersecurity";
import { manufacturing } from "./content/manufacturing";
import { retail } from "./content/retail";
import { publicSafety } from "./content/publicSafety";

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

  // Which CTA opened the modal, held here rather than in the modal so it
  // survives the modal's own reset-on-close (mbz-et8e.15).
  const [modalSource, setModalSource] = useState("");

  const openModal = useCallback((source = "") => {
    setModalSource(source);
    setIsModalOpen(true);
  }, []);
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
            {/* THE /use-cases/* PATHS ARE HISTORY, NOT A CATEGORY. Both pages
                are industries and both render IndustryPage; they keep these URLs
                because they had them before the industry-page system existed and
                renaming would break the homepage list and any external link for
                no reader benefit. New pages take /industries/*. */}
            <Route
              path="/use-cases/biotech"
              element={<IndustryPage data={biotech} />}
            />
            <Route
              path="/use-cases/tech"
              element={<IndustryPage data={enterpriseTech} />}
            />
            {/* The industries built since the template existed. Every path here
                is one content/home.js links to, and with Other Industries in
                place none of the six industry links is dead any more — the last
                of the five that mbz-et8e.18 gates on. Medical, Financial and
                Biotechnology come from Manu's approved dark HTML; Public Safety
                and Other Industries are built from the template and the August
                handover's locked copy. */}
            <Route
              path="/industries/financial-technology"
              element={<IndustryPage data={fintech} />}
            />
            <Route
              path="/industries/medical-technology"
              element={<IndustryPage data={medtech} />}
            />
            <Route
              path="/industries/public-safety-defense-technology"
              element={<IndustryPage data={publicSafety} />}
            />
            <Route
              path="/industries/other-industries"
              element={<IndustryPage data={otherIndustries} />}
            />
            {/* drop_07 §9-§11's three. They take the same template and the same
                /industries/* shape as everything built since it existed, and
                their copy is locked in that brief. */}
            <Route
              path="/industries/cybersecurity"
              element={<IndustryPage data={cybersecurity} />}
            />
            <Route
              path="/industries/manufacturing"
              element={<IndustryPage data={manufacturing} />}
            />
            <Route
              path="/industries/retail"
              element={<IndustryPage data={retail} />}
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
        <EmailCaptureModal
          open={isModalOpen}
          onClose={closeModal}
          source={modalSource}
        />
      </ModalContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
