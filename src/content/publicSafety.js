// Public Safety & Defense Technology, built from section 8 of Manu's August
// 2026 handover (drop_06_MarketBuzzr_CTO_Website_Handover_Aug2026.docx in the
// design repo). Unlike MedTech, Biotechnology and FinTech there is no approved
// HTML for this page — his handover package README says so outright — so it is
// built from the shared IndustryPage template and the copy the docx locks down.
//
// WHAT IS HIS, VERBATIM: the hero paragraph, the "See What Matters" paragraph
// and the six landscape category names. Everything else below was written here,
// because the template needs it and the docx does not supply it: the eyebrow,
// the headline's casing, the source chips, the whole worked insight example, the
// six category descriptions, the closer and the closing block. Those are listed
// as invented in updates_from_claude.md so he can correct any of them.
//
// THE HEADLINE IS SENTENCE CASE, and his docx writes it title case with a full
// stop: "Stay Ahead of the Changes Shaping Public Safety and Defense." The three
// approved pages all run sentence case and no full stop — FinTech ships "Stay
// ahead of the changes shaping financial services" — and section 1 of the same
// handover asks for one typographic system across the site. Casing is that
// system's business, so his words are kept and his capitals are not.
//
// THE INSIGHT EXAMPLE NAMES NOBODY, and that is the point of it. His constraint
// is "use a clearly fictional government program or procurement development. Do
// not name a real government, agency or procurement program." FinTech does this
// with an obviously invented company, PayNova, and Enterprise Technology is told
// to use TechCorp — but the equivalent move here, coining an agency or a program
// name, is the one thing that could go wrong, because an invented acronym can
// collide with a real program nobody here has heard of. So the example describes
// a procurement rather than naming one: no country, no agency, no program title.
// If he wants a named fictional program instead, it is a one-string change.
export const publicSafety = {
  slug: "public-safety",
  title:
    "Market Intelligence for Public Safety & Defense Technology — MarketBuzzr",

  hero: {
    kicker: "MARKETBUZZR FOR PUBLIC SAFETY & DEFENSE",
    title: "Stay ahead of the changes shaping public safety and defense",
    // One paragraph, his, word for word — the handover's rule for every industry
    // page: "Hero copy is one concise paragraph under the headline."
    sub: [
      "MarketBuzzr monitors competitors, procurement activity, regulation, emerging technologies, government priorities, partnerships and changing operational needs to identify what matters to your business and turn it into intelligence you can act on.",
    ],
  },

  // The seven chips are the seven things his hero paragraph lists, in the order
  // it lists them, shortened to chip length the way biotech's are.
  //
  // `mark` IS SET RATHER THAN LEFT OUT because HeroMark falls back to the helix,
  // which would put a DNA strand at the centre of a defense page. The shield is
  // drawn for this page; see components/HeroMark.jsx.
  sources: {
    mark: "shield",
    items: [
      { icon: "rocket", label: "Competitor moves" },
      { icon: "building", label: "Procurement activity" },
      { icon: "bank", label: "Regulation & policy" },
      { icon: "chip", label: "Emerging technologies" },
      { icon: "compass", label: "Government priorities" },
      { icon: "handshake", label: "Partnerships & M&A" },
      { icon: "shield", label: "Operational needs" },
    ],
  },

  intro: {
    // His own heading for this section on both MedTech and FinTech. Reused
    // rather than reinvented: it is the same section doing the same job, and a
    // third variation would read as three pages by three authors.
    heading: "See what matters. Understand what it means.",
    // One paragraph, his, word for word: "The 'See What Matters' section uses
    // one concise paragraph under the headline."
    paragraphs: [
      "MarketBuzzr brings together signals from across the public safety and defense ecosystem and evaluates them in the context of your company, products, competitors and priorities, so you can quickly understand what deserves attention and what to do next.",
    ],
  },

  insight: {
    tag: "Procurement development",
    // The date the other two industry pages carry. It is Manu's, and biotech's
    // module says in as many words not to quietly improve it; a fourth page
    // inventing its own would make the fleet inconsistent for no reader gain.
    detected: "May 2, 2025 • 9:42 AM",
    impact: "High impact",
    // Ends with a full stop, like MedTech's, FinTech's, Enterprise Technology's
    // and Other Industries'. Biotechnology's does not, and that one is Manu's
    // own wording from his sketch; the four that are not his agree.
    headline:
      "A national public safety agency opens its next generation communications program to competitive bid.",
    summary:
      "The published requirement covers radio, broadband and dispatch systems across regional response teams, and weights its evaluation criteria toward open standards and interoperability with equipment from other suppliers.",
    implication: {
      text: "Scoring an award on open standards favors suppliers who can already show their systems working alongside equipment they do not make. Companies whose integration story rests on a closed ecosystem may need a credible partner answer before the bid window closes.",
    },
    actions: {
      items: [
        "Assess whether our systems meet the interoperability criteria as written",
        "Compare how competing suppliers are likely to position their integration claims",
        "Identify partners who could close the gaps in our integration coverage",
      ],
    },
    sources: {
      items: [
        { icon: "bank", name: "Procurement notice", kind: "Official publication" },
        { icon: "article", name: "Industry publication", kind: "Market coverage" },
        { icon: "message", name: "Analyst commentary", kind: "Expert analysis" },
        { icon: "release", name: "Supplier announcement", kind: "Company communication" },
      ],
    },
    // FinTech's form rather than MedTech's "Draft ..." prefix, because the
    // heading above the strip already says "Turn Insight Into Action" and these
    // then read as the same four outputs the role bar below promises.
    drafts: {
      items: [
        "Executive Brief",
        "Board Talking Points",
        "Battlecard",
        "Talk Track",
      ],
    },
  },

  roles: {
    items: [
      { name: "Executive", outputs: "Executive Brief · Board Talking Points" },
      { name: "Marketing", outputs: "Blog Post · LinkedIn Post" },
      { name: "Sales", outputs: "Battlecard · Talk Track" },
    ],
  },

  features: {
    heading: "Stay ahead across the public safety and defense landscape",
    // The six category names are his, lowercased to the house style the other
    // industry pages use. The descriptions are not his and are not in the docx.
    items: [
      {
        icon: "building",
        heading: "Government & procurement",
        description:
          "Follow procurement activity, budget priorities, program announcements and funding decisions across the agencies and buyers your business depends on.",
      },
      {
        icon: "rocket",
        heading: "Competitors & products",
        description:
          "Track competitor launches, contract awards, capability claims and positioning changes across public safety and defense suppliers.",
      },
      {
        icon: "chip",
        heading: "Technology & innovation",
        description:
          "Spot developments in autonomy, sensing, communications, AI and the other technologies changing what agencies expect from a supplier.",
      },
      {
        icon: "bank",
        heading: "Regulation & policy",
        description:
          "Stay on top of standards, certification requirements, export rules and policy shifts affecting where and how your products can be sold.",
      },
      {
        icon: "handshake",
        heading: "Partnerships & M&A",
        description:
          "Stay informed about teaming arrangements, acquisitions and supplier partnerships that could reshape who you compete with and who you bid alongside.",
      },
      {
        icon: "trend",
        heading: "Market & operational needs",
        description:
          "Understand how the demands on responders and defense teams are changing, and what that means for the capabilities they set out to buy.",
      },
    ],
    closer:
      "MarketBuzzr helps your team stay on top of the developments that could shape your strategy, products and growth.",
  },

  closing: {
    heading: "Stay ahead of what's shaping your market",
    paragraphs: [
      "See what matters sooner, understand what it means for your business, and act while it still matters.",
    ],
  },
};
