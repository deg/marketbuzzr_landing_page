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
// TWO COLUMNS WITH THE MARK IN THE GUTTER, not a ring around a reserved cell.
// The ring came first and was replaced when the hero became a split: three
// columns need 836px for the widest label to stay on one line, and the hero's
// right-hand column is about 784px. Two columns give each chip ~390px, so
// nothing wraps — and it is closer to the sketch, where the helix sits between
// the cards rather than inside the grid.
//
// It is also markedly simpler. The ring needed an empty spacer holding its
// centre cell open, a pinned index for that spacer, and a 6-to-8 bound on the
// source count outside which the geometry silently broke. The gutter needs none
// of that and works for any number of sources.
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
