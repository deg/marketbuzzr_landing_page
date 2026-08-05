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
// copy (`blurb`) and drops the featured treatment, because drop_06 asks for
// "all six industries as equal navigation boxes" there. Both are the same tile
// with the same hover, which is what that brief asks for — it forbids a
// separate visual style for its cards.
const IndustryTile = ({ name, to, featured, blurb }) => (
  <Link
    className={featured ? "industry-tile is-featured" : "industry-tile"}
    to={to}
  >
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
