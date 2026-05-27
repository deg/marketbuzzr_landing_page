import React from "react";

// A short, centered "signal tick": a few calm sine cycles that echo the hero
// motif as deliberate punctuation between sections, rather than a full-width
// decorative line. The ends fade via a CSS mask (see .signal-divider).
// Decorative → aria-hidden.
const buildTick = () => {
  const WIDTH = 240;
  const MID = 20;
  const STEP = 4;
  const pts = [];
  for (let x = 0; x <= WIDTH; x += STEP) {
    const y = MID + Math.sin(x / 13) * 8;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
};

const POINTS = buildTick();

const SignalDivider = () => (
  <svg
    className="signal-divider"
    viewBox="0 0 240 40"
    aria-hidden="true"
  >
    <polyline
      points={POINTS}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default SignalDivider;
