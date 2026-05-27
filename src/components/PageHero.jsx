import React from "react";
import DemoButton from "./DemoButton";
import SignalLine from "./SignalLine";

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
    <SignalLine />
  </header>
);

export default PageHero;
