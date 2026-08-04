import React from "react";
import CategoryIcon from "./CategoryIcon";

// The external sources forming a conversation around one thing, with that thing
// at the centre. Built to be reusable: How It Works step 01 makes this same
// point about the same source types with a PNG, and is the next candidate.
//
// NOT a port of the sketch's version, which absolutely-positioned seven boxes at
// hardcoded percentage offsets and already overlapped in its own rendering — two
// cards collided at 1440px with one clipped mid-word, and two more truncated by
// 1000px.
//
// The chips are grid items, so they cannot collide at any width. The centre cell
// is held open by an empty spacer item and the core is laid over it; that is the
// one thing here that is positioned rather than placed, and it is safe because
// the cell beneath it is guaranteed empty. Keeping the core outside the <ul> is
// what lets the seven sources stay one uninterrupted list for a screen reader —
// the spacer is aria-hidden so the list still counts seven.
// The spacer must be the FIFTH grid child, because a 3-column grid puts child 5
// in row 2, column 2 — the cell the core is laid over. That is a property of the
// grid, not of how many sources there are, so it is pinned rather than derived;
// deriving it from the list length only lands on the centre for 7 or 8 items.
const HOLE_AT = 4;

// ...and the overlay only works while the ring is exactly three rows, because
// the core is centred on the ring rather than on the cell. Measured: 6, 7 and 8
// sources put the core cleanly on the hole; 9 makes a fourth row, the geometric
// centre falls between rows 2 and 3, and the core lands on a real chip.
//
// Outside that range the core is rendered above the chips instead — the same
// treatment narrow screens get. A component whose whole point is reuse by the
// next industry should not depend on that industry sending exactly 6-8 sources.
const RING_MIN = 6;
const RING_MAX = 8;

const SourceCluster = ({ centre, caption, items }) => {
  const isRing = items.length >= RING_MIN && items.length <= RING_MAX;

  return (
    <figure className="source-cluster">
      <div className={`source-cluster-ring${isRing ? " is-ring" : ""}`}>
        <ul className="source-cluster-chips">
          {items.slice(0, HOLE_AT).map((item) => (
            <li className="source-chip" key={item.label}>
              <CategoryIcon name={item.icon} />
              <span>{item.label}</span>
            </li>
          ))}
          {/* No hole when the core is not overlaid — it would just be a gap. */}
          {isRing && <li className="source-cluster-hole" aria-hidden="true" />}
          {items.slice(HOLE_AT).map((item) => (
            <li className="source-chip" key={item.label}>
              <CategoryIcon name={item.icon} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <div className="source-cluster-core" aria-hidden="true">
          <CategoryIcon name="molecule" />
          <span>{centre}</span>
        </div>
      </div>
      {caption && (
        <figcaption className="source-cluster-caption">{caption}</figcaption>
      )}
    </figure>
  );
};

export default SourceCluster;
