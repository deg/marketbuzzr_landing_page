import React from "react";
import { Link } from "react-router-dom";
import { home } from "../content/home";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import CtaPanel from "../components/CtaPanel";
import SignalCloud from "../components/SignalCloud";
import BrandDivider from "../components/BrandDivider";
import FlowSteps from "../components/FlowSteps";
import CategoryCard from "../components/CategoryCard";
import PersonalizationDiagram from "../components/PersonalizationDiagram";
import IndustryTile from "../components/IndustryTile";
import ProductImage from "../components/ProductImage";
import { DevNote, DevAlternative } from "../components/DevOnly";
import heroAvif from "../assets/hero-dashboard.avif";
import heroWebp from "../assets/hero-dashboard.webp";
import insightAvif from "../assets/insight-card.avif";
import insightWebp from "../assets/insight-card.webp";
import flowAvif from "../assets/signal-flow.avif";
import flowWebp from "../assets/signal-flow.webp";
import personalizationAvif from "../assets/personalization.avif";
import personalizationWebp from "../assets/personalization.webp";

// Section order follows the brief's Final Page Flow. Each section is a shell:
// the copy and heading levels are final, but the visual or interactive part is
// a placeholder owned by its own bead (named per section below). Sections get
// filled in one at a time, so the page stays coherent on /new/ throughout.
const Home = () => {
  useDocumentTitle(home.title);
  const {
    hero,
    problem,
    divider,
    howItWorks,
    insight,
    categories,
    personalization,
    industries,
    finalCta,
  } = home;

  return (
    <>
      {/* §1 Hero. The visual stays a placeholder until real product
          screenshots exist (mbz-et8e.12) — a hand-built dashboard would be
          invented product imagery, which the brief rules out. */}
      <PageHero
        kicker={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
        emphasis={hero.emphasis}
        ctaLabel={hero.ctaPrimary}
        secondaryCtaLabel={hero.ctaSecondary}
        footnote={hero.footnote}
      >
        <ProductImage
          className="hero-visual"
          avif={heroAvif}
          webp={heroWebp}
          width={1536}
          height={735}
          priority
          alt={hero.visualAlt}
        />
        {/* FIX-BEFORE-RELEASE (mbz-et8e.18): remove, or re-render the artwork without the metric. */}
        <DevNote>
          This artwork has “7,842 / Scanned across 350+ sources” baked in. The
          brief’s own Copy/UX principle 6 forbids invented platform metrics, and
          it cannot be edited out of a flattened image. Accepted for the design
          cycle; needs a re-render or a crop before launch.
        </DevNote>
      </PageHero>

      {/* §2 Problem. Copy left, signal cloud right; stacks copy-first on
          narrow screens. */}
      <section className="section container">
        <div className="problem-grid">
          <div className="problem-copy">
            <h2>{problem.title}</h2>
            {problem.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="problem-closer">{problem.closer}</p>
          </div>
          <SignalCloud signals={problem.signals} relevant={problem.relevant} />
        </div>
      </section>

      <BrandDivider steps={divider} />

      {/* §3 How It Works — a summary. The detailed version stays at
          /how-it-works rather than being duplicated here. */}
      <section className="section container">
        <SectionTitle title={howItWorks.title} lead={howItWorks.lead} />
        <ProductImage
          avif={flowAvif}
          webp={flowWebp}
          width={1536}
          height={839}
          alt={howItWorks.visualAlt}
        />
        {/* FIX-BEFORE-RELEASE (mbz-et8e.18): remove this trigger. Keep
            FlowSteps itself — it may return as the mobile rendering. */}
        <DevAlternative label="flow diagram">
          <FlowSteps steps={howItWorks.steps} />
        </DevAlternative>
        <p className="lead lead-strong">{howItWorks.emphasis}</p>
        <p className="lead">
          <Link className="text-link" to={howItWorks.linkTo}>
            {howItWorks.linkLabel} →
          </Link>
        </p>
      </section>

      {/* §4 Product Output / Insight. The visual stays a placeholder until real
          screenshots exist (mbz-et8e.12) — this depicts an actual product
          surface, so it must not be invented. The four callouts are real HTML
          beside it rather than annotations baked into an image, so they carry
          their meaning on their own. */}
      <section className="section container">
        <SectionTitle title={insight.title} lead={insight.lead} />
        <ProductImage
          avif={insightAvif}
          webp={insightWebp}
          width={1536}
          height={1024}
          alt={insight.visualAlt}
        />
        {/* FIX-BEFORE-RELEASE (mbz-et8e.18): remove once the marks are cleared, or swap the artwork. */}
        <DevNote>
          This artwork shows third-party marks — FDA, Reuters, McKinsey &amp;
          Company, Fierce Medtech, Nature Medicine, Intuitive Surgical — plus a
          photograph of an FDA building. Shown as sources rather than customers,
          but neither the marks nor the photograph have been cleared for
          marketing use. Accepted for the design cycle; confirm before launch.
        </DevNote>
        <div className="grid">
          {insight.callouts.map((c) => (
            <div className="card" key={c.heading}>
              <h3>{c.heading}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
        <p className="lead lead-strong">{insight.emphasis}</p>
        {insight.paragraphs.map((p, i) => (
          <p className="lead" key={i}>
            {p}
          </p>
        ))}
      </section>

      {/* §5 Intelligence categories */}
      <section className="section container">
        <SectionTitle title={categories.title} lead={categories.lead} />
        <div className="category-grid">
          {categories.items.map((item) => (
            <CategoryCard key={item.heading} {...item} />
          ))}
        </div>
      </section>

      {/* §6 Personalization. Second split of the page, so the visual is a
          vertical funnel rather than another cluster — see the component. */}
      <section className="section container">
        <div className="problem-grid">
          <div className="problem-copy">
            <span className="kicker">{personalization.eyebrow}</span>
            <h2>{personalization.title}</h2>
            {personalization.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="problem-closer">{personalization.emphasis}</p>
            <p className="personalization-closer">{personalization.closer}</p>
          </div>
          <div>
            {/* FIX-BEFORE-RELEASE (mbz-et8e.18): this artwork is unreadable at
                the width a split column gives it (~34% of source). Deliberately
                left visibly wrong rather than patched, because the fix is a
                DESIGN decision for Manu: widen the section, or supply a simpler
                diagram that survives a half column. See styles.css. */}
            <ProductImage
              avif={personalizationAvif}
              webp={personalizationWebp}
              width={1536}
              height={889}
              alt={personalization.visualAlt}
            />
            {/* FIX-BEFORE-RELEASE (mbz-et8e.18): remove this trigger. Keep the
                diagram itself — it may return as the mobile rendering. */}
            <DevAlternative label="personalization diagram">
              <PersonalizationDiagram
                inputs={personalization.inputs}
                engine={personalization.engine}
                output={personalization.output}
              />
            </DevAlternative>
          </div>
        </div>
      </section>

      {/* §7 Industries. Four of the six lead to placeholders during the design
          cycle — gated from production by mbz-et8e.18. */}
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
