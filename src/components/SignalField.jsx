import React from "react";

// What You Get §5.5's visual, from drop_07's
// assets/marketbuzzr-what-you-get-all-signals-visual-v1.html. Static, not
// animated: six kinds of market signal around a single centre.
//
// HIS SIX POSITIONS, KEPT. The chips sit at percentage offsets from the four
// corners of the box rather than on a circle, which is what makes the
// arrangement read as scattered rather than as a dial. Those percentages are his
// .s1 through .s6 and are in the stylesheet, not here, so the component never
// needs to know a chip's rendered size — the same division SourceCluster makes.
//
// ONE DEPARTURE. His file draws the connecting lines with an empty .line class
// that has no instances, so nothing is connected to anything; the rule is
// present and unused. Rather than invent six line angles he did not supply, the
// centre carries a soft radial glow that reaches the chips, which is the
// relationship the lines were presumably for.
//
// The whole figure is one image to assistive technology, described once. Reading
// six loose chips and a centre as separate strings tells a screen reader nothing
// about how they relate, and the relation is the entire content.
const SignalField = ({ centre, centreSub, items, description }) => (
  <figure className="signal-field" role="img" aria-label={description}>
    <div className="signal-field-box" aria-hidden="true">
      {items.map((label, i) => (
        <span className={`signal-field-chip signal-field-chip-${i + 1}`} key={label}>
          {label}
        </span>
      ))}
      <span className="signal-field-centre">
        {centre}
        <span>{centreSub}</span>
      </span>
    </div>
  </figure>
);

export default SignalField;
