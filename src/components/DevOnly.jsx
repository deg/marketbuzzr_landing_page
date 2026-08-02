import React, { useCallback, useEffect, useState } from "react";

// ============================================================================
// FIX-BEFORE-RELEASE (mbz-et8e.18): delete this entire file.
// EVERYTHING IN THIS FILE IS A DEV/DESIGN-CYCLE AFFORDANCE AND MUST NOT SHIP.
//
// It is deliberately all in one module so removing it is a deletion rather than
// a hunt: delete this file, then the handful of <DevNote> and <DevAlternative>
// usages the compiler will point at. See mbz-et8e.18, which gates the merge.
//
// Note that ProductImage is NOT dev-only and must survive this deletion.
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

// Parks an alternative rendering of a section behind a trigger, so it can be
// compared against what is actually shown without either replacing the other.
//
// Sections 3 and 6 show the handoff artwork; their natively-built versions live
// in here. Those were kept rather than deleted because they may come back as the
// mobile rendering, where the artwork is too small to read.
export const DevAlternative = ({ label, children }) => {
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
      <button
        type="button"
        className="dev-peek-trigger"
        onClick={() => setOpen(true)}
      >
        Dev: simpler {label} for small screens
      </button>
      {open && (
        <div
          className="dev-peek-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Simpler alternative: ${label}`}
          onClick={close}
        >
          <div className="dev-peek-panel" onClick={(e) => e.stopPropagation()}>
            <div className="dev-peek-bar">
              <span className="dev-note-tag">Simpler alternative — {label}</span>
              <button type="button" className="dev-peek-close" onClick={close}>
                Close
              </button>
            </div>
            {children}
            <p className="dev-peek-foot">
              A plainer version of this section, built in HTML rather than as
              an image. It is not shown on the page — the section uses the
              handoff artwork, which carries more detail. This one stays
              readable on a phone, where the artwork does not, so it is kept as
              a candidate for the mobile layout.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
