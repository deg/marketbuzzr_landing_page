import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import CategoryIcon from "../components/CategoryIcon";
import DemoButton from "../components/DemoButton";
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

      {/* ONE rounded surface holding both, as the sketch draws it: the card is
          the signal and the bar is who acts on it, and the bar runs edge to edge
          along the bottom rather than floating below as a second panel. The
          wrapper clips, which is what lets the bar square off against it. */}
      <section className="section container container-wide industry-example">
        <div className="insight-wrap">
          <InsightCard {...insight} />
          <RoleBar {...roles} />
        </div>
      </section>

      {/* Four across, divided by hairlines rather than boxed as cards — the
          sketch's shape. They are short and parallel, and four bordered cards
          made them look like four separate offers instead of one set. */}
      <section className="section container">
        <SectionTitle title={features.heading} />
        <div className="feature-row">
          {features.items.map((item) => (
            <div className="feature" key={item.heading}>
              <span className="feature-badge">
                <CategoryIcon name={item.icon} />
              </span>
              <h3>{item.heading}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <p className="lead">{features.closer}</p>
      </section>

      {/* Full-bleed dark band with the copy left and the buttons right, as the
          sketch has it — not the site's centred rounded panel. It is the only
          dark thing on the light theme and that is the point: it closes the page
          rather than sitting on it. */}
      <section className="industry-cta">
        <div className="container industry-cta-grid">
          <div>
            <h2>{closing.heading}</h2>
            {closing.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="cta-actions">
            <DemoButton label={closing.ctaPrimary} className="cta" />
            <DemoButton label={closing.ctaSecondary} className="cta-secondary" />
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustryPage;
