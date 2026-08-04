import React from "react";

// Six line icons for the intelligence categories. Deliberately plain geometry
// drawn on a 24x24 box with a single stroke weight, so they read as one set
// rather than six unrelated pictures. Stroke is currentColor, so the card
// controls the colour.
//
// Decorative: every icon sits directly above its own heading, so naming it
// again for a screen reader would just be repetition.
const PATHS = {
  // Competitive Intelligence — a target being sighted.
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </>
  ),
  // Market & Industry — a trend line over its axis.
  trend: (
    <>
      <path d="M3 20V4" />
      <path d="M3 20h18" />
      <path d="M6.5 16l4-4.5 3.5 3 6-7" />
      <path d="M20 7.5V11M20 7.5h-3.5" />
    </>
  ),
  // Regulation & Risk — a shield.
  shield: (
    <>
      <path d="M12 2.5l7.5 3v6c0 4.4-3 8.3-7.5 10-4.5-1.7-7.5-5.6-7.5-10v-6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  // Growth & Opportunities — rising columns.
  growth: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M6.5 20.5v-5M11 20.5v-9M15.5 20.5v-6M20 20.5v-12" />
    </>
  ),
  // Content & Communication — a message.
  message: (
    <>
      <path d="M3.5 5.5h17v11h-9l-5 4v-4h-3z" />
      <path d="M7.5 9.5h9M7.5 12.5h6" />
    </>
  ),
  // Executive Intelligence — a compass, for direction-setting.
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),

  // --- Added for the industry pages, same 24x24 box and stroke weight. ---

  // Patient and caregiver communities — two figures, one behind the other.
  people: (
    <>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3.5 19.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6" />
      <path d="M17.5 14.2c1.9.8 3 2.6 3 5.3" />
    </>
  ),
  // Conferences and events — a calendar.
  calendar: (
    <>
      <path d="M4 6h16v14H4z" />
      <path d="M4 10h16" />
      <path d="M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  // Media and blogs — a page of text with a folded corner.
  article: (
    <>
      <path d="M5.5 3.5h9l5 5v12h-14z" />
      <path d="M14.5 3.5v5h5" />
      <path d="M8.5 12.5h7M8.5 16h5" />
    </>
  ),
  // Video — a play mark in a frame.
  video: (
    <>
      <path d="M3 6.5h18v11H3z" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" />
    </>
  ),
  // Online communities — two overlapping threads of conversation.
  threads: (
    <>
      <path d="M3.5 5.5h11v7h-6l-3 2.5v-2.5h-2z" />
      <path d="M9.5 15.5h9v-6" />
      <path d="M20.5 9.5v9l-3-2.5" />
    </>
  ),
  // Competitor communications — a building.
  building: (
    <>
      <path d="M5 20.5V4.5h9v16" />
      <path d="M14 9.5h5v11" />
      <path d="M8 8h3M8 11.5h3M8 15h3" />
      <path d="M3 20.5h18" />
    </>
  ),
  // Caregiver and patient experience — a heart.
  heart: (
    <path d="M12 20.5C6.5 17 3.5 13.6 3.5 9.9A4.4 4.4 0 0 1 12 8a4.4 4.4 0 0 1 8.5 1.9c0 3.7-3 7.1-8.5 10.6z" />
  ),
  // The subject at the centre of the source cluster: a DNA double helix, which
  // is what the sketch drew. An earlier version here was a generic molecule
  // diagram — right family, wrong picture, and it read as neither.
  // Two strands crossing TWICE, which is what makes it read as a helix. A single
  // crossing — the obvious first attempt — draws an hourglass, not DNA.
  dna: (
    <>
      <path d="M7.5 2.5c0 3 9 4 9 7s-9 4-9 7 9 4 9 7" />
      <path d="M16.5 2.5c0 3-9 4-9 7s9 4 9 7-9 4-9 7" />
      <path d="M8.6 4.5h6.8M9.2 12.5h5.6M8.6 20.5h6.8" />
    </>
  ),
};

const CategoryIcon = ({ name }) => (
  <svg
    className="category-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {PATHS[name]}
  </svg>
);

export default CategoryIcon;
