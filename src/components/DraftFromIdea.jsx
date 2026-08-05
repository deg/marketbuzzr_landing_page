import React from "react";
import CategoryIcon from "./CategoryIcon";
import { useCycle } from "../hooks/useCycle";

// How It Works step 03, from Manu's drop_06 handoff —
// assets/03-turn-intelligence-into-action-animation.html in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/). It replaces
// turn-into-action.avif/webp, 127 KB of raster showing the old
// insight → choose → finished-draft flow his brief now rules out by name.
//
// Same shape as RoleDashboard — his file is HTML, so this is a panel and an
// index rather than a transcription. Read that component's header for the
// conventions; they apply here unchanged. What is specific to this one:
//
//   NOTHING IS INTERACTIVE, AND THE ORIGINAL TRIED HARDER TO LOOK LIKE IT WAS.
//   His file ships a real <button>, five options styled as radios, and a close
//   control, none of which do anything. All of it renders as plain elements: no
//   <button>, no role="radio", no tabindex, nothing reachable by keyboard. The
//   industry pages' InsightCard settled this — a real button that does nothing
//   is worse than a label that never claimed to be one. The close control is
//   dropped outright rather than drawn as a dead "×", since it is chrome that
//   only makes sense on something that can be closed.
//
//   NO "ILLUSTRATIVE EXAMPLE" NOTE, unlike InsightCard. That note exists there
//   because the card invents a news story about real, named companies. This
//   depicts the product's own interface, so there is nothing to disclaim.
//
// The selection order is his and is deliberately not the order the options are
// listed in: Action Plan, Talk Track, Board Talking Points, Outreach Email,
// Executive Summary. It lives in content/howItWorks.js beside the options.

const INTERVAL_MS = 2400;

const DraftFromIdea = ({ title, label, ctaTemplate, footer, options, cycle }) => {
  const [step, pauseProps] = useCycle(cycle.length, INTERVAL_MS);
  const selected = cycle[step];
  const format = options[selected];

  return (
    <figure className="draft-idea" {...pauseProps}>
      {/* Every format is listed in the markup and only the highlight moves, so
          this needs no equivalent of RoleDashboard's summary line — a reader
          who cannot see the highlight still meets all five. */}
      <div className="draft-idea-panel">
        <p className="draft-idea-title">{title}</p>

        <div className="draft-idea-body">
          <p className="draft-idea-label">{label}</p>

          <ul className="draft-idea-options">
            {options.map((option, i) => (
              <li
                className={`draft-idea-option${i === selected ? " is-selected" : ""}`}
                key={option.name}
              >
                <span className="draft-idea-icon">
                  <CategoryIcon name={option.icon} />
                </span>
                <span className="draft-idea-copy">
                  <strong>{option.name}</strong>
                  <span>{option.blurb}</span>
                </span>
                {/* The dot his file draws as a radio. aria-hidden because it
                    is the picture of a control, not a control. */}
                <span className="draft-idea-mark" aria-hidden="true" />
              </li>
            ))}
          </ul>

          {/* A <p>, not a <button>. It changes with the selection above it, so
              it is keyed on the format to re-run the nudge his file animates. */}
          <p className="draft-idea-cta" key={format.name}>
            {ctaTemplate.replace("{format}", format.name)}
          </p>

          <p className="draft-idea-footer">{footer}</p>
        </div>
      </div>
    </figure>
  );
};

export default DraftFromIdea;
