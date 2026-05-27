import React from "react";
import DemoButton from "./DemoButton";
import { withBreaks } from "./withBreaks";

const CtaPanel = ({ heading, paragraphs = [], ctaLabel = "Book a Demo" }) => (
  <div className="cta-panel">
    <h3>{withBreaks(heading)}</h3>
    {paragraphs.map((p, i) => (
      <p key={i}>{withBreaks(p)}</p>
    ))}
    <p>
      <DemoButton label={ctaLabel} className="primary" />
    </p>
  </div>
);

export default CtaPanel;
