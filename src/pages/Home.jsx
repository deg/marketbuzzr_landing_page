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
import WorthYourAttention from "../components/WorthYourAttention";
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

      {/* §3 Problem. Copy left, animation right — drop_07 §3.2, which says it
          twice: "section copy on the LEFT and the animation on the RIGHT" and
          "do not place the animation full-width below the copy on desktop".

          THIS REVERSES drop_06, WHICH REMOVED THE SAME SPLIT FOR A MEASURED
          REASON, and the reason has not gone away. His animation is a wide
          composition whose card labels are 17 units on a 1380 canvas: at full
          width they render about 17px, and in a column they cannot. The layout
          below spends everything it can on the visual to limit that — the grid
          opts into the 1400px measure rather than the 1100px text one, and the
          copy takes a fixed narrow rail rather than a fraction — which lands
          the labels at 12.2px instead of the 8.2px an even split of the same
          measure would give.
          Measured, not estimated; the number is on mbz-et8e.54.5.

          The visual is NOT given .product-frame's breakout here. That centres a
          wider child inside a narrower parent with left:50% and only works when
          the parent spans the page; inside a column the 50% resolves against
          the column and the artwork overflows the window. The grid is wide
          instead, which is the same reach without the trap. */}
      <section className="section container container-wide problem-split">
        <div className="problem-copy">
          <SectionTitle title={problem.title} />
          {problem.paragraphs.map((p, i) => (
            <p className="lead" key={i}>
              {p}
            </p>
          ))}
          <p className="lead lead-strong">{problem.closer}</p>
        </div>
        <WorthYourAttention
          title={problem.visualTitle}
          description={problem.visualAlt}
        />
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
        {/* FIX-BEFORE-RELEASE (mbz-et8e.18): the artwork above is a fabricated
            product announcement attributed to real companies. It announces the
            “MiniMed 780G” — Medtronic's real, trademarked product, which the
            fictional MedicalComp cannot launch — and cites Tandem Diabetes Care
            and MedTech Dive as having covered it. Three names, three string
            edits, and the artwork is clear.

            Its dates are not part of that. The five inside it read Aug 2026,
            with the sources inside the week before the card, and they are
            painted by scripts/redate-insight-card.py (mbz-et8e.53) — go there
            to move them again, or after any re-render from Manu.

            A visible dev note used to sit here saying so, and was removed on
            2026-08-05 (mbz-et8e.48). THIS TAG IS NOW THE ONLY THING STOPPING
            IT: scripts/deploy.mjs refuses a live deploy while it is present.
            Do not delete it to get past the gate — the decision is open as
            mbz-et8e.12, and section 1 of the outstanding-items memo is the
            same question put to Manu. */}
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
          back down, behind the product proof and the process. Nine tiles since
          drop_07 §6.2, and every one of them reaches a real page. */}
      <section className="section container">
        <SectionTitle title={industries.title} lead={industries.lead} />
        <div className="industry-grid">
          {/* Named props rather than {...item}. The list gained a `blurb` for
              the /industries entry page, and a spread put it on these tiles
              too — measured, it took them from 74px tall to 197px. §6 is a list
              of names; the copy belongs on the page built to carry it. */}
          {industries.items.map((item) => (
            <IndustryTile
              key={item.name}
              name={item.name}
              to={item.to}
            />
          ))}
        </div>
        <p className="lead">
          <Link className="text-link" to={industries.exploreTo}>
            {industries.exploreLabel} →
          </Link>
        </p>
      </section>

      {/* §7 Intelligence areas. The closing link is drop_10's README and its
          checklist item 3, and it is deliberately §6's link with a different
          destination — "styled like 'Explore all industries →'". */}
      <section className="section container">
        <SectionTitle title={categories.title} lead={categories.lead} />
        <div className="category-grid">
          {categories.items.map((item) => (
            <CategoryCard key={item.heading} {...item} />
          ))}
        </div>
        <p className="lead">
          <Link className="text-link" to={categories.exploreTo}>
            {categories.exploreLabel} →
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
