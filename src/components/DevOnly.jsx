import React, { useCallback, useEffect, useState } from "react";

// ============================================================================
// EVERYTHING IN THIS FILE IS A DEV/DESIGN-CYCLE AFFORDANCE AND MUST NOT SHIP.
//
// It is deliberately all in one module so removing it is a deletion rather than
// a hunt: delete this file, then the handful of <DevNote> and <DevPeek> usages
// the compiler will point at. See mbz-et8e.18, which gates the merge to main.
//
// Everything here reuses the same amber hazard styling as the not-implemented
// page, so dev scaffolding looks like one recognisable thing on the page.
// ============================================================================

// An inline warning about something known-wrong in the artwork or copy that we
// have decided to live with for now.
export const DevNote = ({ children }) => (
  <aside className="dev-note">
    <span className="dev-note-tag">Dev note</span>
    <p>{children}</p>
  </aside>
);

// Wraps a natively-built diagram so clicking it opens the handoff artwork it
// was based on. Lets the reference art be compared against what we built
// without either replacing the other.
export const DevPeek = ({ label, avif, webp, alt, children }) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <div className="dev-peek">
        {children}
        <button
          type="button"
          className="dev-peek-trigger"
          onClick={() => setOpen(true)}
        >
          Dev: compare with handoff artwork
        </button>
      </div>
      {open && (
        <div
          className="dev-peek-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Handoff artwork: ${label}`}
          onClick={close}
        >
          <div
            className="dev-peek-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dev-peek-bar">
              <span className="dev-note-tag">Handoff artwork — {label}</span>
              <button type="button" className="dev-peek-close" onClick={close}>
                Close
              </button>
            </div>
            <picture>
              <source srcSet={avif} type="image/avif" />
              <source srcSet={webp} type="image/webp" />
              <img src={webp} alt={alt} />
            </picture>
            <p className="dev-peek-foot">
              Reference only. The live section is built natively so it stays
              readable on mobile, keeps its text searchable, and matches the
              dark palette.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
