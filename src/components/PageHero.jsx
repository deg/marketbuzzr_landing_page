import React from "react";
import DemoButton from "./DemoButton";

const PageHero = ({ kicker, title, sub = [], ctaLabel, className = "" }) => (
  <header className={["hero container", className].filter(Boolean).join(" ")}>
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
