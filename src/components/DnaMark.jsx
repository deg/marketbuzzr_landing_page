import React from "react";

// The mark at the centre of the source cluster on the Biotechnology page.
//
// NOT part of the CategoryIcon family, deliberately. Those are 24x24 chips drawn
// with one flat stroke so six of them read as a set; this is a single hero
// illustration, and forcing it into that box is what made the first two attempts
// look thin and lifeless next to the artwork it replaces.
//
// The geometry is generated rather than hand-drawn: both strands are the same
// sine, half a period apart, sampled every 45 degrees and smoothed with
// Catmull-Rom. Two things do the actual work of making a flat drawing read as a
// rotating helix, and neither is obvious from looking at it:
//
//   - Each strand is split into the runs where it is in FRONT of the axis and
//     the runs where it is BEHIND, and the back runs are drawn first, thinner
//     and fainter. That is what makes the strands appear to pass one another
//     rather than simply cross.
//   - The rungs shorten towards each crossing, because their length is the
//     horizontal distance between the strands. A ladder of equal-length rungs
//     reads as flat no matter how the strands are drawn.
//
// Regenerating: the script that produced these paths is in the bead notes for
// mbz-et8e.38. Editing the numbers by hand is not worth attempting.
const DnaMark = () => (
  <svg
    className="dna-mark"
    viewBox="0 0 64 132"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <defs>
      {/* userSpaceOnUse, not the objectBoundingBox default, for two reasons: a
          rung is a horizontal line whose bounding box has zero height, so a
          vertical gradient on it is degenerate and paints nothing — the rungs
          simply vanished — and per-path boxes would give every segment its own
          copy of the ramp instead of one gradient across the whole mark. */}
      <linearGradient
        id="dna-strand"
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

    {/* Behind the axis: thinner and faded, drawn first so the front strands
        overlap them at the crossings. */}
    <g stroke="url(#dna-strand)" strokeWidth="3.4" opacity="0.42">
      <path d="M46.8 31.0C44.4 32.2 36.9 35.7 32.0 38.0C27.1 40.3 20.7 42.7 17.2 45.0C13.7 47.3 12.0 50.8 11.0 52.0" />
      <path d="M46.8 87.0C44.4 88.2 36.9 91.7 32.0 94.0C27.1 96.3 20.7 98.7 17.2 101.0C13.7 103.3 12.0 106.8 11.0 108.0" />
      <path d="M32.0 10.0C29.5 11.2 20.7 14.7 17.2 17.0C13.7 19.3 12.0 22.8 11.0 24.0" />
      <path d="M46.8 59.0C44.4 60.2 36.9 63.7 32.0 66.0C27.1 68.3 20.7 70.7 17.2 73.0C13.7 75.3 12.0 78.8 11.0 80.0" />
      <path d="M46.8 115.0C44.4 116.2 34.5 120.8 32.0 122.0" />
    </g>

    {/* The base pairs. Length follows the gap between the strands, so they
        vanish at the crossings; opacity follows depth. */}
    <g stroke="url(#dna-strand)" strokeWidth="2.8">
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
    <g stroke="url(#dna-strand)" strokeWidth="4.6">
      <path d="M32.0 10.0C34.5 11.2 43.3 14.7 46.8 17.0C50.3 19.3 52.0 22.8 53.0 24.0" />
      <path d="M17.2 59.0C19.6 60.2 27.1 63.7 32.0 66.0C36.9 68.3 43.3 70.7 46.8 73.0C50.3 75.3 52.0 78.8 53.0 80.0" />
      <path d="M17.2 115.0C19.6 116.2 29.5 120.8 32.0 122.0" />
      <path d="M17.2 31.0C19.6 32.2 27.1 35.7 32.0 38.0C36.9 40.3 43.3 42.7 46.8 45.0C50.3 47.3 52.0 50.8 53.0 52.0" />
      <path d="M17.2 87.0C19.6 88.2 27.1 91.7 32.0 94.0C36.9 96.3 43.3 98.7 46.8 101.0C50.3 103.3 52.0 106.8 53.0 108.0" />
    </g>
  </svg>
);

export default DnaMark;
