// How It Works copy, from Manu's How It Works handoffs — drop_04 in the design
// repo (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/) for the page's
// shape, and drop_06 for the copy in it, which supersedes drop_04's.
//
// The page is deliberately Hero -> 01 -> 02 -> 03 -> CTA and nothing else. The
// brief is explicit that the simplicity is the point: no fourth step, no
// sources grid, no separate weekly-report section, no feature grid, no FAQ. If
// a later round wants to add a section here, check that document first.
//
// SUPERSEDED AGAIN by the August 2026 site handover, section 6, which is now the
// source for this page's copy: new one-paragraph bodies for all three steps, and
// three role profiles rather than four.
//
// The short line that used to sit under each headline is gone. It was ours, not
// his, and shipped with a visible flag asking whether it should stay; his
// handover answers by giving the same headline-plus-one-paragraph structure a
// second time with no such line (mbz-et8e.52.8).
//
// Brand is "MarketBuzzr" throughout — the brief's "Marketbuzzr" is deliberately
// not adopted (mbz-et8e.2), same call as the homepage.
//
// Emphasis is structural, not markup: the brief bolds each step's closing line,
// and that line lives in its own `closer` key rather than carrying ** or HTML.
//
// CTA labels follow THIS brief — primary "Try for Free", secondary "Book a
// Demo". That is the reverse of the homepage's order and wording ("Try It
// Free"), because the two pages were specified by different briefs. The
// divergence is a question for Manu (mbz-et8e.28 item 10), not something to
// settle by quietly editing one page to match the other.
export const howItWorks = {
  title: "How It Works — MarketBuzzr",

  hero: {
    eyebrow: "HOW IT WORKS",
    title: "From Market Signals to Strategic Action",
    // drop_07 §4.1 replaces the hero paragraph and then rules out putting the
    // old one back: "keep this hero concise. Do not add the older generic
    // monitoring paragraph beneath it." The line that was here was exactly that
    // paragraph, so it goes rather than moving down.
    //
    // The new one changes what the hero is about. The old one described what the
    // product watches; this one describes what the reader has to do to start,
    // which is one meeting.
    sub: [
      "Getting started is simple. In one online setup meeting, we learn about your company, market, competitors, role and goals. From there, MarketBuzzr runs automatically.",
    ],
    ctaPrimary: "Try for Free",
    ctaSecondary: "Book a Demo",
  },

  // One entry per step. `id` is the anchor the brief names in its suggested
  // markup; `number` is copy rather than derived from the index, because it is
  // the label the brief specifies and not an incidental position.
  //
  // `body` is drop_06's, verbatim. It replaces the two paragraphs each step
  // used to carry, and every one of them is one sentence.
  //
  // `visualAlt` applies to step 01 alone. It is a picture again (drop_10 §4.1),
  // so what it says has to be restated for anyone who cannot see it; steps 02
  // and 03 are drawn in HTML and their words are real text on the page.
  steps: [
    {
      id: "monitor-filter",
      number: "01",
      title: "Monitor Your Market. Filter the Noise.",
      body: "MarketBuzzr continuously monitors the sources shaping your market and evaluates every development against your company, products, competitors, goals, role and markets, so you see what deserves your attention.",
      visualAlt:
        "Market activity from competitors, industry news, regulation, podcasts, webinars and research is filtered through the reader's company, products, competitors, goals, role and markets to surface only relevant developments.",
      // drop_06: "There should be no additional copy below the section 01
      // visual." The line that was here, "Less noise. More signal. More time
      // for what matters.", is deleted rather than moved.
    },
    {
      id: "role-based-intelligence",
      number: "02",
      title: "Intelligence Shaped Around Your Role",
      body: "MarketBuzzr turns relevant developments into personalized insights, opportunities and recommendations based on each reader's priorities, so every role sees the intelligence most relevant to the decisions they make.",
      // Same instruction as 01. The line deleted here — "One market. Different
      // priorities. Intelligence built around each reader." — is not really
      // lost: his animation carries "Same market intelligence. Different
      // priorities for each role." as its own caption, so the thought moved
      // inside the visual. That is only fine because the visual is now HTML.
    },
    {
      id: "turn-intelligence-into-action",
      number: "03",
      title: "Turn Intelligence Into Action",
      body: "MarketBuzzr identifies what developments mean for your business, recommends next steps and helps turn intelligence into action plans, communications, sales enablement and content your team can use.",
      // The only closer that survives drop_06, which calls it out by name:
      // "This is the only one of the three sections that should retain copy
      // below the visual."
      closer:
        "No blank page. No generic prompt. Your draft starts with the market intelligence and business context already behind the insight.",
    },
  ],

  // PARKED, NOT LIVE. This is MonitorFilter's copy, and MonitorFilter is what
  // drop_10 §4.1 replaced with the raster it was built from. It says exactly
  // what 01-monitor-filter.png says, in the same three stages and with the same
  // labels: the market's sources, YOUR CONTEXT as the filter, three surfaced
  // developments. Kept because this page's step 01 has reversed twice in three
  // drops, and because rebuilding it from the picture a second time would be
  // the same work again (mbz-et8e.55.1).
  monitorFilter: {
    sourcesLabel: "Your market",
    sources: [
      { icon: "people", label: "Competitors" },
      { icon: "article", label: "Industry News" },
      { icon: "bank", label: "Regulation" },
      { icon: "video", label: "Podcasts / Webinars" },
      { icon: "summary", label: "Research" },
    ],
    context: {
      title: "YOUR CONTEXT",
      items: [
        { icon: "building", label: "Company" },
        { icon: "box", label: "Products" },
        { icon: "people", label: "Competitors" },
        { icon: "target", label: "Goals" },
        { icon: "person", label: "Role" },
        { icon: "globe", label: "Markets" },
      ],
    },
    // His three, with his three icons — a rocket, a balance and a lightbulb.
    // The balance becomes `shield`, which is this set's regulatory mark and is
    // already what the homepage animation uses for Regulatory Change.
    outputs: [
      { icon: "rocket", label: "Competitor Launch" },
      { icon: "shield", label: "Regulatory Change" },
      { icon: "idea", label: "Emerging Opportunity" },
    ],
  },

  // Step 02's visual. One dashboard, one role at a time, cycling — his brief is
  // emphatic that no two profiles appear side by side, which is what rules out
  // reusing the industry pages' RoleBar.
  //
  // `tone` names a token rather than a colour. His four roles are four hues and
  // that is a real device — the badge, the profile title, the card borders and
  // the progress dot all take the role's colour, so the whole panel changes
  // identity together. His literals are #7d58f6 / #2f7ee8 / #6aaf4b / #3ba9b4;
  // the site's four accents sit in the same hue order and are used instead, so
  // this introduces no new colour (the same rule the industry pages follow).
  roleDashboard: {
    kicker: "Role Based Intelligence",
    sub: "The same market, filtered for what matters to this role.",
    // Not a closer under the visual — this is inside it, and it is his. It is
    // also nearly the line drop_06 deletes from under the section.
    caption: {
      emphasis: "Same market intelligence.",
      rest: " Different priorities for each role.",
    },
    badgeLabel: "Prepared for:",
    roles: [
      {
        name: "Executive",
        profile: "CEO Profile",
        tone: "brand-3",
        cards: [
          {
            icon: "growth",
            tag: "GROWTH OPPORTUNITY",
            title: "Establish a niche in AI/ML medical device regulation",
            action: "Draft Action Plan",
          },
          {
            icon: "shield",
            tag: "STRATEGIC PRIORITY",
            title: "Prioritize neurotechnology and Imaging + SaaS",
            action: "Draft Internal Memo",
          },
          {
            icon: "message",
            tag: "BOARD DISCUSSION POINT",
            title: "Define our response to competitors' platform offerings",
            action: "Draft Board Talking Points",
          },
        ],
      },
      {
        name: "Marketing",
        profile: "Marketing Profile",
        tone: "brand-2",
        cards: [
          {
            icon: "idea",
            tag: "THOUGHT LEADERSHIP",
            title:
              "AI regulation readiness: what MedTech companies need to know",
            action: "Draft Article",
          },
          {
            icon: "target",
            tag: "CAMPAIGN IDEA",
            title: "AI regulation readiness campaign for MedTech innovators",
            action: "Draft Campaign",
          },
          {
            // His icon here is LinkedIn's "in" wordmark. That is someone
            // else's trademark, and drawing a lookalike is worse than not
            // drawing it — the label already says LinkedIn in words.
            icon: "threads",
            tag: "LINKEDIN POST",
            title: "3 AI regulation myths holding back MedTech innovation",
            action: "Draft LinkedIn Post",
          },
        ],
      },
      {
        name: "Sales",
        profile: "Sales Profile",
        tone: "positive",
        cards: [
          {
            // Crossed swords in his file. `target` is what the homepage
            // already uses for competitive intelligence.
            icon: "target",
            tag: "COMPETITIVE INSIGHT",
            title: "New entrant offering AI validation platform for SaMD",
            action: "Draft Battlecard",
          },
          {
            icon: "message",
            tag: "MESSAGING SHIFT",
            title: "Competitors lead with AI trust and safety",
            action: "Draft Talk Track",
          },
          {
            icon: "mail",
            tag: "NEW MARKET OPPORTUNITY",
            title: "Rising demand for AI regulatory readiness",
            action: "Draft Outreach Email",
          },
        ],
      },
    ],
  },

  // Step 03's visual: the "Draft from this idea" chooser, one format selected at
  // a time. `cycle` is the order the selection moves in, which is his README's
  // order and deliberately not the order the options are listed in.
  draftFromIdea: {
    title: "Draft from this idea",
    label: "FORMAT",
    ctaTemplate: "Draft {format}",
    footer: "One insight can become whatever work you need next.",
    options: [
      {
        icon: "checklist",
        name: "Action Plan",
        blurb: "Step by step plan to move forward",
      },
      {
        icon: "mail",
        name: "Outreach Email",
        blurb: "Email to reach out to prospects",
      },
      {
        icon: "message",
        name: "Talk Track",
        blurb: "Talking points for sales conversations",
      },
      {
        icon: "people",
        name: "Board Talking Points",
        blurb: "Key points for your board discussion",
      },
      {
        icon: "summary",
        name: "Executive Summary",
        blurb: "Top line summary for leadership",
      },
    ],
    cycle: [0, 2, 3, 1, 4],
  },

  finalCta: {
    title: "Stop Following the Market Manually.",
    paragraphs: [
      "Let MarketBuzzr monitor what's changing, surface what deserves your attention, and help you turn intelligence into action.",
    ],
    ctaPrimary: "Try for Free",
    ctaSecondary: "Book a Demo",
  },
};
