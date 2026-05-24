import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DemoButton from "./DemoButton";

const USE_CASES = [
  { to: "/use-cases/biotech", label: "Biotech" },
  { to: "/use-cases/tech", label: "Tech" },
];

const linkClass = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger
  const [dropdownOpen, setDropdownOpen] = useState(false); // Use Cases dropdown
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, []);

  // Collapse everything whenever the route changes (e.g. after a selection).
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Close the dropdown on Escape or a click outside it.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [dropdownOpen]);

  const useCasesActive = pathname.startsWith("/use-cases");

  return (
    <nav>
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={closeAll}>
          <div className="brand-badge">M</div>
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
            <NavLink to="/" end className={linkClass} onClick={closeAll}>
              Home
            </NavLink>

            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className={
                  useCasesActive
                    ? "nav-link nav-dropdown-toggle active"
                    : "nav-link nav-dropdown-toggle"
                }
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((v) => !v)}
              >
                Use Cases
                <span className="nav-caret" aria-hidden="true">
                  ▾
                </span>
              </button>
              <div
                className={
                  dropdownOpen
                    ? "nav-dropdown-panel open"
                    : "nav-dropdown-panel"
                }
              >
                {USE_CASES.map((uc) => (
                  <NavLink
                    key={uc.to}
                    to={uc.to}
                    onClick={closeAll}
                    className={({ isActive }) =>
                      isActive
                        ? "nav-dropdown-item active"
                        : "nav-dropdown-item"
                    }
                  >
                    {uc.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink to="/how-it-works" className={linkClass} onClick={closeAll}>
              How It Works
            </NavLink>
          </div>

          <div className="nav-actions">
            <DemoButton label="Book a Demo" className="primary" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
