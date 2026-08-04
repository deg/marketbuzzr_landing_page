import React from "react";
import { Link } from "react-router-dom";
import { home } from "../content/home";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import CtaPanel from "../components/CtaPanel";
import BrandDivider from "../components/BrandDivider";
import FlowSteps from "../components/FlowSteps";
import CategoryCard from "../components/CategoryCard";
import IndustryTile from "../components/IndustryTile";
import ProductImage from "../components/ProductImage";
import HeroAnimation from "../components/HeroAnimation";
import { DevNote } from "../components/DevOnly";
import signalsAvif from "../assets/market-signals.avif";
import signalsWebp from "../assets/market-signals.webp";
import insightAvif from "../assets/insight-medicalcomp.avif";
import insightWebp from "../assets/insight-medicalcomp.webp";

// Section order follows the FINAL handoff brief — drop_03 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/),
// the third and latest. It reads Promise -> Problem -> Product Proof -> How It
// Works -> Who It's For -> What You Track -> CTA. Against the previous build it
// moves Insight above the flow, moves Industries below it, and reinstates the
// LESS NOISE transition that the previous brief had removed.
const Home = () => {
  useDocumentTitle(home.title);
  const { hero, divider, problem, insight, flow, industries, categories, finalCta } =
    home;

  return (
    <>
      {/* §1 Hero. The brief deletes the context line that used to sit under the
          visual and says not to replace it; its meaning moved into the visual's
          description instead — see content/home.js.

          The artwork here is drawn rather than photographed: Manu's drop_05
          animation, which replaced the AVIF of the same composition. Its forty
          labels are now real text. */}
      <PageHero
        kicker={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
        emphasis={hero.emphasis}
        ctaLabel={hero.ctaPrimary}
        secondaryCtaLabel={hero.ctaSecondary}
      >
        <HeroAnimation title={hero.visualTitle} description={hero.visualAlt} />
      </PageHero>

      {/* §2 Hero transition — a compact bridge, deliberately not a section. */}
      <BrandDivider steps={divider} />

      {/* §3 Problem. Copy left, signal artwork right; stacks copy-first on
          narrow screens. The artwork must NOT take the .product-frame breakout
          here — see the rule in styles.css that suppresses it inside a column. */}
      <section className="section container container-wide">
        <div className="problem-grid">
          <div className="problem-copy">
            <h2>{problem.title}</h2>
            {problem.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="problem-closer">{problem.closer}</p>
          </div>
          <ProductImage
            className="signals-visual"
            avif={signalsAvif}
            webp={signalsWebp}
            width={1163}
            height={1011}
            alt={problem.visualAlt}
          />
        </div>
      </section>

      {/* §4 Product Proof / Insight. The four explanatory cards that used to
          sit under this visual are gone — the revision found them redundant
          with the annotations now drawn into the artwork itself. */}
      <section className="section container">
        <SectionTitle title={insight.title} lead={insight.lead} />
        <ProductImage
          className="insight-visual"
          avif={insightAvif}
          webp={insightWebp}
          width={1536}
          height={1024}
          alt={insight.visualAlt}
        />
        {/* FIX-BEFORE-RELEASE (mbz-et8e.18): decision open, see mbz-et8e.12. */}
        <DevNote>
          The company is now the fictional MedicalComp, but the artwork still
          announces the “MiniMed 780G” — Medtronic’s real, trademarked product,
          which a fictional company cannot launch — and still cites Tandem
          Diabetes Care and MedTech Dive as real sources. The date reads May 2,
          2025, more than a year stale. Three string edits in this same artwork
          would close it; see mbz-et8e.12.
        </DevNote>
        <p className="lead lead-strong">{insight.emphasis}</p>
      </section>

      {/* §5 The five-step flow, built natively. No paragraph under the heading,
          and deliberately compact: every brief so far has been explicit that
          this exists for clarity, not decoration. The detailed diagram lives at
          /how-it-works. */}
      <section className="section container">
        <SectionTitle title={flow.title} />
        <FlowSteps steps={flow.steps} />
        <p className="lead">
          <Link className="text-link" to={flow.linkTo}>
            {flow.linkLabel} →
          </Link>
        </p>
      </section>

      {/* §6 Industries. The previous brief moved this to §3; this one moves it
          back down, behind the product proof and the process. Four of the six
          lead to placeholders during the design cycle — gated from production
          by mbz-et8e.18. */}
      <section className="section container">
        <SectionTitle title={industries.title} lead={industries.lead} />
        <div className="industry-grid">
          {industries.items.map((item) => (
            <IndustryTile key={item.name} {...item} />
          ))}
        </div>
        <p className="lead">
          <Link className="text-link" to={industries.exploreTo}>
            {industries.exploreLabel} →
          </Link>
        </p>
      </section>

      {/* §7 Intelligence areas */}
      <section className="section container">
        <SectionTitle title={categories.title} lead={categories.lead} />
        <div className="category-grid">
          {categories.items.map((item) => (
            <CategoryCard key={item.heading} {...item} />
          ))}
        </div>
      </section>

      {/* §8 Final CTA */}
      <section className="section container home-closing">
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

export default Home;
