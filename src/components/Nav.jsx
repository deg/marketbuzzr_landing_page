import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DemoButton from "./DemoButton";
import { nav } from "../content/nav";

const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

// The top bar, from drop_07 §2: wordmark left with How It Works, What You Get
// and Industries grouped beside it, and the two CTAs right.
//
// THE DROPDOWN MACHINERY IS BACK, recovered from the commit that deleted it
// (mbz-et8e.52.5) rather than rewritten. That deletion was right on drop_06's
// wording and is wrong on this one, which asks for an Industries dropdown by
// name. What came back with it: one open-label state, a ref, an Escape handler
// and a document-wide mousedown listener. What did NOT come back is the second
// menu it also carried — Product — because §2 lists three links and no more.
//
// The mobile hamburger stays. Three links, a menu and two buttons still need
// somewhere to go on a narrow screen, and .nav-menu is what puts them there.
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false); // mobile hamburger
  // One label at a time rather than a flag per dropdown: opening a second
  // closes the first, which is what a menu bar should do. There is only one
  // menu today, and this costs nothing while there is.
  const [openMenu, setOpenMenu] = useState(null);
  const linksRef = useRef(null);
  const { pathname } = useLocation();

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setOpenMenu(null);
  }, []);

  // Collapse everything whenever the route changes, e.g. after a selection.
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
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                  onClick={closeAll}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>

          {/* Both CTAs, and the shared .cta / .cta-secondary rules give them the
              filled and outlined treatments his brief pairs with these labels. */}
          <div className="nav-actions">
            <DemoButton
              label={nav.ctaPrimary}
              className="cta"
              source="try-free"
            />
            <DemoButton
              label={nav.ctaSecondary}
              className="cta-secondary"
              source="book-demo"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
