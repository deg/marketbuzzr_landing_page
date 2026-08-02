import React from "react";
import DemoButton from "./DemoButton";

// `as` sets the heading level. It defaults to h3, which is right when the panel
// closes a section that already has its own h2. The homepage's final CTA is a
// section in its own right, so it passes "h2" to keep the outline correct.
const CtaPanel = ({
  heading,
  paragraphs = [],
  ctaLabel = "Book a Demo",
  as: Heading = "h3",
}) => (
  <div className="cta-panel">
    <Heading>{heading}</Heading>
    {paragraphs.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
    <p>
      <DemoButton label={ctaLabel} className="primary" />
    </p>
  </div>
);

export default CtaPanel;
