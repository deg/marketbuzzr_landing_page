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

  // The hero's animation. One market development read four ways, which is the
  // same device How It Works step 02 uses and deliberately not the same panel:
  // his sequence here is SAME MARKET DEVELOPMENT -> the development ->
  // RECOMMENDATIONS TAILORED TO YOUR ROLE, with the reading changing underneath.
  roleTailoring: {
    brand: "MarketBuzzr",
    kicker: "Same market development",
    headline: "A competitor expands into a new enterprise segment",
    contextLabel: "Recommendations tailored to your role",
    roles: [
      {
        chip: "CEO & Leadership",
        label: "Strategic Opportunity",
        title: "Potential opening in an adjacent market",
        text: "Assess whether the move creates a new growth opportunity or changes competitive priorities.",
      },
      {
        chip: "Marketing",
        label: "Positioning Opportunity",
        title: "New angle for category positioning",
        text: "Review how the competitor is framing the market and where your messaging can differentiate.",
      },
      {
        chip: "Sales",
        label: "Competitive Talking Point",
        title: "Update enterprise sales messaging",
        text: "Prepare sales teams with a concise response to the competitor's new enterprise positioning.",
      },
      {
        chip: "Customer Success",
        label: "Expansion Opportunity",
        title: "New conversation with strategic accounts",
        text: "Identify customers that may benefit from a proactive discussion about changing market expectations.",
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
