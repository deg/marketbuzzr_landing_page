import React from "react";
import DemoButton from "./DemoButton";

const PageHero = ({ kicker, title, sub = [], ctaLabel }) => (
  <header className="hero container">
    {kicker && <span className="kicker">{kicker}</span>}
    <h1>{title}</h1>
    {sub.map((line, i) => (
      <p className="sub" key={i}>
        {line}
      </p>
    ))}
    {ctaLabel && <DemoButton label={ctaLabel} className="cta" />}
  </header>
);

export default PageHero;
