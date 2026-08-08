import React from 'react';

const Footer = () => (
  <footer id="contact">
    <div className="container footer-grid">
      <div>
        {/* The wordmark alone. drop_07 §2: "Footer brand: remove the separate
            'M'. Show only MarketBuzzr." The M tile that stood here was the last
            of it on the site — the bar dropped its own in mbz-et8e.52.5. */}
        <div className="footer-brand">MarketBuzzr</div>
        <p className="footer-note">
          © 2025–{new Date().getFullYear()} MarketBuzzr. All rights reserved.
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
      </div>
    </div>
  </footer>
);

export default Footer;
