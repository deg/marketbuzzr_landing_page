import React from "react";
import CategoryIcon from "./CategoryIcon";

// A worked example of what the product produces: one signal, what it means, what
// to do about it, where it came from, and what can be drafted from it.
//
// This is the block that makes the native-HTML approach worth trying — the
// homepage says the same thing with a 72 KB PNG whose text is invisible to
// search engines, unreadable on a phone without a horizontal scroller, and
// impossible to correct without asking Manu to re-render (mbz-et8e.12,
// mbz-et8e.28 items 1-2). Every string here is editable in a content module.
//
// It is ILLUSTRATIVE and says so twice: `label` names it for assistive
// technology, and `disclaimer` prints under the card so no sighted reader is
// invited to mistake the example for a live signal or a real clinical finding.
// Do not drop either to make the card look more like a screenshot.
const InsightCard = ({
  label,
  disclaimer,
  tag,
  detected,
  impact,
  headline,
  summary,
  actions,
  implication,
  sources,
  drafts,
}) => (
  <article className="insight-card" aria-label={label}>
    <header className="insight-card-top">
      <div className="insight-card-marks">
        <span className="insight-tag">{tag}</span>
        <span className="insight-detected">{detected}</span>
      </div>
      <span className="insight-impact">{impact}</span>
    </header>

    <h3 className="insight-headline">{headline}</h3>
    <p className="insight-summary">{summary}</p>

    <div className="insight-split">
      <div className="insight-block">
        <h4>{actions.heading}</h4>
        <ul className="insight-actions">
          {actions.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="insight-block">
        <h4>{implication.heading}</h4>
        <p>{implication.text}</p>
      </div>
    </div>

    <div className="insight-strip">
      <h4>
        {sources.heading} <span className="insight-count">({sources.items.length})</span>
      </h4>
      <ul className="insight-sources">
        {sources.items.map((source) => (
          <li key={source.name}>
            <CategoryIcon name={source.icon} />
            <div>
              <strong>{source.name}</strong>
              <span>{source.kind}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Deliberately NOT buttons. They illustrate what the product offers; on a
        marketing page they would be dead controls, and a real button that does
        nothing is worse than a label that never claimed to. */}
    <div className="insight-strip">
      <h4>{drafts.heading}</h4>
      <ul className="insight-drafts">
        {drafts.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>

    <p className="insight-note">{disclaimer}</p>
  </article>
);

export default InsightCard;
