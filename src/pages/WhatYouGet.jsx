import React from "react";
import { whatYouGet } from "../content/whatYouGet";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import CtaPanel from "../components/CtaPanel";
import RoleDashboard from "../components/RoleDashboard";
import SignalField from "../components/SignalField";
import IntelligenceToAction from "../components/IntelligenceToAction";

// THE HERO ANIMATION IS RoleDashboard SINCE drop_10 §5.1, which names
// assets/marketbuzzr-role-based-single-dashboard-animation-v4-light-right-column.html
// for it — How It Works step 02 until this drop. The two pages traded
// animations; step 02 took RoleTailoring (mbz-et8e.55.2). §5.1 keeps the hero
// copy and the copy-left/animation-right split exactly as they were.
//
// What You Get, from drop_07 §5. A new page, and the brief's own framing is
// that it should look like it was already here: "use the live website and
// existing component styles as the design source of truth". So the hero is
// PageHero with an aside, exactly as the industry pages do it; the role cards
// take the homepage category cards' surface and hover; and it closes on the
// site's one CtaPanel.
//
// FIVE SECTIONS AND TWO OF THEM ARE SPLITS, in opposite directions. §5.5 puts
// its visual right of the copy and §5.6 puts its visual LEFT — the only
// left-hand visual on the site, and §13's asset manifest states it twice, so it
// is deliberate rather than a transcription slip. `.wyg-split-reverse` is what
// swaps the order, and it swaps it back at the mobile breakpoint so the reading
// order stays copy-then-visual on a phone.
//
// Every section leads with an eyebrow, which is the one thing this page does
// that the homepage does not do throughout. §5 gives one per section by name.
const WhatYouGet = () => {
  useDocumentTitle(whatYouGet.title);
  const { hero, roleDashboard, roleCards, value, signals, action, finalCta } =
    whatYouGet;

  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        sub={hero.sub}
        aside={<RoleDashboard {...roleDashboard} />}
      />

      {/* §5.3 — four equal cards in ONE row on desktop, which the brief says
          twice: "display FOUR equal cards NEXT TO EACH OTHER in one row. Do not
          stack them vertically on desktop." */}
      <section className="section container">
        <p className="kicker">{roleCards.kicker}</p>
        <SectionTitle title={roleCards.title} lead={roleCards.lead} />
        <div className="wyg-role-grid">
          {roleCards.items.map((item) => (
            <article className="card wyg-role-card" key={item.name}>
              {/* The initials tile is his device, and it is why this page has no
                  icons: §5.3 asks for "a small rounded icon tile containing the
                  role initials: C, M, S, CS". Decorative — the name follows it
                  in full, so reading "C" aloud would only add noise. */}
              <span className="wyg-role-initials" aria-hidden="true">
                {item.initials}
              </span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* §5.4 — three equal cards whose body copy must start on the same line.
          The titles run to one, two and one line at desktop widths, so the
          alignment comes from a reserved title height rather than from luck. */}
      <section className="section container">
        <p className="kicker">{value.kicker}</p>
        <SectionTitle title={value.title} lead={value.lead} />
        <div className="wyg-value-grid">
          {value.items.map((item) => (
            <article className="card wyg-value-card" key={item.number}>
              <p className="wyg-value-number">{item.number}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* §5.5 — copy left, supplied visual right. */}
      <section className="section container container-wide wyg-split">
        <div className="wyg-split-copy">
          <p className="kicker">{signals.kicker}</p>
          <SectionTitle title={signals.title} lead={signals.lead} />
        </div>
        <SignalField {...signals.visual} />
      </section>

      {/* §5.6 — supplied visual LEFT, copy right. */}
      <section className="section container container-wide wyg-split wyg-split-reverse">
        <div className="wyg-split-copy">
          <p className="kicker">{action.kicker}</p>
          <SectionTitle title={action.title} lead={action.lead} />
        </div>
        <IntelligenceToAction {...action.visual} />
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

export default WhatYouGet;
