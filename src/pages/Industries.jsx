import React from "react";
import { industries } from "../content/industries";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import IndustryTile from "../components/IndustryTile";
import CtaPanel from "../components/CtaPanel";

// The /industries entry page, from Manu's drop_06 Industries handover — see
// content/industries.js for what it asks for and what was decided.
//
// Deliberately the shortest page component on the site. Every part of it is a
// component that already existed, because his brief's strongest instruction is
// that this must not look like a new landing page: "reuse existing components
// wherever possible", "do not create a separate visual style for these cards",
// "do not guess or substitute fonts, navigation styles, CTA styles, colors, or
// spacing". Writing anything new here would have been the mistake.
//
// No visual of any kind — "no image or animation is required on this page" —
// so PageHero takes no children and there is no artwork import.
const Industries = () => {
  useDocumentTitle(industries.title);
  const { hero, picker, finalCta, items } = industries;

  return (
    <>
      {/* No CTAs in the hero. His page structure puts them only in the closing
          section, and on a page this short a second pair would be most of it. */}
      <PageHero title={hero.title} sub={hero.sub} emphasis={hero.emphasis} />

      <section className="section container">
        <SectionTitle title={picker.title} lead={picker.lead} />
        <div className="industry-grid">
          {items.map((item) => (
            // `featured` is deliberately not forwarded. The homepage leads with
            // Medical Technology; this page wants all six equal, which his
            // brief says in as many words.
            <IndustryTile
              key={item.name}
              name={item.name}
              to={item.to}
              blurb={item.blurb}
            />
          ))}
        </div>
      </section>

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

export default Industries;
