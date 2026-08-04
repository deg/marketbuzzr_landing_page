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
// `label` names it for assistive technology. A visible "an illustrative example,
// not a real signal" line used to print under the card as well; it was invented
// here rather than taken from the sketch, and has been removed along with the
// other copy that was not Manu's. Whether a fabricated example needs a visible
// marker is a real question, but it is his to answer -- see mbz-et8e.12.
const InsightCard = ({
  label,
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
      <div className="insight-block insight-block-actions">
        <h4>{actions.heading}</h4>
        <ul className="insight-actions">
          {actions.items.map((item, i) => (
            <li key={i}>{item}</li>
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

    {/* Styled as the sketch draws them, but still NOT buttons: on a marketing
        page they would be dead controls, and a real button that does nothing is
        worse than a label that never claimed to be one. */}
    <div className="insight-strip">
      <h4>{drafts.heading}</h4>
      <ul className="insight-drafts">
        {/* Keyed by index, not by text: MedTech's list contains the same
            label twice, which is legal content and a duplicate React key. */}
        {drafts.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

  </article>
);

export default InsightCard;
