import React from "react";
import { Link } from "react-router-dom";
import { home } from "../content/home";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import CtaPanel from "../components/CtaPanel";
import FlowSteps from "../components/FlowSteps";
import CategoryCard from "../components/CategoryCard";
import IndustryTile from "../components/IndustryTile";
import ProductImage from "../components/ProductImage";
import { DevNote } from "../components/DevOnly";
import heroAvif from "../assets/hero-filter.avif";
import heroWebp from "../assets/hero-filter.webp";
import signalsAvif from "../assets/market-signals.avif";
import signalsWebp from "../assets/market-signals.webp";
import insightAvif from "../assets/insight-competitor-launch.avif";
import insightWebp from "../assets/insight-competitor-launch.webp";

// Section order follows the REVISED handoff brief
// (~/Documents/marketbuzzr/Marketbuzzr_Homepage_Revised_CTO_Handoff/), which
// supersedes the original one. Against the first build it moves Industries up
// to §3, replaces the large flow diagram with native steps, and drops two whole
// sections: the LESS NOISE / MORE SIGNAL divider and the standalone
// personalization section, whose concept now lives in the hero.
const Home = () => {
  useDocumentTitle(home.title);
  const { hero, problem, industries, flow, insight, categories, finalCta } =
    home;

  return (
    <>
      {/* §1 Hero. The artwork carries the whole personalization concept, so the
          context line below it keeps that concept in HTML too — see the note in
          content/home.js. */}
      <PageHero
        kicker={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
        emphasis={hero.emphasis}
        ctaLabel={hero.ctaPrimary}
        secondaryCtaLabel={hero.ctaSecondary}
      >
        <ProductImage
          className="hero-visual"
          avif={heroAvif}
          webp={heroWebp}
          width={1536}
          height={1024}
          priority
          alt={hero.visualAlt}
        />
        <p className="hero-context">{hero.context}</p>
      </PageHero>

      {/* §2 Problem. Copy left, signal artwork right; stacks copy-first on
          narrow screens. The artwork must NOT take the .product-frame breakout
          here — see the rule in styles.css that suppresses it inside a column. */}
      <section className="section container">
        <div className="problem-grid">
          <div className="problem-copy">
            <h2>{problem.title}</h2>
            {problem.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="problem-closer">{problem.closer}</p>
          </div>
          <ProductImage
            avif={signalsAvif}
            webp={signalsWebp}
            width={1536}
            height={1024}
            alt={problem.visualAlt}
          />
        </div>
      </section>

      {/* §3 Industries. Moved up from the end of the page so the reader learns
          who this is for before the process and the product output. Four of the
          six lead to placeholders during the design cycle — gated from
          production by mbz-et8e.18, and more prominent here than they were. */}
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

      {/* §4 The five-step flow, built natively. No paragraph under the heading:
          the revision is explicit that this section exists for clarity, not
          decoration. The detailed diagram lives at /how-it-works. */}
      <section className="section container">
        <SectionTitle title={flow.title} />
        <FlowSteps steps={flow.steps} />
        <p className="lead">
          <Link className="text-link" to={flow.linkTo}>
            {flow.linkLabel} →
          </Link>
        </p>
      </section>

      {/* §5 Product Output / Insight. The four explanatory cards that used to
          sit under this visual are gone — the revision found them redundant
          with the annotations now drawn into the artwork itself. */}
      <section className="section container">
        <SectionTitle title={insight.title} lead={insight.lead} />
        <ProductImage
          avif={insightAvif}
          webp={insightWebp}
          width={1536}
          height={1024}
          alt={insight.visualAlt}
        />
        {/* FIX-BEFORE-RELEASE (mbz-et8e.18): decision open, see mbz-et8e.12. */}
        <DevNote>
          This artwork depicts a product announcement attributed to Medtronic
          that did not happen: the MiniMed 780G is a real product, but the
          “enhanced AI algorithm and 15% longer battery life”, the date and the
          cited coverage are invented, as are Tandem Diabetes Care and MedTech
          Dive as sources. Accepted for the design cycle; a real company&apos;s
          name on a fabricated announcement needs a decision before launch.
        </DevNote>
        <p className="lead lead-strong">{insight.emphasis}</p>
      </section>

      {/* §6 Intelligence categories */}
      <section className="section container">
        <SectionTitle title={categories.title} lead={categories.lead} />
        <div className="category-grid">
          {categories.items.map((item) => (
            <CategoryCard key={item.heading} {...item} />
          ))}
        </div>
      </section>

      {/* §7 Final CTA */}
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
