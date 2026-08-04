import React from "react";
import CategoryIcon from "./CategoryIcon";
import DnaMark from "./DnaMark";

// The external sources forming a conversation around one thing, with that thing
// between them. Built to be reusable: How It Works step 01 makes the same point
// about the same source types with a PNG, and is the next candidate.
//
// NOT a port of the sketch's version, which absolutely-positioned seven boxes at
// hardcoded percentage offsets and already overlapped in its own rendering — two
// cards collided at 1440px with one clipped mid-word, and two more truncated by
// 1000px. The chips here are grid items and cannot collide at any width.
//
// A RING: three columns with the mark in the middle cell, so the sources read as
// surrounding the subject. A two-column version with the mark in the gutter was
// tried and rejected — it reads as two lists either side of a divider, which
// loses the entire point of the arrangement.
//
// The mark is a real grid item placed at row 2 / column 2, and the chips
// auto-place around it. That is what makes this version robust where the first
// ring was not: explicitly-placed items are positioned before auto-placed ones,
// so the chips simply skip the occupied cell. No empty spacer holding the middle
// open, no pinned index for it, and no bound on how many sources there can be.
//
// The <ul> takes `display: contents` so its items become grid items of the ring
// while the list itself survives for assistive technology. That is the only way
// to have both one grid and one list; browsers dropped list semantics under
// display:contents years ago and no longer do.
const SourceCluster = ({ caption, items }) => (
  <figure className="source-cluster">
    <div className="source-cluster-ring">
      <ul className="source-cluster-chips">
        {items.map((item) => (
          <li className="source-chip" key={item.label}>
            <CategoryIcon name={item.icon} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      {/* No label, matching the sketch. An earlier version captioned this "Your
          molecule", which was invented here and read as jargon floating in the
          middle of a diagram — the sub-headline and the caption below both
          already say "your therapy". Decorative, hence aria-hidden: the caption
          carries the meaning for assistive technology. */}
      <div className="source-cluster-core" aria-hidden="true">
        <DnaMark />
      </div>
    </div>
    {caption && (
      <figcaption className="source-cluster-caption">{caption}</figcaption>
    )}
  </figure>
);

export default SourceCluster;
