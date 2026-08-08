import React from "react";
import { howItWorks } from "../content/howItWorks";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import CtaPanel from "../components/CtaPanel";
import MonitorFilter from "../components/MonitorFilter";
import RoleDashboard from "../components/RoleDashboard";
import DraftFromIdea from "../components/DraftFromIdea";

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
// NO STEP IS A PICTURE ANY MORE. drop_06 replaced steps 02 and 03 with HTML
// animations, which are RoleDashboard and DraftFromIdea, and drop_07 took step
// 01 with them — see MonitorFilter for why the raster could not follow this
// brief into a 640px column. All three visuals are markup, so all three reflow
// instead of scaling, and the --artwork-ground special case this page carried
// for its one light-on-dark raster is gone with it.
//
// That also closes the last outstanding artwork ask on this page: memo §2 asked
// Manu for a dark-ground re-render of 01, and there is nothing left to
// re-render (mbz-et8e.28).

// Each step's visual, by id. All three are drawn.
const VISUAL = {
  "monitor-filter": () => <MonitorFilter {...howItWorks.monitorFilter} />,
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
          {/* The short line that used to sit here is gone, and so is the flag
              that asked about it. His August handover gives the same
              headline-plus-one-paragraph structure a second time with no such
              line, which is the answer (mbz-et8e.52.8). */}
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
