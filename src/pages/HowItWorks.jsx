import React from "react";
import { howItWorks } from "../content/howItWorks";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import CtaPanel from "../components/CtaPanel";
import ProductImage from "../components/ProductImage";
import monitorAvif from "../assets/monitor-filter.avif";
import monitorWebp from "../assets/monitor-filter.webp";
import roleAvif from "../assets/role-based-intelligence.avif";
import roleWebp from "../assets/role-based-intelligence.webp";
import actionAvif from "../assets/turn-into-action.avif";
import actionWebp from "../assets/turn-into-action.webp";

// Hero -> 01 -> 02 -> 03 -> CTA, per Manu's How It Works handoff brief —
// drop_04 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/). The three steps
// are one continuous story — find what matters, make it relevant to the reader,
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
// The artwork is drawn on white while the page is navy. Each figure sets its
// own --artwork-ground in styles.css so the near-white bleeds outward and the
// edge softens into the page — the same mechanism the homepage uses in the
// opposite direction. Dark-ground re-renders have been asked for
// (mbz-et8e.28 item 9); when they arrive this reverts to one value per image.
const VISUALS = {
  "monitor-filter": {
    avif: monitorAvif,
    webp: monitorWebp,
    width: 1774,
    height: 887,
  },
  "role-based-intelligence": {
    avif: roleAvif,
    webp: roleWebp,
    width: 1604,
    height: 981,
  },
  "turn-intelligence-into-action": {
    avif: actionAvif,
    webp: actionWebp,
    width: 1503,
    height: 663,
  },
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
          <div className="how-step-body">
            {step.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ProductImage
            className={`how-visual how-visual-${step.id}`}
            alt={step.visualAlt}
            {...VISUALS[step.id]}
          />
          <p className="lead lead-strong">{step.closer}</p>
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
