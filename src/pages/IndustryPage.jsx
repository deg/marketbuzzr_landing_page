import React from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import CategoryIcon from "../components/CategoryIcon";
import CtaPanel from "../components/CtaPanel";
import SourceCluster from "../components/SourceCluster";
import InsightCard from "../components/InsightCard";
import RoleBar from "../components/RoleBar";
import { industryChrome } from "../content/industryChrome";

// THE industry-page template — the only one. Built from Manu's drop_05 sketch
// (mbz-et8e.38) as a pilot beside UseCasePage, which rendered a different
// structure for the same kind of page; the August handover settled that by
// requiring one, and UseCasePage is gone (mbz-et8e.52.12). Every industry page
// is this component with a different content module. There is nowhere else to
// add one.
//
// ROUTES ARE HISTORY, NOT A CATEGORY. Biotechnology and Enterprise Technology
// keep /use-cases/*, which is where they were before this template existed;
// renaming would break the homepage list and any external link for no reader
// benefit. Pages built since take /industries/*.
// The page's furniture — the insight card's four headings and the two CTA
// labels — lives in industryChrome and is merged UNDER the page's own content,
// so a page overrides simply by saying so. Only the blocks that actually carry
// shared labels are merged; everything else is the page's alone.
const withChrome = (data) => ({
  ...data,
  insight: {
    ...industryChrome.insight,
    ...data.insight,
    actions: { ...industryChrome.insight.actions, ...data.insight.actions },
    implication: {
      ...industryChrome.insight.implication,
      ...data.insight.implication,
    },
    sources: { ...industryChrome.insight.sources, ...data.insight.sources },
    drafts: { ...industryChrome.insight.drafts, ...data.insight.drafts },
  },
  hero: {
    ctaPrimary: industryChrome.ctaPrimary,
    ctaSecondary: industryChrome.ctaSecondary,
    ...data.hero,
  },
  closing: {
    ctaPrimary: industryChrome.ctaPrimary,
    ctaSecondary: industryChrome.ctaSecondary,
    ...data.closing,
  },
});

const IndustryPage = ({ data }) => {
  useDocumentTitle(data.title);
  const { hero, sources, intro, insight, roles, features, closing } =
    withChrome(data);
  // Six go into three columns; four (or fewer) keep one row of their own.
  const featureCols = features.items.length % 3 === 0 ? 3 : 4;

  return (
    <div className="industry-page">
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
      <section className="section container industry-example">
        <div className="insight-wrap">
          <InsightCard {...insight} />
          <RoleBar {...roles} />
        </div>
      </section>

      {/* Divided by hairlines rather than boxed as cards — the sketch's shape.
          They are short and parallel, and bordered cards made one set look like
          several separate offers.

          The column count is computed here rather than left to CSS auto-fit,
          because the dividers have to know where a row begins: biotech has four
          capabilities and the later industries have six, and three columns suit
          six far better than four does. */}
      <section className="section container industry-capabilities">
        <SectionTitle title={features.heading} />
        <div
          className={`feature-row feature-row-${featureCols}`}
          style={{ "--feature-cols": featureCols }}
        >
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

      {/* THE SITE'S PANEL, not this page's own band. These pages closed on a
          full-bleed navy band with the copy left and the buttons right, which is
          how Manu's sketch drew it; drop_07 §1 replaces every page-specific
          closing container with one component — "reuse the standard box style
          already used on the Homepage / How It Works rather than creating
          page-specific CTA containers" — and §7 says the same again for these
          pages in particular. Same wrapper as Home and Industries, so the three
          are one layout rather than three that happen to match. */}
      <section className="section container home-closing">
        <CtaPanel
          as="h2"
          heading={closing.heading}
          paragraphs={closing.paragraphs}
          ctaLabel={closing.ctaPrimary}
          secondaryCtaLabel={closing.ctaSecondary}
        />
      </section>
    </div>
  );
};

export default IndustryPage;
