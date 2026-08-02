import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// Stands in for any route that does not exist yet. Reached via the catch-all,
// so linking to a path is all it takes to get a sensible placeholder — there is
// no route table to keep in step with the nav and the industry tiles.
//
// This replaced a catch-all that silently redirected to the homepage, which
// meant a typo or a stale link left the visitor where they started with no
// explanation and nothing to act on.
//
// DELIBERATELY UGLY. This is a dev/design-cycle affordance and must not reach
// marketbuzzr.com — see mbz-et8e.18. If you are reading this because it did
// ship, that gate was missed.

// "/industries/medical-technology" -> "Medical Technology"
const titleFromPath = (pathname) => {
  const slug = pathname.split("/").filter(Boolean).pop();
  if (!slug) return "This page";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const NotImplemented = () => {
  const { pathname } = useLocation();
  const title = titleFromPath(pathname);

  // Marked in the tab and in history too, so a placeholder is never mistaken
  // for a real page when several are open.
  useDocumentTitle(`[NYI] ${title} — MarketBuzzr`);

  return (
    <section className="section container">
      <div className="nyi">
        <span className="nyi-tag">Not yet implemented</span>
        <h1 className="nyi-title">{title}</h1>
        <p className="nyi-body">
          This page does not exist yet. It is linked so the navigation can be
          reviewed during the redesign.
        </p>
        {/* The path matters when the cause is a bad link rather than an
            unbuilt page — it is the only clue to which of the two it is. */}
        <p className="nyi-path">{pathname}</p>
        <p>
          <Link className="text-link" to="/">
            ← Back to the homepage
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotImplemented;
