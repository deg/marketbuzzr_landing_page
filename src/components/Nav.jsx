import React from 'react';

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

export default Nav;
