import React from "react";
import { howItWorks } from "../content/howItWorks";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import CtaPanel from "../components/CtaPanel";
import ProductImage from "../components/ProductImage";
import RoleDashboard from "../components/RoleDashboard";
import DraftFromIdea from "../components/DraftFromIdea";
import { DevFlag } from "../components/DevOnly";
import monitorAvif from "../assets/monitor-filter.avif";
import monitorWebp from "../assets/monitor-filter.webp";

// Hero -> 01 -> 02 -> 03 -> CTA, per Manu's How It Works handoff briefs —
// drop_04 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/) for the page's
// shape, drop_06 for its copy and two of its three visuals. The three steps are
// one continuous story — find what matters, make it relevant to the reader,
// help the reader act — and the brief forbids anything else on this page.
//
// The steps are sequential full-width sections rather than a three-column
// layout or alternating 50/50 text/image splits; the brief rules both out
// because they shrink the supplied artwork below the size its embedded text
// needs. That also means .product-frame's breakout works here as designed,
// since the section spans the page. The homepage reached the same conclusion
// for its own §3 in drop_06 and dropped its split.
//
// No <main> wrapper. The brief sketches one, but also says to prefer the
// existing codebase's conventions — and no page on this site has one.
//
// ONLY STEP 01 IS STILL A PICTURE. drop_06 replaced steps 02 and 03 with HTML
// animations, which are RoleDashboard and DraftFromIdea; step 01 came back
// unchanged, so it keeps the AVIF already in the repo — verified as the same
// source, mean channel difference 0.60/255 against his PNG.
//
// That image is drawn on white while the page is navy, so it sets its own
// --artwork-ground in styles.css and the near-white bleeds outward until the
// edge softens into the page — the same mechanism the homepage uses in the
// opposite direction. It used to apply to all three visuals; it is now this one
// special case, and a dark-ground re-render would delete it altogether. That is
// the last outstanding artwork ask on this page (mbz-et8e.28, memo §2).
const MONITOR_VISUAL = {
  avif: monitorAvif,
  webp: monitorWebp,
  width: 1774,
  height: 887,
};

// Each step's visual, by id. Step 01 is a picture; the other two are drawn.
const VISUAL = {
  "monitor-filter": (step) => (
    <ProductImage
      className="how-visual how-visual-monitor-filter"
      alt={step.visualAlt}
      {...MONITOR_VISUAL}
    />
  ),
  "role-based-intelligence": () => (
    <RoleDashboard {...howItWorks.roleDashboard} />
  ),
  "turn-intelligence-into-action": () => (
    <DraftFromIdea {...howItWorks.draftFromIdea} />
  ),
};

const HowItWorks = () => {
  useDocumentTitle(howItWorks.title);
  const { hero, steps, finalCta } = howItWorks;

  return (
    <>
      {/* Copy-led and deliberately image-free: the brief keeps the old product
          overview diagram out of the hero and says not to substitute another
          illustration, because the 01-02-03 sequence below IS the explanation. */}
      <PageHero
        kicker={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
        ctaLabel={hero.ctaPrimary}
        secondaryCtaLabel={hero.ctaSecondary}
      />

      {steps.map((step) => (
        <section className="section container how-step" id={step.id} key={step.id}>
          {/* Not aria-hidden. On the old page the numbers sat in an <ol>, which
              conveyed order on its own; these are separate sections, so the
              numeral is the only thing carrying the sequence. */}
          <p className="how-step-number">{step.number}</p>
          <h2>{step.title}</h2>
          <p className="lead">{step.lead}</p>
          {/* FIX-BEFORE-RELEASE (mbz-et8e.18): remove once Manu answers.
              Directly under the line it is about, and on all three, because the
              question is per-line — drop_06 gives one paragraph per step and
              lists headline → one concise paragraph → visual, which reads as
              deleting these, but it names only the closing lines under 01 and
              02 for deletion and never mentions these. See content/howItWorks.js
              for the full reasoning and §9 of the memo for the ask. */}
          <DevFlag>Not in drop_06 — keep this line?</DevFlag>
          <div className="how-step-body">
            <p>{step.body}</p>
          </div>
          {VISUAL[step.id](step)}
          {/* Only step 03 keeps a line under its visual, and drop_06 says so by
              name. The other two had one and it is deleted, not moved. */}
          {step.closer && <p className="lead lead-strong">{step.closer}</p>}
        </section>
      ))}

      <section className="section container">
        <CtaPanel
          as="h2"
          heading={finalCta.title}
          paragraphs={finalCta.paragraphs}
          ctaLabel={finalCta.ctaPrimary}
          secondaryCtaLabel={finalCta.ctaSecondary}
        />
      </section>
    </>
  );
};

export default HowItWorks;
