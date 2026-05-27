import React from "react";

// A tile-sized echo of the hero motif for cards: a tiny "buzz" that settles
// into a clean signal. Decorative → aria-hidden; stroke comes from CSS.
const SignalMark = () => (
  <svg className="signal-mark" viewBox="0 0 40 24" aria-hidden="true">
    <polyline
      points="1,12 7,12 11,6 15,18 19,9 23,15 27,11 33,12 40,12"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default SignalMark;
