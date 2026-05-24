import React from "react";
import SectionTitle from "./SectionTitle";

// Renders a "Turn Market Buzz into Signals" section. Items are questions, each
// with an optional answer (the biotech page pairs Q+A; home/tech are bare Qs).
const ProblemList = ({ title, intro, items }) => (
  <section className="section container">
    <SectionTitle title={title} lead={intro} />
    <div className="grid">
      {items.map((item, i) => (
        <div className="card problem-card" key={i}>
          <h3>{item.question}</h3>
          {item.answer && <p>{item.answer}</p>}
        </div>
      ))}
    </div>
  </section>
);

export default ProblemList;
