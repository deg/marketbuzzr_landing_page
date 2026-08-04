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
// TWO GENERATORS HAVE BEEN TRIED AND BOTH FAILED THE SAME TEST, so before
// replacing this one, measure. The hero's right-hand column is about 517px and
// the chips are up to 239px, so two of them side by side already fill it.
//
//   An ELLIPSE wastes the corners of a tall narrow box, which is where the room
//   is. Across all three industries its best was 16px between the closest pair,
//   and it only became a ring rather than a vertical column if the column were
//   ~720px wide.
//
//   A PERIMETER WALK used the corners and reached 43px, but had to be 620px tall
//   to do it, which left the hero looking stretched.
//
// ALTERNATING SIDES is what this does now. Because no two chips share a y, and
// a left chip and a right chip cannot overlap horizontally at this column width,
// the vertical steps can be small: 51px of clearance in 440px, against 43px in
// 620px. Better separation in two-thirds the height.
//
// The sway pulls a few chips off the edge so the arrangement reads as scattered
// rather than as a ladder. Keep it small — at 0.12 the gaps halve, because a
// chip pulled inward starts to sit under its neighbour on the far side.
//
// Positions are emitted as 0..1 fractions of an inset rectangle and resolved in
// CSS, so the component never needs a chip's rendered width. The inset is the
// widest chip horizontally and its height vertically, which is what keeps every
// chip inside the box.
const SWAY = 0.05;

// Alternating left and right, stepping down. Slightly compressed towards the
// ends so the rhythm is not a metronome.
const scatterPoints = (n) =>
  Array.from({ length: n }, (_, i) => {
    const t = n > 1 ? i / (n - 1) : 0.5;
    const sway = i % 3 === 1 ? SWAY : 0;
    const x = i % 2 === 0 ? sway : 1 - sway;
    const y = t + 0.03 * Math.sin(2 * Math.PI * t);
    return [x, Math.min(1, Math.max(0, y))];
  });

const SourceCluster = ({ items, mark }) => {
  const points = scatterPoints(items.length);

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
