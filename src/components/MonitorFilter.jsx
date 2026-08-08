import React from "react";
import CategoryIcon from "./CategoryIcon";

// How It Works step 01, and the last raster on this site to become text.
//
// WHY IT IS NOT A PICTURE ANY MORE. drop_07 §4.2 puts all three steps in one
// visual column of the same width, and his own step 02 and 03 assets set that
// width at 640px. `monitor-filter.avif` is 1774px wide: measured on his source
// PNG, its smallest type is 8-9px of cap height, which renders about 3.2px at
// 640 — roughly a 4.6px font, against about 10px at the 1400px it used to get.
// §4.3 says to keep the visual and not to redesign its content "unless needed
// for responsive fit", and this is that case.
//
// SAME THREE STAGES, SAME LABELS, STACKED INSTEAD OF SIDE BY SIDE. His artwork
// reads left to right: a cloud of five source types, a YOUR CONTEXT panel that
// filters them, three developments that come out. A narrow column has height
// rather than width, so the three run down it instead of across. Nothing is
// added, removed or renamed — the copy is in content/howItWorks.js and every
// label there is his.
//
// The two connectors are decorative punctuation between stages, so they are
// hidden from assistive technology; the three stages are already an ordered
// story in the reading order, and the arrows would be read as "down arrow" if
// they were not. Same call FlowSteps made for the same reason.
//
// WHAT THE REBUILD RETIRES. The AVIF and WebP pair, and with them .how-visual's
// standalone box-shadow — that rule existed only because this one artwork was
// drawn on white against the navy page, so a bleed sized for the dark artwork
// would have been invisible around it. It was the site's last special case for
// a light raster on a dark ground.
const MonitorFilter = ({ sourcesLabel, sources, context, outputs }) => (
  <figure className="monitor-filter">
    <div className="monitor-stage monitor-sources">
      <p className="monitor-stage-label">{sourcesLabel}</p>
      <ul className="monitor-chips">
        {sources.map((item) => (
          <li className="monitor-chip" key={item.label}>
            <CategoryIcon name={item.icon} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>

    <p className="monitor-arrow" aria-hidden="true" />

    {/* The filter, and the one light surface in the figure — his panel is a pale
        sheet the sources pass through, and it is what makes the middle stage
        read as a mechanism rather than a third list. */}
    <div className="monitor-stage monitor-context">
      <span className="monitor-context-mark" aria-hidden="true">
        <CategoryIcon name="funnel" />
      </span>
      <p className="monitor-context-title">{context.title}</p>
      <ul className="monitor-context-items">
        {context.items.map((item) => (
          <li key={item.label}>
            <CategoryIcon name={item.icon} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>

    <p className="monitor-arrow" aria-hidden="true" />

    <div className="monitor-stage monitor-outputs">
      <ul>
        {outputs.map((item) => (
          <li className="monitor-output" key={item.label}>
            <span className="monitor-output-mark">
              <CategoryIcon name={item.icon} />
            </span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </figure>
);

export default MonitorFilter;
