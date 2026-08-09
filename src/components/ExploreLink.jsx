import React from "react";
import { Link } from "react-router-dom";

// The line that closes a homepage section and sends the reader to the page that
// carries the same subject in full. Three sections use one — the five-step flow
// to How It Works, the industry tiles to /industries, and the category cards to
// /what-you-get, which drop_10 added and asked to be "styled like 'Explore all
// industries →'".
//
// A component rather than three copies of the same five lines, because that
// styling instruction is the point: the three have to stay identical, and the
// arrow is a rendering detail rather than part of anyone's copy — no content
// module carries it.
const ExploreLink = ({ label, to }) => (
  <p className="lead">
    <Link className="text-link" to={to}>
      {label} →
    </Link>
  </p>
);

export default ExploreLink;
