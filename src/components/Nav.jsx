import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DemoButton from "./DemoButton";
import { nav } from "../content/nav";

const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger
  // One label at a time rather than a flag per dropdown: opening a second
  // closes the first, which is what a menu bar should do.
  const [openMenu, setOpenMenu] = useState(null);
  const linksRef = useRef(null);
  const { pathname } = useLocation();

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setOpenMenu(null);
  }, []);

  // Collapse everything whenever the route changes (e.g. after a selection).
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Close an open dropdown on Escape or a click outside the link row.
  useEffect(() => {
    if (!openMenu) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onClick = (e) => {
      if (linksRef.current && !linksRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  return (
    <nav>
      <div className="container nav-inner">
        <Link
          to="/"
          className="brand"
          onClick={closeAll}
          aria-label="MarketBuzzr home"
        >
          <div className="brand-badge">M</div>
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
          <div className="nav-links" ref={linksRef}>
            {nav.items.map((item) =>
              item.items ? (
                <div className="nav-dropdown" key={item.label}>
                  <button
                    type="button"
                    className={
                      // A dropdown reads as current when the page you are on is
                      // one of its children.
                      item.items.some((child) => child.to === pathname)
                        ? "nav-link nav-dropdown-toggle active"
                        : "nav-link nav-dropdown-toggle"
                    }
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                    onClick={() =>
                      setOpenMenu((open) =>
                        open === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <span className="nav-caret" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  <div
                    className={
                      openMenu === item.label
                        ? "nav-dropdown-panel open"
                        : "nav-dropdown-panel"
                    }
                  >
                    {item.items.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={closeAll}
                        className={({ isActive }) =>
                          isActive
                            ? "nav-dropdown-item active"
                            : "nav-dropdown-item"
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={linkClass}
                  onClick={closeAll}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>

          <div className="nav-actions">
            {/* Login leaves the marketing site for the product, so it is a
                plain anchor rather than a router link. */}
            <a className="nav-login" href={nav.login.href}>
              {nav.login.label}
            </a>
            <DemoButton label={nav.cta} className="primary" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
