import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import CategoryIcon from "../components/CategoryIcon";
import CtaPanel from "../components/CtaPanel";
import SourceCluster from "../components/SourceCluster";
import InsightCard from "../components/InsightCard";
import RoleBar from "../components/RoleBar";

// The industry-page template, built from Manu's drop_05 sketch and currently
// used only by Biotechnology (mbz-et8e.38).
//
// WHY THIS IS NOT UseCasePage. That component still renders /use-cases/tech and
// is deliberately untouched. This page is a pilot for a different structure —
// hero visual, worked example, roles — and the intent is that tech and the four
// unbuilt industry pages converge here once it is judged, not that two templates
// live side by side forever. If you are adding a third page, add it HERE and
// move tech across rather than growing UseCasePage.
//
// The route stays /use-cases/biotech. Renaming it to /industries/biotechnology
// would break the nav and any external link for no reader benefit; the four
// missing pages can take /industries/* without this one moving.
const IndustryPage = ({ data }) => {
  useDocumentTitle(data.title);
  const { hero, sources, intro, insight, roles, features, closing } = data;

  return (
    <>
      {/* Split rather than centred, following Manu's design: copy left, sources
          beside it. The centred version put the visual 669px down a 960px hero,
          which on a laptop is below the fold. */}
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        sub={hero.sub}
        ctaLabel={hero.ctaPrimary}
        secondaryCtaLabel={hero.ctaSecondary}
        aside={<SourceCluster {...sources} />}
      />

      <section className="section container info-block">
        <h2>{intro.heading}</h2>
        <p className="lead lead-strong">{intro.emphasis}</p>
        {intro.paragraphs.map((p, i) => (
          <p className="lead" key={i}>
            {p}
          </p>
        ))}
      </section>

      {/* The example and the roles read as one unit: the card is the signal, the
          bar is who acts on it. Kept in one section so the spacing between them
          stays tighter than the spacing between sections. */}
      <section className="section container container-wide">
        <InsightCard {...insight} />
        <RoleBar {...roles} />
      </section>

      {/* Four capabilities on the shared .card surface in the shared 2-up .grid.
          The only thing this shape needs that CategoryCard does not is a
          paragraph where it has a list, so it borrows .category-card for the
          icon-above-heading layout rather than forking a near-identical card. */}
      <section className="section container">
        <SectionTitle title={features.heading} />
        <div className="grid">
          {features.items.map((item) => (
            <div className="card category-card" key={item.heading}>
              <CategoryIcon name={item.icon} />
              <h3>{item.heading}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <p className="lead">{features.closer}</p>
      </section>

      <section className="section container">
        <CtaPanel
          as="h2"
          heading={closing.heading}
          paragraphs={closing.paragraphs}
          ctaLabel={closing.ctaPrimary}
          secondaryCtaLabel={closing.ctaSecondary}
        />
      </section>
    </>
  );
};

export default IndustryPage;
