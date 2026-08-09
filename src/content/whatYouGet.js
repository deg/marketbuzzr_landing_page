// What You Get, a new page from drop_07 §5 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/).
//
// The brief opens this section by saying Claude has not seen the conceptual
// mockup and to "build this page from the instructions and supplied assets
// below. Use the live website and existing component styles as the design source
// of truth." So every part of it is an existing pattern with his copy in it: the
// hero is PageHero with an aside like the industry pages, the role cards take
// the homepage's category-card treatment, and it closes on the site's CtaPanel.
//
// COPY IS HIS, VERBATIM, INCLUDING CAPITALISATION. The industry pages normalise
// his title case to sentence case, because those nine have to read as one set
// and were built from a sketch rather than from locked copy. This page has no
// sibling to match and §5 supplies "approved copy" line by line, so it is left
// exactly as written.
//
// THREE SUPPLIED ASSETS, placed by §13's manifest: the role animation right of
// the hero, the All Signals visual right of its copy, and the Intelligence to
// Action visual LEFT of its copy. That last one is the only left-hand visual on
// the site and §13 states it twice.
export const whatYouGet = {
  title: "What You Get — MarketBuzzr",

  hero: {
    kicker: "WHAT YOU GET",
    title: "Intelligence Built Around Your Role and Goals.",
    sub: [
      "MarketBuzzr brings you the developments that matter to your business, explains what they mean for you and helps you turn them into action. Automatically delivered and personalized to your role, goals and priorities.",
    ],
  },

  // The hero's animation since drop_10 §5.1, which names
  // assets/marketbuzzr-role-based-single-dashboard-animation-v4-light-right-column.html
  // for it. That file built How It Works step 02 in drop_06, and the two pages
  // have traded animations (mbz-et8e.55.2). The hero copy and the split are
  // unchanged — §5.1 says to keep both.
  //
  // One dashboard, one role at a time, cycling — his brief is emphatic that no
  // two profiles appear side by side, which is what rules out reusing the
  // industry pages' RoleBar.
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

  // §5.3. Four cards side by side on desktop, each opening with a small rounded
  // tile carrying the role's initials — his device, and the reason this page has
  // no icons: initials are what he asks for.
  //
  // FOUR ROLES HERE AND THREE ON THE INDUSTRY PAGES' role bar. That is not an
  // oversight in either place; it is worth putting to him, since How It Works
  // also cycles four (mbz-et8e.28).
  roleCards: {
    kicker: "BUILT AROUND EACH READER",
    title: "Different Roles. Different Priorities.",
    lead: "MarketBuzzr evaluates developments against each reader's role, goals and business context, so everyone gets intelligence relevant to the decisions they make.",
    items: [
      {
        initials: "C",
        name: "CEO & Leadership",
        description:
          "Strategic developments, growth opportunities, risks, competitive moves and insights for leadership and board discussions.",
      },
      {
        initials: "M",
        name: "Marketing",
        description:
          "Market trends, competitor messaging, positioning changes, thought leadership opportunities and content ideas.",
      },
      {
        initials: "S",
        name: "Sales",
        description:
          "Competitive intelligence, messaging shifts, growth opportunities, battlecards, talk tracks and outreach ideas.",
      },
      {
        initials: "CS",
        name: "Customer Success",
        description:
          "Competitive trends, changing customer expectations, account risks, expansion opportunities and insights for proactive customer conversations.",
      },
    ],
  },

  // §5.4. The numbers are copy, not derived from position, the same call
  // content/howItWorks.js makes for its three steps.
  value: {
    kicker: "THE VALUE",
    title: "From Market Noise to Business Impact.",
    lead: "MarketBuzzr does more than collect information. It helps you focus on what deserves attention, understand why it matters and move from insight to action.",
    items: [
      {
        number: "01",
        title: "Stay Focused on What Matters",
        description:
          "MarketBuzzr follows the companies, sources and conversations shaping your market and surfaces the developments most relevant to your business and priorities.",
      },
      {
        number: "02",
        title: "Understand the Business Impact",
        description:
          "Every important development is interpreted in the context of your company, role and goals, helping you understand what changed and why it matters to you.",
      },
      {
        number: "03",
        title: "Turn Intelligence Into Action",
        description:
          "Strategic implications, recommended actions and ready to use drafts help your team move from knowing what happened to doing something about it.",
      },
    ],
  },

  // §5.5. Copy left, supplied visual right.
  signals: {
    kicker: "KNOW WHAT MATTERS",
    title: "All the Signals. Only What Matters to You.",
    lead: "MarketBuzzr follows the sources and conversations shaping your market, filters the noise and surfaces the developments most relevant to your business, goals and priorities.",
    visual: {
      centre: "Worth Your Attention",
      centreSub: "Relevant to your business",
      items: [
        "Competitors",
        "Industry News",
        "Regulation",
        "Research",
        "Partnerships",
        "Customer Trends",
      ],
      description:
        "Six kinds of market signal — competitors, industry news, regulation, research, partnerships and customer trends — surrounding a single centre marked Worth Your Attention, relevant to your business.",
    },
  },

  // §5.6. Supplied visual LEFT, copy right — the only section on the site that
  // runs that way, and §13's manifest says so twice.
  action: {
    kicker: "FROM INTELLIGENCE TO ACTION",
    title: "Know What to Do Next.",
    lead: "Knowing what happened is only the beginning. MarketBuzzr explains why a development matters to your business, identifies its strategic implications and recommends what to do next.",
    visual: {
      steps: [
        {
          label: "What Happened",
          text: "Competitor announces a new enterprise offering",
        },
        {
          label: "Why It Matters",
          text: "Could change customer expectations and competitive positioning",
        },
        {
          label: "Strategic Implication",
          text: "Enterprise differentiation may become increasingly important",
        },
        {
          label: "Recommended Action",
          text: "Review positioning and prepare a coordinated marketing and sales response",
        },
      ],
      outputs: [
        "Action Plan",
        "Talk Track",
        "Outreach",
        "Board Talking Points",
        "Content Draft",
      ],
    },
  },

  finalCta: {
    title: "Set It Up Once. Stay Informed Automatically.",
    paragraphs: [
      "After one simple setup meeting, MarketBuzzr continuously monitors your market and delivers intelligence built around your company, your role and the goals that matter to your business. Stay informed automatically and see what MarketBuzzr finds for you.",
    ],
    ctaPrimary: "Try for Free",
    ctaSecondary: "Book a Demo",
  },
};
