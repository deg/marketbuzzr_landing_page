import React from "react";

// Stands in for a visual that does not exist yet, carrying a description of
// what belongs there. Deliberately looks unfinished so nobody mistakes it for
// the real thing on the /new/ sandbox.
//
// `ratio` reserves the slot's height (CSS aspect-ratio) so dropping in the real
// image or component later does not shift the rest of the page.
const SectionPlaceholder = ({ note, ratio, className = "" }) => (
  <div
    className={["section-placeholder", className].filter(Boolean).join(" ")}
    style={ratio ? { aspectRatio: ratio } : undefined}
  >
    <span className="section-placeholder-tag">Placeholder</span>
    <p>{note}</p>
  </div>
);

export default SectionPlaceholder;
