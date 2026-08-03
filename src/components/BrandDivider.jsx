import React from "react";

// The brand line between sections: LESS NOISE. -> MORE SIGNAL. -> BETTER
// DECISIONS. Arrows are drawn between steps rather than written into the copy,
// so screen readers hear three statements instead of stray punctuation.
const BrandDivider = ({ steps }) => (
  <p className="brand-divider">
    {steps.map((step, i) => (
      <React.Fragment key={step}>
        {i > 0 && (
          <span className="brand-divider-arrow" aria-hidden="true">
            →
          </span>
        )}
        <span className="brand-divider-step">{step}</span>
      </React.Fragment>
    ))}
  </p>
);

export default BrandDivider;
