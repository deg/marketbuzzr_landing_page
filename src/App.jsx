import React, { useState, useCallback, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
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
import { fintech } from "./content/fintech";
import { medtech } from "./content/medtech";

// Theme switch for review: ?theme=light or ?theme=dark, dark by default. The
// query works inside the hash, so marketbuzzr.com/new/#/use-cases/biotech?theme=light
// is a valid address.
//
// It is REMEMBERED FOR THE SESSION rather than read fresh on each render, and
// that is not a nicety: <Link> drops the query string, so without this the theme
// would snap back to dark on the first click and "?theme=light" would only ever
// describe one page. An explicit ?theme= in the URL always wins over the
// remembered value, so either can be linked directly.
//
// Only the industry page is designed for light so far. The homepage's artwork is
// drawn on near-black grounds (#00041C, #020925, #000B2D) and becomes three dark
// rectangles on a pale background — no CSS fixes that, it needs re-renders. That
// is known and accepted; pages are being moved to native markup one at a time.
const THEMES = ["dark", "light"];
const THEME_KEY = "mb-theme";

const useTheme = () => {
  const [params] = useSearchParams();
  const requested = params.get("theme");

  useEffect(() => {
    const valid = THEMES.includes(requested) ? requested : null;
    if (valid) window.sessionStorage.setItem(THEME_KEY, valid);
    const theme =
      valid || window.sessionStorage.getItem(THEME_KEY) || THEMES[0];
    document.documentElement.dataset.theme = theme;
  }, [requested]);
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
  useTheme();

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
