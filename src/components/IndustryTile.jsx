import React from "react";
import { Link } from "react-router-dom";

// One industry. Every tile links: four reach real pages, two reach the
// not-yet-implemented placeholder. Because they all behave the same way, none
// of them has to look non-interactive, and the arrow reveal can be consistent
// across the set.
//
// The accent bar is the "abstract accent" the brief offers as an alternative to
// per-industry iconography — six more icons would have competed with the six
// already carried by the intelligence categories directly above.
//
// TWO PAGES RENDER THIS, and they want different amounts of it. The homepage's
// §6 is a list of names. The /industries entry page gives each one a line of
// copy (`blurb`). Both are the same tile with the same hover, which is what
// every brief since drop_06 has asked for.
//
// NO FEATURED VARIANT. One tile used to take a brighter border to lead the set;
// drop_07 §6.2 rules that out — "do NOT visually highlight the top row or any
// single industry with turquoise" — so the prop, the class and its two rules
// are gone rather than left unused.
const IndustryTile = ({ name, to, blurb }) => (
  <Link className="industry-tile" to={to}>
    <span className="industry-accent" aria-hidden="true" />
    {/* Always present, even with no blurb, so the two pages share one layout
        rather than one flexing differently from the other. */}
    <span className="industry-text">
      <span className="industry-name">{name}</span>
      {blurb && <span className="industry-blurb">{blurb}</span>}
    </span>
    <span className="industry-arrow" aria-hidden="true">
      →
    </span>
  </Link>
);

export default IndustryTile;
