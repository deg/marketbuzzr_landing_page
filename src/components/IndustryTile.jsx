import React from "react";
import { Link } from "react-router-dom";

// One industry. Every tile links: two reach real use-case pages, the rest reach
// the not-yet-implemented placeholder. Because they all behave the same way,
// none of them has to look non-interactive, and the arrow reveal can be
// consistent across the set.
//
// The accent bar is the "abstract accent" the brief offers as an alternative to
// per-industry iconography — six more icons would have competed with the six
// already carried by the intelligence categories directly above.
const IndustryTile = ({ name, to, featured }) => (
  <Link
    className={featured ? "industry-tile is-featured" : "industry-tile"}
    to={to}
  >
    <span className="industry-accent" aria-hidden="true" />
    <span className="industry-name">{name}</span>
    <span className="industry-arrow" aria-hidden="true">
      →
    </span>
  </Link>
);

export default IndustryTile;
