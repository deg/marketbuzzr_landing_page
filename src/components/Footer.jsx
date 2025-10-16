import React from 'react';

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
        <div>
          <a href="mailto:contact@marketbuzzr.com" aria-label="Email contact">
            contact@marketbuzzr.com
          </a>
        </div>
        <div>
          <a href="mailto:sales@marketbuzzr.com" aria-label="Email sales">
            sales@marketbuzzr.com
          </a>
        </div>
      </div>
      <div>
        <h4>Careers</h4>
        <div>
          <a href="mailto:careers@marketbuzzr.com" aria-label="Email careers">
            careers@marketbuzzr.com
          </a>
        </div>
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

export default Footer;
