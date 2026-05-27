import React from "react";
import { howItWorks } from "../content/howItWorks";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import DemoButton from "../components/DemoButton";
import SignalDivider from "../components/SignalDivider";

const HowItWorks = () => {
  useDocumentTitle(howItWorks.title);
  return (
    <>
      <PageHero {...howItWorks.hero} className="hero-wide" />

      <section className="section container">
        <ol className="steps">
          {howItWorks.steps.map((step, i) => (
            <li className="step" key={i}>
              <div className="step-number" aria-hidden="true">
                {i + 1}
              </div>
              <div className="step-body">
                <h3>{step.heading}</h3>
                {step.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <SignalDivider />

      <section className="section container">
        <div className="summary-block">
          <h2>{howItWorks.closing.heading}</h2>
          {howItWorks.closing.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <ul className="value-grid">
            {howItWorks.closing.bullets.map((b, i) => (
              <li className="value-box" key={i}>
                {b}
              </li>
            ))}
          </ul>
          <p className="summary-footnote">{howItWorks.closing.footnote}</p>
          <DemoButton label={howItWorks.closing.ctaLabel} className="primary" />
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
