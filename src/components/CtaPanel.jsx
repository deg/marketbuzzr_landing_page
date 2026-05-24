import React from "react";
import DemoButton from "./DemoButton";

const CtaPanel = ({ heading, paragraphs = [], ctaLabel = "Book a Demo" }) => (
  <div className="cta-panel">
    <h3>{heading}</h3>
    {paragraphs.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
    <p>
      <DemoButton label={ctaLabel} className="primary" />
    </p>
  </div>
);

export default CtaPanel;
