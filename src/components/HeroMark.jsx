import React from "react";

// The illustration at the centre of an industry page's source cluster. One per
// industry, because the subject differs: a helix for Biotechnology, a card for
// Financial Services.
//
// NOT part of the CategoryIcon family, deliberately. Those are 24x24 chips drawn
// with one flat stroke so a set of them reads as one; these are single hero
// illustrations, and forcing one into that box is what made the first attempts
// look thin and lifeless.
//
// Each mark carries its own viewBox — a helix is tall, a card is wide — so the
// registry stores geometry and proportions together rather than assuming a
// square.
//
// THE HELIX GEOMETRY IS GENERATED, not hand-drawn: both strands are the same
// sine half a period apart, sampled every 45 degrees and smoothed with
// Catmull-Rom. Two things do the work of making a flat drawing read as rotating,
// and neither is visible in the result — each strand is split into its in-front
// and behind runs with the behind runs drawn first, thinner and fainter; and the
// rungs shorten towards each crossing, because their length is the horizontal
// gap between the strands. The script that produced the paths is in the bead
// notes for mbz-et8e.38. Regenerate rather than editing the numbers.
//
// The gradient is userSpaceOnUse, not the objectBoundingBox default: a rung is a
// horizontal line whose bounding box has zero height, so a vertical gradient on
// it paints nothing and every rung silently vanishes.
const MARKS = {
  dna: {
    viewBox: "0 0 64 132",
    ratio: 132 / 64,
    rotate: 38,
    render: (
      <>
    {/* Behind the axis: thinner and faded, drawn first so the front strands
        overlap them at the crossings. */}
    <g stroke="url(#hero-mark-gradient)" strokeWidth="3.4" opacity="0.42">
      <path d="M46.8 31.0C44.4 32.2 36.9 35.7 32.0 38.0C27.1 40.3 20.7 42.7 17.2 45.0C13.7 47.3 12.0 50.8 11.0 52.0" />
      <path d="M46.8 87.0C44.4 88.2 36.9 91.7 32.0 94.0C27.1 96.3 20.7 98.7 17.2 101.0C13.7 103.3 12.0 106.8 11.0 108.0" />
      <path d="M32.0 10.0C29.5 11.2 20.7 14.7 17.2 17.0C13.7 19.3 12.0 22.8 11.0 24.0" />
      <path d="M46.8 59.0C44.4 60.2 36.9 63.7 32.0 66.0C27.1 68.3 20.7 70.7 17.2 73.0C13.7 75.3 12.0 78.8 11.0 80.0" />
      <path d="M46.8 115.0C44.4 116.2 34.5 120.8 32.0 122.0" />
    </g>

    {/* The base pairs. Length follows the gap between the strands, so they
        vanish at the crossings; opacity follows depth. */}
    <g stroke="url(#hero-mark-gradient)" strokeWidth="2.8">
      <path d="M16.4 17.5H47.6" opacity="0.77" />
      <path d="M11.1 24.9H52.9" opacity="0.57" />
      <path d="M19.7 32.4H44.3" opacity="0.40" />
      <path d="M27.6 39.9H36.4" opacity="0.36" />
      <path d="M13.8 47.3H50.2" opacity="0.47" />
      <path d="M12.0 54.8H52.0" opacity="0.68" />
      <path d="M23.5 62.3H40.5" opacity="0.83" />
      <path d="M23.5 69.7H40.5" opacity="0.83" />
      <path d="M12.0 77.2H52.0" opacity="0.68" />
      <path d="M13.8 84.7H50.2" opacity="0.48" />
      <path d="M27.6 92.1H36.4" opacity="0.36" />
      <path d="M19.7 99.6H44.3" opacity="0.40" />
      <path d="M11.1 107.1H52.9" opacity="0.57" />
      <path d="M16.4 114.5H47.6" opacity="0.77" />
    </g>

    {/* In front of the axis: full weight, drawn last. */}
    <g stroke="url(#hero-mark-gradient)" strokeWidth="4.6">
      <path d="M32.0 10.0C34.5 11.2 43.3 14.7 46.8 17.0C50.3 19.3 52.0 22.8 53.0 24.0" />
      <path d="M17.2 59.0C19.6 60.2 27.1 63.7 32.0 66.0C36.9 68.3 43.3 70.7 46.8 73.0C50.3 75.3 52.0 78.8 53.0 80.0" />
      <path d="M17.2 115.0C19.6 116.2 29.5 120.8 32.0 122.0" />
      <path d="M17.2 31.0C19.6 32.2 27.1 35.7 32.0 38.0C36.9 40.3 43.3 42.7 46.8 45.0C50.3 47.3 52.0 50.8 53.0 52.0" />
      <path d="M17.2 87.0C19.6 88.2 27.1 91.7 32.0 94.0C36.9 96.3 43.3 98.7 46.8 101.0C50.3 103.3 52.0 106.8 53.0 108.0" />
    </g>
      </>
    ),
  },

  // A payment card, for Financial Services & FinTech. Same stroke treatment as
  // the helix so the two read as one family: a heavy front, a fainter back, and
  // the brand gradient across the whole mark.
  card: {
    viewBox: "0 0 132 96",
    ratio: 96 / 132,
    rotate: -12,
    render: (
      <>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="3" opacity="0.42">
          <path d="M14 22h104a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8z" />
        </g>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="3.2">
          <path d="M6 40h120" />
          <path d="M20 60h22M20 70h34" />
          <rect x="86" y="54" width="24" height="18" rx="4" />
        </g>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="4.6">
          <path d="M14 14h104a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8z" />
        </g>
      </>
    ),
  },

  // A shield with a monitoring trace through it, for Public Safety & Defense
  // Technology. Drawn here rather than taken from a library: the August handover
  // asks for "legally licensed open source icons ... or create original SVG
  // icons", and this is original.
  //
  // IT EXISTS BECAUSE THE FALLBACK BELOW IS WRONG FOR THIS PAGE. `name` defaults
  // to the helix, so an industry with no mark of its own quietly renders a DNA
  // strand — harmless on Biotechnology, which is the only page relying on it,
  // and plainly wrong beside a defense procurement headline.
  //
  // Same three-layer treatment as the other two so the family holds: a faint
  // copy offset 8px behind, the detail at mid weight, the outline heaviest.
  shield: {
    viewBox: "0 0 108 128",
    ratio: 128 / 108,
    rotate: -8,
    render: (
      <>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="3" opacity="0.42">
          <path d="M54 16 96 32v40c0 27-17 46-42 54-25-8-42-27-42-54V32L54 16z" />
        </g>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="3.2">
          <path d="M26 62h13l8-15 11 28 8-13h14" />
        </g>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="4.6">
          <path d="M54 8 96 24v40c0 27-17 46-42 54-25-8-42-27-42-54V24L54 8z" />
        </g>
      </>
    ),
  },

  // A stacked cube, for Enterprise Technology: a platform with layers under it.
  // Original SVG, same three-layer treatment as the others, and set for the same
  // reason the shield is — without it the page would render the helix.
  //
  // The mid-height diamond is what makes it read as a stack rather than a plain
  // box; drop it and the mark is just a crate.
  cube: {
    viewBox: "0 0 120 128",
    ratio: 128 / 120,
    rotate: -6,
    render: (
      <>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="3" opacity="0.42">
          <path d="M60 20 108 46 60 72 12 46z" />
          <path d="M12 46v52l48 26 48-26V46" />
        </g>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="3.2">
          <path d="M12 64 60 90l48-26" />
        </g>
        <g stroke="url(#hero-mark-gradient)" strokeWidth="4.6">
          <path d="M60 12 108 38 60 64 12 38z" />
          <path d="M12 38v52l48 26 48-26V38" />
          <path d="M60 64v52" />
        </g>
      </>
    ),
  },
};

const HeroMark = ({ name = "dna" }) => {
  const mark = MARKS[name] || MARKS.dna;
  return (
    <svg
      className={`hero-mark hero-mark-${name}`}
      viewBox={mark.viewBox}
      style={{ "--mark-ratio": mark.ratio, "--mark-rotate": `${mark.rotate}deg` }}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="hero-mark-gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="132"
        >
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="50%" stopColor="var(--brand-3)" />
          <stop offset="100%" stopColor="var(--brand-2)" />
        </linearGradient>
      </defs>
      {mark.render}
    </svg>
  );
};

export default HeroMark;
