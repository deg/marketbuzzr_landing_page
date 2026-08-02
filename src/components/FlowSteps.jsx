import React from "react";

// The five stages from market signal to finished draft, replacing the diagram
// that used to be a flat PNG. Steps and the arrows between them are siblings in
// one grid, so the arrows take part in the layout instead of being positioned
// into the gaps — the same shape as BrandDivider.
//
// The arrows are decorative punctuation between list items, so they are hidden
// from assistive technology; an ordered list already conveys the sequence.
// Each step is `{ verb, label }` — the revised brief gives every stage a verb
// (MONITOR, FILTER, …) as well as the line describing it, so a step cannot be a
// bare string and cannot key on one either.
const FlowSteps = ({ steps }) => (
  <ol className="flow-steps">
    {steps.map((step, i) => (
      <React.Fragment key={step.verb}>
        {i > 0 && (
          <li className="flow-arrow" aria-hidden="true">
            →
          </li>
        )}
        <li className="flow-step">
          <span className="flow-step-number">{i + 1}</span>
          <span className="flow-step-verb">{step.verb}</span>
          <span className="flow-step-label">{step.label}</span>
        </li>
      </React.Fragment>
    ))}
  </ol>
);

export default FlowSteps;
