import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DemoButton from "./DemoButton";
import { nav } from "../content/nav";

const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

// The top bar, from Manu's August handover section 2: wordmark left, How It
// Works and Industries centre, Try for Free and Book a Demo right.
//
// THE DROPDOWN MACHINERY IS GONE (mbz-et8e.52.5). There were two menus, Product
// and Industries, and with them an open-menu state, a ref, an Escape handler and
// a document-wide mousedown listener. His structure has no menus, so all of that
// was dead — and dead code that attaches window listeners is worse than dead
// markup. If a menu is wanted again it comes back from git history rather than
// being carried unused.
//
// The mobile hamburger stays. Two links and two buttons still need somewhere to
// go on a narrow screen, and .nav-menu is what puts them there.
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const closeAll = useCallback(() => setMenuOpen(false), []);

  // Collapse the mobile menu whenever the route changes, e.g. after a selection.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  return (
    <nav>
      <div className="container nav-inner">
        {/* The wordmark is TEXT, not the M tile it replaced. His brief: "The
            MarketBuzzr wordmark should use the bright, bold typographic
            treatment shown in the reference. Do not use a separate icon logo."
            The aria-label went with the tile — the link has a readable name of
            its own now, and a label that merely repeated it would be noise. */}
        <Link to="/" className="brand" onClick={closeAll}>
          MarketBuzzr
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <div className="nav-links">
            {nav.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={closeAll}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Both CTAs, and the shared .cta / .cta-secondary rules give them the
              filled and outlined treatments his brief pairs with these labels. */}
          <div className="nav-actions">
            <DemoButton label={nav.ctaPrimary} className="cta" />
            <DemoButton label={nav.ctaSecondary} className="cta-secondary" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
