import React from 'react';

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

export default Hero;
