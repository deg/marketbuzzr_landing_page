import React from "react";

// The market as noise resolving into signal: eight competing developments fill
// the cells around a 3x3 grid whose centre is the "Relevant to You" card. Five
// are dimmed and pushed back; the three touching the card are brighter, so the
// composition reads as converging without needing any motion.
//
// The centre card is placed explicitly at row 2 / column 2, which makes CSS
// auto-placement skip that cell and flow the signals around it in array order.
// That is why the order in content/home.js determines which signals end up
// adjacent to the card.
//
// Decorative: the argument is carried by the copy beside it, so the whole thing
// is hidden from assistive technology.
const SignalCloud = ({ signals, relevant }) => (
  <div className="signal-cloud" aria-hidden="true">
    {signals.map((signal) => (
      <span
        className={
          signal.relevant ? "signal-chip is-relevant" : "signal-chip"
        }
        key={signal.label}
      >
        {signal.label}
      </span>
    ))}
    <span className="signal-focus">{relevant}</span>
  </div>
);

export default SignalCloud;
