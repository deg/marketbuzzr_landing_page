// Other Industries, rewritten from drop_07 §12 in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/). That section
// replaces this page's copy wholesale, and it is the longest §12 has ever been:
// eyebrow, headline, hero paragraph, six right-side cards, a three-item block,
// two headed prose passages and a closing panel.
//
// ITS OLD HEADLINE IS NOW THE ENTRY PAGE'S. This page opened on "Your market is
// unique. Your intelligence should be too."; §6.1 gives that line to
// /industries and §12 gives this page "Your industry doesn't have to fit into a
// box." Both moved in the same round, so neither is lost.
//
// THE ONE STRUCTURAL ADDITION. §12 gives this page TWO headed prose passages
// where every other industry has one. "Intelligence that reflects your
// priorities" is the intro block and "From market developments to action" is
// `outro`, which IndustryPage renders only when a page supplies it. That keeps
// this page on the one template rather than forking a second component, which
// is what mbz-et8e.52.12 consolidated away.
//
// Superseded: section 8 of the August 2026 handover
// (drop_06_MarketBuzzr_CTO_Website_Handover_Aug2026.docx), which this was
// originally built from.
//
// This is the sixth industry destination, and section 7 puts it in the list in
// place of Life Sciences. It is the one page in the set that is not about an
// industry at all: it says MarketBuzzr works for a market that has no
// predefined category, which is why his brief also asks the entry page to
// "communicate that MarketBuzzr supports highly specialized and niche markets".
//
// HE SPECIFIES MORE OF THIS PAGE THAN OF ANY OTHER. Verbatim from the docx: the
// eyebrow, the headline, the hero paragraph, the "See What Matters" paragraph,
// the section headline, all six category names, the closing headline and the
// closing paragraph. Casing is the site's rather than his, for the reason set
// out in publicSafety.js.
//
// WHAT IS NOT IN THE DOCX, and had to be written here, is the worked insight
// example — and the reason there is none is presumably that an insight for "your
// industry" cannot be about any particular industry. The template needs one, so
// this page carries the most general form of the thing the product does: a
// competitor moving onto ground you already occupy. It names no company, for the
// same reason the Public Safety example names no agency, and here the omission
// is also the point — the page is about *your* market, so a made-up company from
// somebody else's would be the wrong illustration.
//
// Also written here: the seven source chips, the six category descriptions and
// the closing line under them. All listed as invented in updates_from_claude.md.
export const otherIndustries = {
  slug: "other-industries",
  // NOT "for Your Industry", which is the /industries entry page's title. Two
  // pages sharing a browser-tab title is confusing in a tab strip and worse in
  // search results, and "Your Industry" is the phrase that page has.
  title: "Market Intelligence for Niche and Specialized Markets — MarketBuzzr",

  hero: {
    kicker: "OTHER INDUSTRIES",
    title: "Your industry doesn't have to fit into a box",
    sub: [
      "Every market has its own dynamics. MarketBuzzr adapts to your company, your competitive landscape and your priorities, giving your team intelligence built around the market you actually operate in.",
    ],
  },

  // §12's six right-side cards, replacing the seven generic source chips this
  // page carried. His labels; his one-line descriptions are not rendered,
  // because a chip on this template is a label and giving one page a second
  // line would make it the odd one out among nine. Noted for him rather than
  // designed around.
  sources: {
    mark: "target",
    items: [
      { icon: "building", label: "Competitor moves" },
      { icon: "trend", label: "Market shifts" },
      { icon: "bank", label: "Regulatory developments" },
      { icon: "chip", label: "Technology & innovation" },
      { icon: "people", label: "Customer trends" },
      { icon: "handshake", label: "Partnerships & M&A" },
    ],
  },

  // §12's first headed passage, verbatim.
  intro: {
    heading: "Intelligence that reflects your priorities",
    // ONE PARAGRAPH, like the other eight. drop_10 §7 asks the intro block for
    // "ONE paragraph, not broken into separate lines/paragraph fragments" and
    // heads that section "apply globally", so this page's equivalent block
    // follows even though §7 names the other pages' heading. The `outro` below
    // keeps its two: it is a second headed passage that §12 gave this page
    // alone, not the block §7 is about (mbz-et8e.55.6).
    paragraphs: [
      "Whether you're operating in an established category, a specialized niche or a market that spans several industries, the intelligence you need is rarely generic. MarketBuzzr connects developments across your market and puts them in the context of your company and goals, helping your team understand what changed, why it matters and where it may require action.",
    ],
  },

  insight: {
    tag: "Competitor positioning",
    detected: "Jul 14, 2026 • 3:41 PM",
    impact: "High impact",
    headline:
      "A competitor repositions around a segment you already sell to and begins publishing against it.",
    summary:
      "A company in your category rewrote its site around a customer type you already serve and started producing content and events aimed at the same buyers.",
    implication: {
      text: "A competitor moving onto your ground changes which comparisons buyers make. If their language becomes the way the segment gets described, differentiating later costs more than answering now.",
    },
    actions: {
      items: [
        "Assess how far their new positioning overlaps the accounts we already serve",
        "Compare the claims they lead with against the ones our own material leads with",
        "Decide what to say to buyers who will now be hearing both",
      ],
    },
    sources: {
      items: [
        { icon: "release", name: "Company announcement", kind: "Official communication" },
        { icon: "article", name: "Industry publication", kind: "Market coverage" },
        { icon: "threads", name: "Community discussion", kind: "Practitioner signal" },
        { icon: "video", name: "Webinar coverage", kind: "Event content" },
      ],
    },
    drafts: {
      items: ["Blog Post", "LinkedIn Post", "Battlecard", "Talk Track"],
    },
  },

  roles: {
    items: [
      { name: "Executive", outputs: "Executive Brief · Board Talking Points" },
      { name: "Marketing", outputs: "Blog Post · LinkedIn Post" },
      { name: "Sales", outputs: "Battlecard · Talk Track" },
    ],
  },

  // §12's "Built around your market", three items where this page carried six.
  // His headings and his descriptions, so the six invented ones go -- that is
  // the last of this page's invented copy, which updates_from_claude.md logged.
  //
  // No closing line under them. §12 gives the block a heading and three items
  // and moves straight on, and IndustryPage renders that line only when a page
  // supplies one.
  features: {
    heading: "Built around your market",
    items: [
      {
        icon: "compass",
        heading: "Define what matters to you",
        description:
          "Tell us about your company, your market, your competitors and the priorities your team cares about. We use that context to build intelligence around your specific business.",
      },
      {
        icon: "globe",
        heading: "Track the right ecosystem",
        description:
          "MarketBuzzr follows relevant competitors, industry sources, regulatory developments, technologies and market activity across your ecosystem.",
      },
      {
        icon: "target",
        heading: "Surface what deserves attention",
        description:
          "Instead of adding more information to your plate, MarketBuzzr identifies the developments that could matter to your business and explains why.",
      },
    ],
  },

  // §12's second headed passage. The only page with one; see the header.
  outro: {
    heading: "From market developments to action",
    paragraphs: [
      "Stay informed about competitor moves, changing customer needs, regulatory developments, emerging technologies, partnerships, growth opportunities and other shifts relevant to your business.",
      "And when something deserves action, MarketBuzzr helps your team take the next step with actionable insights and ready-to-use drafts.",
    ],
  },

  closing: {
    heading: "Let's build intelligence around your market",
    paragraphs: [
      "Tell us what matters to your business and we'll show you what MarketBuzzr can find.",
    ],
  },
};
