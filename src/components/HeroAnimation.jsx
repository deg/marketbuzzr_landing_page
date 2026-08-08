import React from "react";
import { ICON_PATHS } from "./CategoryIcon";

// The homepage hero, from Manu's hero animation in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/). It arrived as
// drop_05_marketbuzzr-hero-animation-synced.html, was revised by drop_06 --
// which added only the two animated framing labels near the top -- and is now
// drop_07's marketbuzzr-hero-built-around-you-v5-static-center.html.
//
// WHAT v5 CHANGED, all of it in the middle of the picture: the orbit tightens
// from r240 to r175 and every context node moves in with it; the glowing purple
// disc carrying the M and the MARKETBUZZR wordmark becomes a lit navy sphere
// carrying the promise, "Built Around You"; and the white highlight that swept
// the orbit is gone. Nothing on the left or right of the canvas moved -- the
// noise field, the twelve inbound flows, the four insight cards and the framing
// copy are all as they were.
//
// It draws natively what used to be an 81 KB AVIF of exactly the same picture:
// the market's noise on the left, the reader's own context on an orbit around
// the core, and the insights that come out of it on the right. The point of the
// change is that the ~40 pieces of text in it are now text -- selectable,
// translatable, searchable, and readable by a screen reader -- where before they
// were pixels. This follows the industry pages (mbz-et8e.38/.39) in dropping the
// text-rich handoff images.
//
// FIVE DELIBERATE DEPARTURES from his file, all recorded in the outstanding-items
// memo. Everything else is a transcription, and his coordinates are kept exactly
// so the composition can be diffed against the original.
//
//   1. HIS ICONS ARE EMOJI, and ours are line icons from CategoryIcon. Three of
//      his nine -- target, rocket and classical building -- are colour emoji,
//      which means the operating system draws them from its own emoji font.
//      What he saw was Apple's artwork, which is licensed for Apple devices and
//      cannot be served from marketbuzzr.com; it would also be a different
//      picture on Windows and Android. The same finding is already in the memo
//      for the biotech helix. The other six are ordinary typographic characters
//      with no licence problem, but `#` for "your company" and a circle for
//      "your role" say nothing, so they go too. The raster this replaces used
//      drawn line icons in all nine places, so this is a return to what shipped
//      rather than a departure from the design.
//
//   2. IDS ARE PREFIXED. His are `bg`, `t`, `d`, `shadow`, `coreGrad`,
//      `orbitGrad`, `softGlow` and `nodeGlow`. An SVG inlined into a page shares
//      that page's id namespace, and four of those are generic enough to collide
//      with anything. `nodeGlow` is referenced from inside a @keyframes block, so
//      the prefix has to appear in the stylesheet as well as here.
//
//   3. THE PLATE IS GONE. His svg has `border-radius:24px` over a `#06112f`
//      ground, which is a panel sitting on a page. The site's artwork is drawn
//      on the site's own ground -- see ProductImage -- and at `#0b1230` against
//      his `#05102d` the difference shows as a visible rectangle. His radial
//      gradient stays, because the light it puts behind the core is doing real
//      compositional work; only its outermost stop moves, to the site's own
//      background, so the illustration fades out instead of ending.
//
//   4. THE NOISE FIELD IS GENERATED. 135 of his elements are a decorative dot
//      field, and they are an arithmetic sequence he unrolled: positions step by
//      a constant and wrap, sizes and colours cycle. The loops below reproduce
//      his coordinates exactly, and are checked against the original.
//
//   5. REDUCED MOTION IS HANDLED, which his file does nothing about. Most of it
//      falls out of the blanket rule in styles.css, but that rule pins every
//      animation to its last keyframe and `heroAnimOutReveal` ends at 20%
//      opacity, so the four insight cards would freeze almost invisible. There
//      is an explicit static state for them next to the keyframes.
//
// Sizes are viewBox units throughout, on his 1500x900 canvas.

// Text sits 28-30 units in from its pill's left edge in his file, varying per
// chip, so the offset is per chip rather than a constant. The baseline is a
// constant 30 below the pill.
const SOURCE_CHIPS = [
  // Drift group A
  [
    { x: 68, y: 84, w: 172, tx: 96, label: "Press Release", stroke: "#7250d8", fill: "#f2efff" },
    { x: 42, y: 146, w: 170, tx: 72, label: "Industry News", stroke: "#2f87df", fill: "#edf7ff" },
    { x: 88, y: 208, w: 164, tx: 116, label: "Industry Report", stroke: "#7056be", fill: "#f3efff" },
  ],
  // Drift group B
  [
    { x: 36, y: 272, w: 152, tx: 65, label: "Webinar", stroke: "#5d55a0", fill: "#f1efff" },
    { x: 98, y: 334, w: 165, tx: 128, label: "Earnings Call", stroke: "#3ad0c9", fill: "#eaffff" },
    { x: 28, y: 396, w: 154, tx: 58, label: "Blog Post", stroke: "#8254b5", fill: "#f5edff" },
  ],
  // Drift group C
  [
    { x: 92, y: 458, w: 158, tx: 120, label: "Newsletter", stroke: "#d25bb5", fill: "#ffeafd" },
    { x: 26, y: 520, w: 184, tx: 54, label: "YouTube Discussions", stroke: "#e86558", fill: "#fff0ed" },
    { x: 90, y: 582, w: 174, tx: 118, label: "Reddit Community", stroke: "#f06c3a", fill: "#fff0ea" },
  ],
  // Drift group A again
  [
    { x: 34, y: 644, w: 170, tx: 64, label: "Research Paper", stroke: "#ad52aa", fill: "#f9edff" },
    { x: 104, y: 706, w: 132, tx: 132, label: "Podcast", stroke: "#7957c4", fill: "#f2edff" },
    { x: 52, y: 768, w: 186, tx: 82, label: "Regulatory Update", stroke: "#2bbcc5", fill: "#eaffff" },
  ],
];

const DRIFT_CLASSES = ["hero-anim-drift-a", "hero-anim-drift-b", "hero-anim-drift-c", "hero-anim-drift-a"];

// The twelve streams running from the noise into the core, and the four running
// out of it. `slow` is his second dash speed.
const INBOUND_FLOWS = [
  { d: "M210 108 C350 135,470 250,610 376", stroke: "#7d5cff", width: 2.4 },
  { d: "M212 170 C360 205,470 285,615 390", stroke: "#3c8cff", width: 2.0, slow: true },
  { d: "M252 232 C390 255,500 320,620 402", stroke: "#8f59ff", width: 2.2 },
  { d: "M188 296 C360 315,490 350,620 414", stroke: "#43c9ff", width: 2.1, slow: true },
  { d: "M263 358 C390 365,505 380,620 425", stroke: "#35d6ff", width: 2.2 },
  { d: "M182 420 C370 420,495 418,620 438", stroke: "#a95eff", width: 2.0, slow: true },
  { d: "M250 482 C390 472,500 455,620 448", stroke: "#df5abe", width: 2.2 },
  { d: "M210 544 C370 520,500 485,620 458", stroke: "#ff8d47", width: 2.0, slow: true },
  { d: "M264 606 C390 565,505 515,625 468", stroke: "#ef6848", width: 2.1 },
  { d: "M204 668 C360 615,500 555,625 478", stroke: "#a45fff", width: 2.0, slow: true },
  { d: "M236 730 C390 655,510 590,630 490", stroke: "#7f63ef", width: 2.0 },
  { d: "M238 792 C390 710,520 625,632 502", stroke: "#2bd1d8", width: 2.0, slow: true },
];

const OUTBOUND_FLOWS = [
  { d: "M858 397 C980 325,1060 195,1160 176", stroke: "#805cff", width: 3.3 },
  { d: "M862 426 C990 408,1060 360,1160 350", stroke: "#2ad8ec", width: 3.1, slow: true },
  { d: "M862 458 C990 480,1060 515,1160 518", stroke: "#3e86ff", width: 3.2 },
  { d: "M852 488 C975 548,1060 650,1160 688", stroke: "#e65bbe", width: 3.2, slow: true },
];

// The reader's own context, spaced around one orbit starting at the top and
// running clockwise. Two labels sit out to the side rather than under their node
// because at those positions the orbit runs through the text.
//
// PULLED IN WITH THE ORBIT for drop_07's v5 hero. Every node moves, because the
// circle they sit on went from r240 to r175; these are his coordinates, not a
// recomputation from the new radius. The offset from node to label is unchanged
// in each case, so the two side labels still clear the ring the same way.
const CONTEXT_NODES = [
  { cx: 760, cy: 265, fill: "#111a49", stroke: "#9a77ff", tone: "#b59cff", icon: "building", label: "YOUR COMPANY", lx: 760, ly: 213, labelTone: "#b38cff" },
  { cx: 926, cy: 386, fill: "#0f2047", stroke: "#3c91f3", tone: "#72baff", icon: "target", label: "YOUR GOALS", lx: 974, ly: 430, labelTone: "#61a9ff" },
  { cx: 863, cy: 582, fill: "#121947", stroke: "#8b6bff", tone: "#b29cff", icon: "globe", label: "YOUR MARKETS", lx: 863, ly: 636, labelTone: "#b29cff" },
  { cx: 657, cy: 582, fill: "#25133d", stroke: "#e85cb9", tone: "#ff7fd3", icon: "person", label: "YOUR ROLE", lx: 657, ly: 636, labelTone: "#ff7fd3" },
  { cx: 594, cy: 386, fill: "#0f2940", stroke: "#2ad2d8", tone: "#58e2e8", icon: "people", label: "YOUR COMPETITORS", lx: 546, ly: 430, labelTone: "#58e2e8" },
];

// Four insight cards, evenly stacked 176 apart. Everything inside a card is a
// fixed offset from its top edge, so only `y` differs between them.
const INSIGHT_CARDS = [
  {
    y: 90, fill: "#0c173d", stroke: "#7553e4", disc: "#241264", tone: "#ac88ff", icon: "rocket", iconTone: "#ffffff",
    kicker: "COMPETITOR LAUNCH", lines: ["Competitor moves into", "AI-enabled monitoring"],
    chipFill: "#151b49", chipStroke: "#7653e6", chipTone: "#d9ccff",
    chips: [{ x: 1165, w: 124, label: "Draft Battlecard" }, { x: 1297, w: 137, label: "Draft LinkedIn Post" }],
  },
  {
    y: 266, fill: "#0b173a", stroke: "#19bdd4", disc: "#0d4862", tone: "#48e4ef", icon: "bank", iconTone: "#e5feff",
    kicker: "REGULATORY CHANGE", lines: ["New framework creates", "market opportunity"],
    chipFill: "#102141", chipStroke: "#19bdd4", chipTone: "#cbfbff",
    chips: [{ x: 1165, w: 126, label: "Draft Action Plan" }, { x: 1299, w: 134, label: "Draft Internal Update" }],
  },
  {
    y: 442, fill: "#0b173a", stroke: "#3b72f0", disc: "#10316e", tone: "#5aabff", icon: "trend", iconTone: "#e2edff",
    kicker: "GROWTH OPPORTUNITY", lines: ["New segment shows", "accelerating demand"],
    chipFill: "#10214a", chipStroke: "#3b72f0", chipTone: "#dbe8ff",
    chips: [{ x: 1165, w: 126, label: "Draft Action Plan" }, { x: 1299, w: 134, label: "Board Talking Points" }],
  },
  {
    y: 618, fill: "#0b173a", stroke: "#d24eac", disc: "#5a174d", tone: "#ff78d4", icon: "people", iconTone: "#ffdcf4",
    kicker: "CONSUMER TREND", lines: ["Demand shifting toward", "personalized solutions"],
    chipFill: "#30133b", chipStroke: "#d24eac", chipTone: "#ffd7f0",
    chips: [{ x: 1165, w: 124, label: "Draft Blog Post" }, { x: 1297, w: 137, label: "Draft LinkedIn Post" }],
  },
];

// His decorative dot field, unrolled in the original into 80 circles and 55
// squares. Both walk a constant step and wrap when they run off the field, which
// is why it looks even without looking regular; sizes and colours cycle on their
// own periods, so no two neighbours match.
//
// The wrap is an accumulator rather than a modulus, and the difference is
// visible: he lets a coordinate overshoot the field slightly before pulling it
// back, so the sequence does not restart where `% 470` would put it. A modulus
// was tried first and misplaced 7 of the 135. The limits below were fitted to
// his output and reproduce all four of his sequences exactly, every value; each
// sits inside a window of about eight units that does the same, so they are not
// as precarious as the precision suggests.
const DOT_COLOURS = ["#7257ff", "#2bcfff", "#ec5fc7", "#ff8a45", "#4f7eff"];
const SQUARE_COLOURS = ["#4b69df", "#8a65ff", "#2ed3e9", "#df5ab6"];
const FIELD = { xLimit: 478, xPeriod: 470, yLimit: 834, yPeriod: 790 };

const walk = (count, start, step, limit, period) => {
  let value = start;
  return Array.from({ length: count }, () => {
    const here = value;
    value += step;
    if (value > limit) value -= period;
    return here;
  });
};

const dotX = walk(80, 10, 43, FIELD.xLimit, FIELD.xPeriod);
const dotY = walk(80, 45, 59, FIELD.yLimit, FIELD.yPeriod);
const squareX = walk(55, 12, 61, FIELD.xLimit, FIELD.xPeriod);
const squareY = walk(55, 55, 37, FIELD.yLimit, FIELD.yPeriod);

const dots = dotX.map((cx, i) => ({
  cx,
  cy: dotY[i],
  r: 1.5 + 0.8 * (i % 4),
  fill: DOT_COLOURS[i % DOT_COLOURS.length],
}));

const squares = squareX.map((x, i) => ({
  x,
  y: squareY[i],
  size: 3 + 2 * (i % 3),
  fill: SQUARE_COLOURS[i % SQUARE_COLOURS.length],
}));

// One CategoryIcon's geometry, centred on a point and scaled off its 24-unit
// box. Stroke width scales with it, which is what keeps the nine icons looking
// like one set at two different sizes.
const Icon = ({ name, cx, cy, size, colour }) => (
  <g
    transform={`translate(${cx - size / 2} ${cy - size / 2}) scale(${size / 24})`}
    fill="none"
    stroke={colour}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {ICON_PATHS[name]}
  </g>
);

const HeroAnimation = ({ title, description }) => (
    // .product-frame for the breakout sizing the other artwork uses; the ground
    // bleed it also carries stays off, since nothing sets --artwork-ground here.
    <figure className="product-frame hero-anim">
      <svg
        viewBox="0 0 1500 900"
        role="img"
        aria-labelledby="hero-anim-title hero-anim-desc"
      >
        <title id="hero-anim-title">{title}</title>
        <desc id="hero-anim-desc">{description}</desc>

        <defs>
          {/* Outermost stop is the site's own background rather than his
              #05102d, so the illustration fades into the page instead of
              ending at a rectangle. It has to come from the stylesheet because
              a presentation attribute cannot read a custom property. Shared with
              WorthYourAttention, which does the same. */}
          <radialGradient id="hero-anim-bg" cx="52%" cy="51%" r="70%">
            <stop offset="0%" stopColor="#17245f" />
            <stop offset="42%" stopColor="#0a163d" />
            <stop offset="100%" className="artwork-fade" />
          </radialGradient>
          {/* The core's two gradients, from drop_07's v5 hero. The radial is
              off-centre at 34%/27%, which is what makes a flat disc read as a
              lit sphere; the linear runs turquoise to purple along its edge at
              low opacity, so the rim picks up both accents without either
              becoming a second light source. His purple-to-black coreGrad went
              with the glowing core it filled — and is unreferenced in his own
              v5 file too, not just here. */}
          <radialGradient id="hero-anim-core-sphere" cx="34%" cy="27%" r="82%">
            <stop offset="0%" stopColor="#1a3556" />
            <stop offset="38%" stopColor="#132b49" />
            <stop offset="72%" stopColor="#0e223d" />
            <stop offset="100%" stopColor="#0b1b34" />
          </radialGradient>
          <linearGradient id="hero-anim-core-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#78dfe7" stopOpacity=".30" />
            <stop offset="52%" stopColor="#557287" stopOpacity=".20" />
            <stop offset="100%" stopColor="#8c73e8" stopOpacity=".12" />
          </linearGradient>
          <filter id="hero-anim-node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hero-anim-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="11" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hero-anim-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000" floodOpacity=".28" />
          </filter>
          <linearGradient id="hero-anim-orbit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8d5cff" />
            <stop offset="25%" stopColor="#2ddcff" />
            <stop offset="52%" stopColor="#4f85ff" />
            <stop offset="75%" stopColor="#e55bc4" />
            <stop offset="100%" stopColor="#8d5cff" />
          </linearGradient>
        </defs>

        <rect width="1500" height="900" fill="url(#hero-anim-bg)" />

        {/* The framing copy drop_06 adds — the one thing in that revision's
            hero file that is not already here. His prose calls it "positioned
            above the visual"; his FILE puts it inside this viewBox at y=39,
            over the two things it names, and the file is the artifact he
            approved. Each label gets an accent rule and a dot at the end the
            eye should travel toward: the left one starts at its dot and runs
            outward into the noise, the right one ends at its dot above the
            first insight card.

            Manu's copy, so by the repo's usual rule it would live in
            content/home.js — but it is at fixed coordinates inside a
            transcription whose other forty strings are already here, and
            splitting two of forty out would make the artwork harder to diff
            against his file, not easier. */}
        <g className="hero-anim-copy hero-anim-copy-left" fontFamily="Inter, Arial, sans-serif">
          <text x="70" y="39" fill="#f4f1ff" fontSize="22" fontWeight="800">
            Tracking everything in your market
          </text>
          <rect className="hero-anim-copy-glow" x="70" y="54" width="275" height="2" rx="1" fill="#8d6cff" filter="url(#hero-anim-soft-glow)" />
          <circle className="hero-anim-copy-glow" cx="70" cy="55" r="4" fill="#b69cff" filter="url(#hero-anim-soft-glow)" />
        </g>
        <g className="hero-anim-copy hero-anim-copy-right" fontFamily="Inter, Arial, sans-serif">
          <text x="1135" y="39" fill="#f4f1ff" fontSize="22" fontWeight="800">
            Surfacing what matters to you
          </text>
          <rect className="hero-anim-copy-glow" x="1135" y="54" width="285" height="2" rx="1" fill="#4d91ff" filter="url(#hero-anim-soft-glow)" />
          <circle className="hero-anim-copy-glow" cx="1420" cy="55" r="4" fill="#61d8ff" filter="url(#hero-anim-soft-glow)" />
        </g>

        {/* The market's noise: what is being said, everywhere, all the time. */}
        <g fontFamily="Inter, Arial, sans-serif" filter="url(#hero-anim-shadow)">
          {SOURCE_CHIPS.map((group, g) => (
            <g className={DRIFT_CLASSES[g]} key={g}>
              {group.map((chip) => (
                <g key={chip.label}>
                  <rect x={chip.x} y={chip.y} width={chip.w} height="48" rx="10" fill="#0c173b" stroke={chip.stroke} />
                  <text x={chip.tx} y={chip.y + 30} fill={chip.fill} fontSize="14" fontWeight="700">
                    {chip.label}
                  </text>
                </g>
              ))}
            </g>
          ))}
        </g>

        <g opacity=".75">
          {dots.map((dot, i) => (
            <circle className="hero-anim-drift-a" key={`d${i}`} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.fill} />
          ))}
          {squares.map((square, i) => (
            <rect
              className="hero-anim-drift-b"
              key={`s${i}`}
              x={square.x}
              y={square.y}
              width={square.size}
              height={square.size}
              rx="1"
              fill={square.fill}
            />
          ))}
        </g>

        {/* Everything the market says, arriving. */}
        <g fill="none" strokeLinecap="round">
          {INBOUND_FLOWS.map((flow, i) => (
            <path
              key={i}
              className={flow.slow ? "hero-anim-flow hero-anim-flow-slow" : "hero-anim-flow"}
              d={flow.d}
              stroke={flow.stroke}
              strokeWidth={flow.width}
            />
          ))}
        </g>

        {/* The orbit the reader's own context sits on. Tighter and quieter than
            drop_06's: r175 rather than r240, and both strokes stepped down in
            weight and opacity, which is drop_07 §3.1's "tighter outer orbit". */}
        <circle cx="760" cy="440" r="175" fill="none" stroke="#536783" strokeWidth="1.2" opacity=".34" />
        <circle
          cx="760"
          cy="440"
          r="175"
          fill="none"
          stroke="url(#hero-anim-orbit)"
          strokeWidth="1.8"
          opacity=".56"
          strokeDasharray="2 8"
        />

        <g fontFamily="Inter, Arial, sans-serif">
          {CONTEXT_NODES.map((node, i) => (
            <g className={`hero-anim-node hero-anim-node-${i + 1}`} key={node.label}>
              <circle cx={node.cx} cy={node.cy} r="36" fill={node.fill} stroke={node.stroke} strokeWidth="1.8" />
              <Icon name={node.icon} cx={node.cx} cy={node.cy} size={34} colour={node.tone} />
              <text x={node.lx} y={node.ly} textAnchor="middle" fontSize="13" fontWeight="850" fill={node.labelTone}>
                {node.label}
              </text>
            </g>
          ))}
        </g>

        {/* The core. It was the MarketBuzzr wordmark inside a glowing purple
            disc; drop_07 §3.1 makes it a plain lit sphere carrying the promise
            instead, "Built Around You" — the M and the wordmark are gone, and so
            are the outer glow ring and the soft-glow filter that lit both.

            NO PULSE, AND HIS OWN FILE STILL PULSES. §3.1 lists five properties
            of the approved asset; four are in the file (the centre copy, the
            static sphere, no rotating white ball, the tighter orbit) and "no
            pulse" is not — it keeps a .pulseCore class and a 2.8s scale
            animation on this group. Reading that as a leftover rather than an
            instruction, because he names it in a list of things he says the
            asset already does. Raised in the outstanding-items memo; one line
            either way if he says otherwise. */}
        <g>
          <circle
            cx="760"
            cy="440"
            r="88"
            fill="url(#hero-anim-core-sphere)"
            stroke="url(#hero-anim-core-edge)"
            strokeWidth="1.5"
          />
          <text x="760" y="434" textAnchor="middle" fontSize="18" fontWeight="700" fill="#f4f8ff">
            Built Around
          </text>
          <text x="760" y="458" textAnchor="middle" fontSize="18" fontWeight="700" fill="#72dfe8">
            You
          </text>
        </g>

        <g fill="none" strokeLinecap="round" filter="url(#hero-anim-soft-glow)">
          {OUTBOUND_FLOWS.map((flow, i) => (
            <path
              key={i}
              className={flow.slow ? "hero-anim-flow hero-anim-flow-slow" : "hero-anim-flow"}
              d={flow.d}
              stroke={flow.stroke}
              strokeWidth={flow.width}
            />
          ))}
        </g>

        {/* What comes out: an insight, and the drafts that act on it. */}
        <g fontFamily="Inter, Arial, sans-serif" filter="url(#hero-anim-shadow)">
          {INSIGHT_CARDS.map((card, i) => (
            <g className={`hero-anim-output hero-anim-output-${i + 1}`} key={card.kicker}>
              <rect x="1135" y={card.y} width="325" height="148" rx="20" fill={card.fill} stroke={card.stroke} />
              <circle cx="1190" cy={card.y + 54} r="31" fill={card.disc} />
              <Icon name={card.icon} cx={1190} cy={card.y + 54} size={30} colour={card.iconTone} />
              <text x="1234" y={card.y + 37} fontSize="13" fontWeight="900" fill={card.tone}>
                {card.kicker}
              </text>
              {card.lines.map((line, l) => (
                <text key={l} x="1234" y={card.y + 66 + l * 23} fontSize="16" fill="#fff">
                  {line}
                </text>
              ))}
              {card.chips.map((chip) => (
                <g key={chip.label}>
                  <rect x={chip.x} y={card.y + 109} width={chip.w} height="26" rx="7" fill={card.chipFill} stroke={card.chipStroke} />
                  <text
                    // Floored, not rounded, because his two odd-width chips are.
                    x={Math.floor(chip.x + chip.w / 2)}
                    y={card.y + 127}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="750"
                    fill={card.chipTone}
                  >
                    {chip.label}
                  </text>
                </g>
              ))}
            </g>
          ))}
        </g>
      </svg>
    </figure>
  );

export default HeroAnimation;
