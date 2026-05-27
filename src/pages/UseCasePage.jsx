import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import Card from "../components/Card";
import ProblemList from "../components/ProblemList";
import CtaPanel from "../components/CtaPanel";
import SignalDivider from "../components/SignalDivider";

// Renders a Use Case (Biotech or Tech) from its content module — same shape,
// different copy. Routed at /use-cases/:slug via App.
const UseCasePage = ({ data }) => {
  useDocumentTitle(data.title);
  return (
    <>
      <PageHero {...data.hero} />

      {data.intro.map((block, i) => (
        <section className="section container info-block" key={i}>
          <h2>{block.heading}</h2>
          {block.paragraphs.map((p, j) => (
            <p className="lead" key={j}>
              {p}
            </p>
          ))}
        </section>
      ))}

      <section className="section container">
        <div className="grid">
          {data.cards.items.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      </section>

      <SignalDivider />

      <ProblemList {...data.problems} />

      <SignalDivider />

      <section className="section container">
        <CtaPanel {...data.closing} />
      </section>
    </>
  );
};

export default UseCasePage;
