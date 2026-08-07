import React from "react";
import DemoButton from "./DemoButton";

// `as` sets the heading level. It defaults to h3, which is right when the panel
// closes a section that already has its own h2. The homepage's final CTA is a
// section in its own right, so it passes "h2" to keep the outline correct.
//
// The panel always shows the pair. A single-button branch used to sit here
// behind a `.primary` class of its own, but every caller passes both and the
// August handover fixes the pairing for the whole site, so it was unreachable
// (mbz-et8e.52.20). Both labels default to the handover's wording rather than
// being left undefined, so a caller that omits one gets his label instead of a
// second button reading "Try for Free".
const CtaPanel = ({
  heading,
  paragraphs = [],
  ctaLabel = "Try for Free",
  secondaryCtaLabel = "Book a Demo",
  as: Heading = "h3",
}) => (
  <div className="cta-panel">
    <Heading>{heading}</Heading>
    {paragraphs.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
    {/* The same matched buttons as the hero. */}
    <div className="cta-actions">
      <DemoButton label={ctaLabel} className="cta" source="try-free" />
      <DemoButton
        label={secondaryCtaLabel}
        className="cta-secondary"
        source="book-demo"
      />
    </div>
  </div>
);

export default CtaPanel;
