import React from "react";

// Six things MarketBuzzr learns about you, narrowing through it into the one
// thing that reaches you. Built as a vertical funnel on purpose: the Problem
// section is already a two-column split, and a radial cluster there against a
// directional funnel here keeps the two from reading as the same layout twice.
//
// Decorative — the paragraph beside it already names all six inputs, so
// announcing them again would just repeat the copy.
const PersonalizationDiagram = ({ inputs, engine, output }) => (
  <div className="pd" aria-hidden="true">
    <ul className="pd-inputs">
      {inputs.map((input) => (
        <li className="pd-input" key={input}>
          {input}
        </li>
      ))}
    </ul>
    <div className="pd-funnel" />
    <div className="pd-engine">{engine}</div>
    <div className="pd-arrow">↓</div>
    <div className="pd-output">{output}</div>
  </div>
);

export default PersonalizationDiagram;
