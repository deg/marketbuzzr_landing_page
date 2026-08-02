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
