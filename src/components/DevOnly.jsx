import React from "react";

// ============================================================================
// FIX-BEFORE-RELEASE (mbz-et8e.18): delete this entire file.
// EVERYTHING IN THIS FILE IS A DEV/DESIGN-CYCLE AFFORDANCE AND MUST NOT SHIP.
//
// It is deliberately all in one module so removing it is a deletion rather than
// a hunt: delete this file, then the handful of <DevNote> usages the compiler
// will point at. See mbz-et8e.18, which gates the merge.
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
