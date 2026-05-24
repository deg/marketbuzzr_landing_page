import React from "react";
import { howItWorks } from "../content/howItWorks";
import PageHero from "../components/PageHero";
import DemoButton from "../components/DemoButton";

const HowItWorks = () => (
  <>
    <PageHero {...howItWorks.hero} />

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

    <section className="section container">
      <div className="summary-block">
        <h2>{howItWorks.closing.heading}</h2>
        {howItWorks.closing.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <ul className="value-bullets">
          {howItWorks.closing.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <p className="summary-footnote">{howItWorks.closing.footnote}</p>
        <DemoButton label={howItWorks.closing.ctaLabel} className="primary" />
      </div>
    </section>
  </>
);

export default HowItWorks;
