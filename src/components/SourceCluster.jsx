import React from "react";
import CategoryIcon from "./CategoryIcon";
import DnaMark from "./DnaMark";

// The external sources forming a conversation around one thing, with that thing
// at the centre. Built to be reusable: How It Works step 01 makes the same point
// about the same source types with a PNG, and is the next candidate.
//
// SCATTERED ON AN ELLIPSE, not laid out in rows. Rows read as a list that
// happens to have a picture in it; the sketch has the chips drifting around the
// helix and partly over it, which is what makes it read as conversations
// forming around a subject.
//
// Every chip's CENTRE sits at the same angular step around a common ellipse, so
// the arrangement is computed from the item count rather than hand-placed. Seven
// sources or nine, it stays even — which matters, because reuse by the next
// industry is the point of this component.
//
// The ellipse is wider than it is tall (see --ring-rx / --ring-ry in the CSS)
// because chips are wide and short: on a circle the left and right chips would
// collide long before the top and bottom ones did.
//
// The angle starts at -100deg rather than -90 so no chip sits dead centre above
// the mark, which looked like a heading for it.
const START_ANGLE = -100;

const SourceCluster = ({ items }) => (
  <figure className="source-cluster">
    <div className="source-cluster-ring">
      <ul className="source-cluster-chips">
        {items.map((item, i) => {
          const angle = START_ANGLE + (360 / items.length) * i;
          const rad = (angle * Math.PI) / 180;
          return (
            <li
              className="source-chip"
              key={item.label}
              // Fractions of the ellipse radii, resolved in CSS so the pixel
              // size of the arrangement stays a styling concern.
              style={{ "--cos": Math.cos(rad).toFixed(4), "--sin": Math.sin(rad).toFixed(4) }}
            >
              <CategoryIcon name={item.icon} />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
      {/* Unlabelled, matching the sketch. An earlier version captioned this
          "Your molecule", which was invented here and read as jargon floating in
          the middle of a diagram. Decorative, hence aria-hidden. */}
      <div className="source-cluster-core" aria-hidden="true">
        <DnaMark />
      </div>
    </div>
  </figure>
);

export default SourceCluster;
