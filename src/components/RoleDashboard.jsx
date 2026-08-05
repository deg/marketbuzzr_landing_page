import React, { useEffect, useState } from "react";
import CategoryIcon from "./CategoryIcon";
import { useCycle } from "../hooks/useCycle";

// How It Works step 02, from Manu's drop_06 handoff —
// assets/02-role-based-intelligence-animation.html in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/). It replaces
// role-based-intelligence.avif/webp, 199 KB of raster that made the same point
// with four role panels baked into a picture.
//
// UNLIKE THE HOMEPAGE ANIMATIONS, HIS FILE IS HTML AND CSS RATHER THAN SVG, so
// this is not a transcription. There are no coordinates to preserve, no ids to
// prefix and no SMIL to convert — it is a panel, a timer and an index. Read
// HeroAnimation's header for the SVG conventions and then ignore most of them.
// What does carry across from that work:
//
//   * HIS ICONS ARE EMOJI and ours come from CategoryIcon. Four of the twelve
//     are colour emoji, drawn by the operating system from its own font, so
//     what he saw is Apple's artwork — licensed for Apple devices, and a
//     different picture on Windows and Android. One is worse than the rest:
//     LinkedIn's "in" wordmark, which is a trademark, and drawing a lookalike
//     would be worse than not drawing it. The label says LinkedIn in words.
//
//   * THE PLATE IS GONE. His outer .demo wrapper — padding, a border and a
//     rounded corner around the whole thing — is presentation around the
//     artwork, and this site's artwork sits on the page's own ground. The
//     dashboard surface inside it STAYS: that is not a frame, it is the product
//     being depicted, and a product UI is meant to look like a panel.
//
//   * REDUCED MOTION AND A PAUSE, neither of which his file has. Both live in
//     useCycle; see the note there, which also records what is still missing.
//
// NOTHING HERE IS INTERACTIVE, and nothing pretends to be. His draft chips are
// styled as buttons and do nothing; they render as plain text. Same call as the
// industry pages' InsightCard.
//
// THE COPY IS IN content/howItWorks.js, including the twelve card titles. His
// file has them inline in a script, but they are marketing copy by any other
// name — the kind of thing an edit would come looking for.

// He cycles every 4.2s. The swap is a fade out, a beat, then a fade in; holding
// the outgoing role for SWAP_MS is what lets the old cards leave before the new
// ones arrive, since one set of elements cannot do both at once.
const INTERVAL_MS = 4200;
const SWAP_MS = 320;

const RoleDashboard = ({ kicker, sub, caption, badgeLabel, roles }) => {
  const [target, pauseProps] = useCycle(roles.length, INTERVAL_MS);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (target === shown) return undefined;
    setLeaving(true);
    const id = setTimeout(() => {
      setShown(target);
      setLeaving(false);
    }, SWAP_MS);
    return () => clearTimeout(id);
  }, [target, shown]);

  const role = roles[shown];

  return (
    <figure className="role-dash" {...pauseProps}>
      {/* The four roles named once, for anyone who cannot watch the cycle go
          round — a screen reader meets whichever one happens to be rendered and
          has no way to reach the other three. */}
      <figcaption className="role-dash-summary">
        The same weekly intelligence, shown for each role in turn:{" "}
        {roles.map((r) => r.name).join(", ")}.
      </figcaption>

      <div className={`role-dash-panel role-dash-tone-${role.tone}`}>
        <div className="role-dash-topbar">
          {/* His brief asks specifically that the wordmark stay fully white,
              so it takes no role tone. */}
          <p className="role-dash-brand">MarketBuzzr</p>
          <p className="role-dash-prepared">
            <span>{badgeLabel}</span>
            <span className="role-dash-badge">
              <span className="role-dash-dot" />
              {role.name}
            </span>
          </p>
        </div>

        <div className="role-dash-body">
          <p className="role-dash-kicker">{kicker}</p>
          {/* Not a heading. The step's own h2 is above this figure, and the
              dashboard is a picture of a product rather than page structure. */}
          <p className={`role-dash-profile${leaving ? " is-leaving" : ""}`}>
            {role.profile}
          </p>
          <p className="role-dash-sub">{sub}</p>

          <ul className="role-dash-cards">
            {role.cards.map((card, i) => (
              // Keyed by role as well as position, so React replaces the card
              // rather than mutating it and the entry animation runs again.
              <li
                className={`role-dash-card${leaving ? " is-leaving" : ""}`}
                key={`${shown}-${i}`}
                style={{ "--stagger": `${i * 95}ms` }}
              >
                <span className="role-dash-card-icon">
                  <CategoryIcon name={card.icon} />
                </span>
                <span className="role-dash-tag">{card.tag}</span>
                <span className="role-dash-title">{card.title}</span>
                <span className="role-dash-action">{card.action} →</span>
              </li>
            ))}
          </ul>

          <p className="role-dash-progress" aria-hidden="true">
            {roles.map((r, i) => (
              <span key={r.name} className={i === shown ? "is-active" : ""} />
            ))}
          </p>

          <p className="role-dash-caption">
            <strong>{caption.emphasis}</strong>
            {caption.rest}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default RoleDashboard;
