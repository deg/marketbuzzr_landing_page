import React from "react";
import DemoButton from "./DemoButton";
import SignalLine from "./SignalLine";

// Shared page hero, in two layouts.
//
// CENTRED (the default, and what home, how-it-works and the tech use-case page
// use): everything stacked and centred, with an optional large visual below the
// copy passed as `children`.
//
// SPLIT (`aside`): copy left-aligned in its own column with the visual beside
// it, which is what Manu's industry-page design does. That is not decoration.
// Measured on the centred version of the biotech page, the hero ran 960px tall
// and its visual began 669px down, so on a laptop the thing carrying the whole
// idea sat below the fold; his split fits both in about 530px.
//
// The two layouts are one component rather than two because everything above
// the layout -- kicker, heading, sub-paragraphs, CTAs -- is identical, and the
// centred pages must not drift when the split one changes.
const PageHero = ({
  kicker,
  title,
  sub = [],
  emphasis,
  ctaLabel,
  secondaryCtaLabel,
  className = "",
  aside,
  children,
}) => {
  const copy = (
    <>
      {kicker && <span className="kicker">{kicker}</span>}
      <h1>{title}</h1>
      {sub.map((line, i) => (
        <p className="sub" key={i}>
          {line}
        </p>
      ))}
      {emphasis && <p className="hero-emphasis">{emphasis}</p>}
      {(ctaLabel || secondaryCtaLabel) && (
        <div className="cta-actions">
          {ctaLabel && <DemoButton label={ctaLabel} className="cta" />}
          {secondaryCtaLabel && (
            <DemoButton label={secondaryCtaLabel} className="cta-secondary" />
          )}
        </div>
      )}
      <SignalLine />
    </>
  );

  return (
    <header
      className={["hero container", aside && "hero-split container-wide", className]
        .filter(Boolean)
        .join(" ")}
    >
      {aside ? <div className="hero-copy">{copy}</div> : copy}
      {aside && <div className="hero-aside">{aside}</div>}
      {children}
    </header>
  );
};

export default PageHero;
