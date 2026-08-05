import React from "react";

// ============================================================================
// FIX-BEFORE-RELEASE (mbz-et8e.18): delete this entire file.
// EVERYTHING IN THIS FILE IS A DEV/DESIGN-CYCLE AFFORDANCE AND MUST NOT SHIP.
//
// It is deliberately all in one module so removing it is a deletion rather than
// a hunt: delete this file, then the handful of <DevNote> and <DevFlag> usages
// the compiler will point at. See mbz-et8e.18, which gates the merge.
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

// The same thing, one line, for flagging a specific piece of copy rather than a
// whole section. It goes DIRECTLY under the line it is about — a block note
// several paragraphs away, describing "the line above each step", was the
// version this replaced, and nobody could tell which line it meant.
//
// Keep the text to a few words. The reasoning belongs in a code comment and in
// the memo; this only has to say which line and ask the question.
export const DevFlag = ({ children }) => (
  <span className="dev-flag">
    <span className="dev-flag-tag">Dev</span>
    {children}
  </span>
);
