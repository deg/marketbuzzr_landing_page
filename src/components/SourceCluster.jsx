import React from "react";
import CategoryIcon from "./CategoryIcon";
import HeroMark from "./HeroMark";

// The external sources forming a conversation around one thing, with that thing
// at the centre. Built to be reusable: How It Works step 01 makes the same point
// about the same source types with a PNG, and is the next candidate.
//
// SCATTERED AROUND THE BOX, not laid out in rows and not on an ellipse. Rows
// read as a list that happens to have a picture in it; the sketch has the chips
// drifting around the mark and partly over it.
//
// THE ELLIPSE WAS THE WRONG GENERATOR and this is worth knowing before anyone
// "simplifies" it back. The hero's right-hand column is about 517px wide and the
// chips are up to 239px, so two of them side by side already fill it. An ellipse
// inscribed in a tall narrow box wastes its corners, which is exactly where the
// room is: measured across all three industries, the best ellipse achievable put
// chips 0px apart at the setting we shipped and 16px apart at its theoretical
// best, and only became a genuine ring at all if the column were ~720px wide.
// Walking the box PERIMETER instead uses the corners and measures 42px.
//
// Positions are emitted as 0..1 fractions of an inset rectangle and resolved in
// CSS, so the component never needs to know a chip's rendered width. The inset
// is half the widest chip horizontally and half its height vertically, which is
// what keeps every chip inside the box.
//
// WALK_ASPECT must match the box the CSS actually produces, because the spacing
// of points along a perimeter depends on its proportions. It is the usable
// height over the usable width at the desktop size — see --ring-inset-x/y and
// min-height in the stylesheet. If either changes, re-derive this.
const WALK_ASPECT = 582 / 277;

// Where on the perimeter the first chip sits. Chosen by the same search: it
// decides which chips land on corners, and corners are where the room is.
const PHASE = 0.65;

// Walks the perimeter of a 1 x WALK_ASPECT rectangle and returns 0..1 fractions.
const perimeterPoints = (n) => {
  const w = 1;
  const h = WALK_ASPECT;
  const per = 2 * (w + h);
  return Array.from({ length: n }, (_, i) => {
    let t = (((i / n + PHASE) % 1) + 1) % 1;
    t *= per;
    if (t < w) return [t / w, 0];
    if (t < w + h) return [1, (t - w) / h];
    if (t < 2 * w + h) return [(w - (t - w - h)) / w, 1];
    return [0, (h - (t - 2 * w - h)) / h];
  });
};

const SourceCluster = ({ items, mark }) => {
  const points = perimeterPoints(items.length);

  return (
  <figure className="source-cluster">
    <div className="source-cluster-ring">
      <ul className="source-cluster-chips">
        {items.map((item, i) => {
          const [px, py] = points[i];
          return (
            <li
              className="source-chip"
              key={item.label}
              // Fractions of the inset rectangle, resolved in CSS so the pixel
              // size of the arrangement stays a styling concern.
              style={{ "--px": px.toFixed(4), "--py": py.toFixed(4) }}
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
        <HeroMark name={mark} />
      </div>
    </div>
  </figure>
  );
};

export default SourceCluster;
