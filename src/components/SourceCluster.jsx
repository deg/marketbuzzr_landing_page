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
// A GOLDEN-ANGLE SWEEP is what this does now, and the reason is a constraint
// that turns out not to bind. The chips step evenly down a 460px box, so
// consecutive ones are ~70px apart while being 38px tall — no two chips can
// overlap VERTICALLY at all, which means their horizontal position is free.
// Three earlier generators were all solving a collision problem that the
// vertical spacing had already solved:
//
//   ellipse         16px between the closest pair at best, and only a ring at
//                   all above a ~720px column
//   perimeter walk  43px, but needed a 620px box and left the hero stretched
//   alternating     good clearance, but pinned five of seven chips to the left
//                   or right edge and read as two columns
//
// Stepping x by the golden angle gives seven distinct positions across the full
// width with only two landing near an edge, which is what makes it read as
// scattered. Clearance drops to ~31px, and that is the trade: it is whitespace
// between chips rather than the risk of a collision, because a collision is not
// geometrically possible here.
//
// Positions are emitted as 0..1 fractions of an inset rectangle and resolved in
// CSS, so the component never needs a chip's rendered width. The inset is the
// widest chip horizontally and its height vertically, which is what keeps every
// chip inside the box.
//
// 2.39996 radians is the golden angle. Any irrational step would do; this one
// spreads a small number of points about as evenly as a sequence can.
const GOLDEN_ANGLE = 2.39996;

const scatterPoints = (n) => {
  const xs = Array.from(
    { length: n },
    (_, i) => 0.5 + 0.5 * Math.sin(GOLDEN_ANGLE * i)
  );

  // One hand-made adjustment on top of the sequence: the third- and
  // second-to-last swap places. The golden angle spreads points evenly over the
  // whole run, but it knows nothing about how a run of seven reads as a
  // composition, and it left the lower half leaning left. Swapping these two
  // balances the bottom without disturbing anything above them.
  if (n >= 3) {
    const a = n - 3;
    const b = n - 2;
    [xs[a], xs[b]] = [xs[b], xs[a]];
  }

  return xs.map((x, i) => [x, n > 1 ? i / (n - 1) : 0.5]);
};

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
