import React from "react";

// The brand's signature motif: a single trace that is dense, erratic "noise"
// (random static) on the left and resolves into a clean periodic "signal" sine
// on the right — visualizing MarketBuzzr turning market noise into clear
// intelligence. The path is generated (not hand-drawn) so the static reads as
// genuinely random rather than a tidy zigzag; computed once at module load so
// it's stable across route changes. Draws itself left-to-right on mount
// (pathLength="1" makes the dash math exact). Decorative → aria-hidden.
const buildPoints = () => {
  const WIDTH = 1200;
  const MID = 40;
  const STEP = 5;
  const pts = [];
  for (let x = 0; x <= WIDTH; x += STEP) {
    const t = x / WIDTH;
    const noiseEnv = Math.max(0, 1 - t * 1.8); // chaos fades out by ~55% across
    const signalEnv = Math.min(1, Math.max(0, (t - 0.32) / 0.5)); // sine ramps in
    const noise = (Math.random() - 0.5) * 2 * 28 * noiseEnv;
    const signal = Math.sin(x / 36) * 16 * signalEnv;
    const y = MID + noise + signal;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
};

const POINTS = buildPoints();

const SignalLine = () => (
  <svg
    className="signal-line"
    viewBox="0 0 1200 80"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="signal-grad" x1="0" y1="0" x2="1" y2="0">
        <stop className="signal-stop-0" offset="0%" />
        <stop className="signal-stop-1" offset="55%" />
        <stop className="signal-stop-2" offset="100%" />
      </linearGradient>
    </defs>
    <polyline
      className="signal-line-path"
      pathLength="1"
      fill="none"
      stroke="url(#signal-grad)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      points={POINTS}
    />
  </svg>
);

export default SignalLine;
