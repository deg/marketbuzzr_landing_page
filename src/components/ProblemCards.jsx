import React from 'react';
import SectionTitle from './SectionTitle';
import ProblemCard from './ProblemCard';

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

const ProblemCards = ({ onOpenModal }) => (
  <section className="section container" id="problems">
    <SectionTitle
      title="Turn Market Buzz into Signals"
      lead="Surface tailored market trends and insights for Marketers in B2B SaaS"
    />
    <div className="grid">
      {PROBLEMS_DATA.map((problem, index) => (
        <ProblemCard key={index} problem={problem} index={index} />
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

export default ProblemCards;
