import React from "react";
import DemoButton from "./DemoButton";

// `as` sets the heading level. It defaults to h3, which is right when the panel
// closes a section that already has its own h2. The homepage's final CTA is a
// section in its own right, so it passes "h2" to keep the outline correct.
const CtaPanel = ({
  heading,
  paragraphs = [],
  ctaLabel = "Try for Free",
  secondaryCtaLabel,
  as: Heading = "h3",
}) => (
  <div className="cta-panel">
    <Heading>{heading}</Heading>
    {paragraphs.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
    {secondaryCtaLabel ? (
      // A pair uses the same matched buttons as the hero. The single-button
      // path below is left as it was, so the closing panels on the use-case and
      // how-it-works pages are unaffected.
      <div className="cta-actions">
        <DemoButton label={ctaLabel} className="cta" />
        <DemoButton label={secondaryCtaLabel} className="cta-secondary" />
      </div>
    ) : (
      <p>
        <DemoButton label={ctaLabel} className="primary" />
      </p>
    )}
  </div>
);

export default CtaPanel;
