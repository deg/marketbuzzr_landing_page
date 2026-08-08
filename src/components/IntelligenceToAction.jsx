import React from "react";

// What You Get §5.6's visual, from drop_07's
// assets/marketbuzzr-what-you-get-intelligence-to-action-visual-v1.html. Static:
// one development read down four rows, then what you can make from it.
//
// A LIGHT SURFACE ON THE DARK PAGE, like the industry pages' insight card and
// the two How It Works panels, and for the same reason — it depicts product
// output, so keeping it light is what makes it read as a screenshot of the app
// rather than as another section of the marketing site.
//
// THE FOUR ROWS ARE A LIST, not four headings. They are one sequence with a
// label and a line each, which is a description list; using headings would put
// four more entries in the page outline for content that is a figure.
//
// The five outputs are labels, not buttons. Same call as everywhere else on this
// site: a control that does nothing is worse than a mark that never claimed to
// be one.
const IntelligenceToAction = ({ steps, outputs }) => (
  <figure className="ita-card">
    <dl className="ita-steps">
      {steps.map((step) => (
        <div className="ita-step" key={step.label}>
          <dt>{step.label}</dt>
          <dd>{step.text}</dd>
        </div>
      ))}
    </dl>
    <ul className="ita-outputs">
      {outputs.map((output) => (
        <li key={output}>{output}</li>
      ))}
    </ul>
  </figure>
);

export default IntelligenceToAction;
