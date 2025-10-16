import React from "react";

// Data constants
const FEATURES_DATA = [
  {
    heading: "Competitor Blog Posts",
    description: "Analyze competitor content to detect themes, gaps, and opportunities. Our AI automates the monitoring and surfaces what matters.",
    actionText: "Start tracking competitor blog posts",
  },
  {
    heading: "Webinars",
    description: "Follow industry leaders, topics, and key takeaways in real-time to inform GTM and positioning decisions.",
    actionText: "Start tracking industry webinars",
  },
  {
    heading: "Podcasts",
    description: "Capture expert opinions, pain points, and evolving narratives from industry podcasts — summarized for quick review.",
    actionText: "Start tracking industry podcasts",
  },
  {
    heading: "Social Posts",
    description: "Monitor LinkedIn and other channels to see what leaders are saying, trending concerns, and shifting industry priorities.",
    actionText: "Start tracking social posts",
  },
];

const PROBLEMS_DATA = [
  {
    heading: "Keeping track of competitors is a mess?",
    actionText: "Track competitors, fully automated!",
  },
  {
    heading: "Afraid to miss out on new market trends?",
    actionText: "Stay on top of market trends — never miss out!",
  },
  {
    heading: "Too busy to watch webinars and listen to podcasts?",
    actionText: "Get tailored takeaways — from all your favorite events!",
  },
  {
    heading: "Your CEO is asking you about the market?",
    actionText: "Get tailored reports — all the time!",
  },
];

const Nav = ({ onOpenModal }) => (
  <nav>
    <div className="container nav-inner">
      <div className="brand">
        <div className="brand-badge">M</div>
        MarketBuzzr
      </div>
      <div className="nav-actions">
        <a href="#contact">Contact Us</a>
        <a
          href="#"
          className="primary"
          onClick={(e) => {
            e.preventDefault();
            onOpenModal();
          }}
          aria-label="Book a demo"
        >
          Book a Demo
        </a>
      </div>
    </div>
  </nav>
);

const Hero = ({ onOpenModal }) => (
  <header className="hero container">
    <span className="kicker">Market Intelligence for B2B SaaS</span>
    <h1>Always know what's up</h1>
    <p className="sub">
      Track competitor posts, industry webinars & podcasts. Neatly summarized,
      ready for decision-making.
    </p>
    <a
      href="#"
      className="cta"
      onClick={(e) => {
        e.preventDefault();
        onOpenModal();
      }}
      aria-label="Get your MarketBuzzr"
    >
      Get your MarketBuzzr
    </a>
  </header>
);

const SectionTitle = ({ title, lead }) => (
  <>
    <h2>{title}</h2>
    {lead ? <p className="lead">{lead}</p> : null}
  </>
);

const Features = () => (
  <section className="section container" id="features">
    <SectionTitle
      title="Track all relevant market activities"
      lead="Never miss out on competitor activities and market trends"
    />
    <div className="grid">
      {FEATURES_DATA.map((feature, index) => (
        <div key={index} className="card">
          <div className="icon" />
          <h3>{feature.heading}</h3>
          <p>{feature.description}</p>
          <a href="#">{feature.actionText}</a>
        </div>
      ))}
    </div>
  </section>
);

const ComingSoonModal = ({ open, onClose }) => {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  // lock page scroll while the modal is open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  if (!open) return null;
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Coming soon</h3>
        <p>Thanks for your interest! We will be open for business very soon.</p>
        <p className="muted">
          Want to talk now? Email{" "}
          <a href="mailto:contact@marketbuzzr.com">contact@marketbuzzr.com</a>.
        </p>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProblemCards = ({ onOpenModal }) => (
  <section className="section container" id="problems">
    <SectionTitle
      title="Turn Market Buzz into Signals"
      lead="Surface tailored market trends and insights for Marketers in B2B SaaS"
    />
    <div className="grid">
      {PROBLEMS_DATA.map((problem, index) => (
        <div key={index} className="card">
          <div className="icon" />
          <h3>{problem.heading}</h3>
          <a href="#">{problem.actionText}</a>
        </div>
      ))}
    </div>
    <div className="cta-panel" id="book">
      <h3>Tailored Intelligence, built for your Business</h3>
      <p>
        Harness the power of data and qualitative insights. MarketBuzzr delivers
        actionable intelligence calibrated to your industry, audience, and
        goals.
      </p>
      <p>
        <a
          href="#"
          className="primary"
          onClick={(e) => {
            e.preventDefault();
            onOpenModal();
          }}
          aria-label="Book a demo"
        >
          Book a Demo
        </a>
      </p>
    </div>
  </section>
);

const Footer = ({ onOpenModal }) => (
  <footer id="contact">
    <div className="container footer-grid">
      <div>
        <div className="footer-brand">
          <div className="brand-badge">M</div>
          MarketBuzzr
        </div>
        <p className="footer-note">
          © 2025 MarketBuzzr — All rights reserved.
        </p>
      </div>
      <div>
        <h4>Contact</h4>
        <div>contact@marketbuzzr.com</div>
        <div>sales@marketbuzzr.com</div>
      </div>
      <div>
        <h4>Careers</h4>
        <div>careers@marketbuzzr.com</div>
        <div>
          <a
            href="#"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal();
            }}
            aria-label="Terms and Conditions"
          >
            Terms and Conditions
          </a>
          {" · "}
          <a
            href="#"
            className="footer-link"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal();
            }}
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [show, setShow] = React.useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Nav onOpenModal={open} />
      <Hero onOpenModal={open} />
      <Features />
      <ProblemCards onOpenModal={open} />
      <Footer onOpenModal={open} />
      <ComingSoonModal open={show} onClose={close} />
    </>
  );
};

export default App;
