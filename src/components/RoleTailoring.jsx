import React, { useEffect, useState } from "react";
import { useCycle } from "../hooks/useCycle";

// What You Get's hero animation, from drop_07's
// assets/marketbuzzr-what-you-get-role-animation-v1.html.
//
// ONE DEVELOPMENT, FOUR READINGS. The headline and the two labels around it
// never change; only the panel beneath does, cycling CEO & Leadership ->
// Marketing -> Sales -> Customer Success. That is the whole argument of the
// page, so the fixed part staying fixed is the point rather than an economy.
//
// SAME SHAPE AS RoleDashboard, and deliberately not the same component. That one
// swaps a whole dashboard of three cards per role and carries a brand bar, a
// profile name and a progress row; this swaps one result block under a headline
// that belongs to all four. Read RoleDashboard's header for the conventions
// these two share — his file is HTML, so neither is a transcription, and both
// are a panel, a timer and an index.
//
// His timing: a 3.2s cycle with a 280ms fade between readings. useCycle is what
// stops it while the pointer or focus is inside and pins it to the first role
// under prefers-reduced-motion, which his file does nothing about.
//
// NOTHING HERE IS INTERACTIVE. The progress dots are drawn, not buttons, for the
// same reason the industry pages' draft options are labels: a control that does
// nothing is worse than a mark that never claimed to be one.
const INTERVAL_MS = 3200;
const SWAP_MS = 280;

const RoleTailoring = ({ brand, kicker, headline, contextLabel, roles }) => {
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
    <figure className="role-tailor" {...pauseProps}>
      {/* All four named once, for anyone who cannot watch the cycle go round: a
          screen reader meets whichever reading happens to be rendered and has no
          way to reach the other three. Same provision RoleDashboard makes. */}
      <figcaption className="role-tailor-summary">
        {headline} Read four ways, in turn:{" "}
        {roles.map((r) => r.chip).join(", ")}.
      </figcaption>

      <div className="role-tailor-shell" aria-hidden="true">
        <div className="role-tailor-top">
          <strong>{brand}</strong>
          <span className="role-tailor-chip">{role.chip}</span>
        </div>

        <div className="role-tailor-body">
          <p className="role-tailor-kicker">{kicker}</p>
          <p className="role-tailor-headline">{headline}</p>
          <p className="role-tailor-kicker">{contextLabel}</p>

          <div
            className={
              leaving ? "role-tailor-result is-leaving" : "role-tailor-result"
            }
          >
            <p className="role-tailor-label">{role.label}</p>
            <p className="role-tailor-title">{role.title}</p>
            <p className="role-tailor-text">{role.text}</p>
          </div>

          <div className="role-tailor-progress">
            {roles.map((r, i) => (
              <span key={r.chip} className={i === shown ? "is-active" : ""} />
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
};

export default RoleTailoring;
