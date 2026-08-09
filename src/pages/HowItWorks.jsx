import React from "react";
import { howItWorks } from "../content/howItWorks";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import CtaPanel from "../components/CtaPanel";
import ProductImage from "../components/ProductImage";
import RoleDashboard from "../components/RoleDashboard";
import DraftFromIdea from "../components/DraftFromIdea";
import monitorAvif from "../assets/monitor-filter.avif";
import monitorWebp from "../assets/monitor-filter.webp";

// Hero -> 01 -> 02 -> 03 -> CTA, per Manu's How It Works handoff briefs —
// drop_04 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/) for the page's
// shape, drop_06 for its copy and two of its three visuals. The three steps are
// one continuous story — find what matters, make it relevant to the reader,
// help the reader act — and the brief forbids anything else on this page.
//
// EVERY STEP IS COPY LEFT, VISUAL RIGHT, from drop_07 §4.2: "every numbered
// step uses COPY LEFT and VISUAL RIGHT", "keep the same visual frame/column
// width and consistent vertical alignment for all three steps", "do not
// alternate visual sides". Mobile is copy first with its visual directly below,
// which is what the single column gives.
//
// THIS REVERSES drop_04 AND drop_06, which ruled splits out because they shrink
// the supplied artwork below the size its embedded text needs. That objection
// was about artwork, and there is none left here: all three visuals are markup
// now, so they reflow inside the column instead of scaling down in it. The one
// that could not — step 01's raster — is what mbz-et8e.54.8 rebuilt.
//
// No <main> wrapper. The brief sketches one, but also says to prefer the
// existing codebase's conventions — and no page on this site has one.
//
// STEP 01 IS A PICTURE AGAIN, on Manu's instruction. drop_10 §4.1 supplies
// assets/01-monitor-filter.png and says "replace the current HTML recreation in
// Step 01 with this exact static image. Do not recreate the image in HTML",
// naming the same 640px frame §4.2 set. That reverses mbz-et8e.54.8, whose
// reason has not gone away: measured on this same PNG, its smallest type is 8–9
// px of cap height on a 1774px canvas, about 3.2px at 640. He set the frame
// width himself, so the trade is his; the number is on mbz-et8e.55.1 and in the
// memo. MonitorFilter is PARKED, not deleted — this page's visuals have now
// reversed twice.
//
// Steps 02 and 03 stay drawn, from drop_06.

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
      className="how-visual"
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
        <section
          className="section container container-wide how-step"
          id={step.id}
          key={step.id}
        >
          <div className="how-step-copy">
            {/* Not aria-hidden. On the old page the numbers sat in an <ol>,
                which conveyed order on its own; these are separate sections, so
                the numeral is the only thing carrying the sequence. */}
            <p className="how-step-number">{step.number}</p>
            <h2>{step.title}</h2>
            {/* The short line that used to sit here is gone, and so is the flag
                that asked about it. His August handover gives the same
                headline-plus-one-paragraph structure a second time with no such
                line, which is the answer (mbz-et8e.52.8). */}
            <div className="how-step-body">
              <p>{step.body}</p>
            </div>
          </div>

          <div className="how-step-visual">{VISUAL[step.id](step)}</div>

          {/* Only step 03 keeps a line under its visual, and both drop_06 and
              drop_07 §4.5 say so by name. It spans both columns rather than
              sitting in the copy one, because §4.5 places it "below this
              section" — under the pair, not beside the visual. */}
          {step.closer && (
            <p className="lead lead-strong how-step-closer">{step.closer}</p>
          )}
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
