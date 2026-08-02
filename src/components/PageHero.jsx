import React from "react";
import DemoButton from "./DemoButton";
import SignalLine from "./SignalLine";

// Shared page hero. Everything after `sub` is optional and currently used only
// by the homepage, whose hero the brief specifies in more detail than the
// use-case and how-it-works ones: a second CTA, an emphasis line, a small
// footnote, and one large product visual below the copy (passed as children).
const PageHero = ({
  kicker,
  title,
  sub = [],
  emphasis,
  ctaLabel,
  secondaryCtaLabel,
  footnote,
  className = "",
  children,
}) => (
  <header className={["hero container", className].filter(Boolean).join(" ")}>
    {kicker && <span className="kicker">{kicker}</span>}
    <h1>{title}</h1>
    {sub.map((line, i) => (
      <p className="sub" key={i}>
        {line}
      </p>
    ))}
    {emphasis && <p className="hero-emphasis">{emphasis}</p>}
    {(ctaLabel || secondaryCtaLabel) && (
      <div className="hero-actions">
        {ctaLabel && <DemoButton label={ctaLabel} className="cta" />}
        {secondaryCtaLabel && (
          <DemoButton label={secondaryCtaLabel} className="cta-secondary" />
        )}
      </div>
    )}
    {footnote && <p className="hero-footnote">{footnote}</p>}
    <SignalLine />
    {children}
  </header>
);

export default PageHero;
