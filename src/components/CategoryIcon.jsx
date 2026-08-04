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
  // --- Added for the FinTech and MedTech industry pages. ---

  // Regulation and policy — a classical portico, the standard mark for an
  // institution or a regulator.
  bank: (
    <>
      <path d="M3 9.5L12 4l9 5.5" />
      <path d="M5.5 9.5v9M10 9.5v9M14 9.5v9M18.5 9.5v9" />
      <path d="M3 21h18" />
    </>
  ),
  // Product launches — a rocket.
  rocket: (
    <>
      <path d="M12 2.5c3 2 4.5 5.3 4.5 9 0 2-.5 3.7-1.2 5H8.7C8 15.2 7.5 13.5 7.5 11.5c0-3.7 1.5-7 4.5-9z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M8.7 16.5L6 19.5l3-.6M15.3 16.5l2.7 3-3-.6" />
    </>
  ),
  // Payments innovation — a bolt.
  bolt: <path d="M13.5 2.5L5 13.5h5.5L10 21.5 19 10.5h-5.5z" />,
  // AI and emerging technology — a processor.
  chip: (
    <>
      <path d="M7.5 7.5h9v9h-9z" />
      <path d="M4.5 4.5h15v15h-15z" />
      <path d="M9.5 4.5v-2M14.5 4.5v-2M9.5 21.5v-2M14.5 21.5v-2M4.5 9.5h-2M4.5 14.5h-2M21.5 9.5h-2M21.5 14.5h-2" />
    </>
  ),
  // Partnerships and M&A — two hands meeting.
  handshake: (
    <>
      <path d="M2.5 12.5l3.5-3.5 4 1 2 2-2 2-2-1.5" />
      <path d="M21.5 12.5L18 9l-4 1" />
      <path d="M10 14l2 2 2-2 2 2 2-2" />
      <path d="M2.5 12.5l3 3M21.5 12.5l-3 3" />
    </>
  ),
  // Funding and investment — stacked coins.
  coins: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v5c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6" />
      <path d="M5 11v5c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-5" />
    </>
  ),
  // Clinical developments — a stethoscope.
  clinical: (
    <>
      <path d="M6 3v5a4.5 4.5 0 0 0 9 0V3" />
      <path d="M4 3h3M14 3h3" />
      <path d="M10.5 12.5v3a4.5 4.5 0 0 0 9 0v-1.2" />
      <circle cx="19.5" cy="12" r="2" />
    </>
  ),
  // Financial news and wire coverage — a globe.
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  // A press release or briefing — a sheet with a seal.
  release: (
    <>
      <path d="M5.5 3.5h13v17h-13z" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" />
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
