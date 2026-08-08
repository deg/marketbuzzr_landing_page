import React from "react";
import { ICON_PATHS } from "./CategoryIcon";
import { NOISE_BACK, NOISE_FRONT } from "./marketNoise";

// Homepage §3's visual, from Manu's drop_06 handoff —
// assets/worth-your-attention-animation.html in the design repo
// (~/Documents/marketbuzzr/marketbuzzr_landing_page_design/). It replaces
// market-signals.avif, an 86 KB pair of raster files saying the same thing:
// the market is loud, a few developments actually matter, and those are the
// ones that reach you.
//
// Second artwork on this page to become text after HeroAnimation, and the
// departures from his file are the SAME SIX, for the same reasons — read that
// component's header first, it is the longer explanation. What differs here:
//
//   1. NINE ICONS, NOT NINE EMOJI. Four of his are colour emoji (rocket,
//      classical building, speech balloon, handshake), drawn by the operating
//      system's own emoji font: Apple artwork on a Mac, licensed for Apple
//      devices and a visibly different picture on Windows and Android. The
//      other five are typographic characters standing in for icons he did not
//      have — a chess pawn for "New Market Entrant", ▣ for "Technology Shift",
//      ◈ for "Regulatory Change" — which say nothing at all. All nine come
//      from CategoryIcon instead, in his own accent colours.
//
//   4. THE NOISE FIELD IS GENERATED. 117 of his elements are three decorative
//      layers, and all six of their coordinate sequences are arithmetic walks
//      he unrolled. Fitted and checked against his output: every one of the 117
//      values below reproduces exactly.
//
//   5. THE TRAVELLING PULSES ARE offset-path, where his are SVG <animateMotion>.
//      Same finding as the hero: SMIL does not start on elements React inserts
//      after the document has loaded, so his nine pulses would sit parked on
//      their source cards forever. offset-path takes the SAME path string the
//      visible curve is drawn from — the `d` below feeds both — so the pulse
//      cannot drift from the line it travels. Verified against getPointAtLength
//      before the nine were built. Being CSS, it is also covered by the
//      reduced-motion rules, which markup animation never would have been.
//
//   6. REDUCED MOTION. Everything animated here has an explicit resting state,
//      because the blanket rule in styles.css leaves each element on its BASE
//      style rather than on a keyframe — measured, the three noise layers came
//      back at full opacity and the nine cards at the 0.42 that means "not
//      selected", so the loud half of the picture was the only half showing.
//      The nine pulses are hidden outright at that setting: parked at
//      offset-distance 0 they are nine bright dots stopped on the cards, and
//      they carry nothing the converging lines do not already show.
//
// Departures 2 (prefixed ids) and 3 (no plate) apply unchanged. Note the ids
// here include `title` and `desc`, which are his: an SVG inlined into a page
// shares that page's id namespace, and url(#…) resolves to the first match, so
// a collision renders quietly wrong rather than visibly broken.
//
// Sizes are viewBox units throughout, on his 1380x900 canvas.

// The nine developments that light up, in the order they do. `icon` and
// `iconTone` replace his emoji, in the fill he gave the emoji, so the colour
// scheme stays his. `lines` pairs each string with his own baseline rather than
// deriving one: his two-line cards sit 23-25 apart and 5-9 above the card's
// centre, close to a rule but not on one, and a formula that nearly reproduces
// his composition is worse than a table that does.
const SIGNALS = [
  {
    x: 100, y: 95, w: 205, h: 74, fill: "#0d1a3e", stroke: "#467de2",
    iconX: 132, icon: "rocket", iconTone: "#80c8ff",
    tx: 172, lines: [["Competitor", 123], ["Launch", 146]],
  },
  {
    x: 790, y: 88, w: 188, h: 68, fill: "#0d1a3e", stroke: "#6d7094",
    iconX: 820, icon: "bank", iconTone: "#e2e4f2",
    tx: 860, lines: [["FDA Update", 128]],
  },
  {
    x: 860, y: 178, w: 220, h: 76, fill: "#171148", stroke: "#7b3de6",
    iconX: 892, icon: "building", iconTone: "#e578ff",
    tx: 935, lines: [["New Market", 208], ["Entrant", 233]],
  },
  {
    x: 140, y: 245, w: 190, h: 72, fill: "#0d1a3e", stroke: "#606685",
    iconX: 170, icon: "trend", iconTone: "#e2e4f0",
    tx: 210, lines: [["Industry", 274], ["Trend", 298]],
  },
  // v11 corrects this card's alignment, which §3.2 names: the box grows from
  // 245x76 to 265x80 and moves 10 left and 2 up, the text drops to 16px and
  // starts 10 earlier at 548, and the second line moves a point down. "Customer
  // Sentiment" was the longest string on any card and was running into its own
  // right edge.
  {
    x: 475, y: 278, w: 265, h: 80, fill: "#123d2f", stroke: "#4ecb74",
    iconX: 507, icon: "message", iconTone: "#8ae887",
    tx: 548, size: 16, lines: [["Customer Sentiment", 310], ["Shift", 336]],
  },
  {
    x: 940, y: 324, w: 176, h: 70, fill: "#0f1938", stroke: "#696d8a",
    iconX: 970, icon: "coins", iconTone: "#eeeef4",
    tx: 1010, lines: [["Funding", 354], ["Round", 378]],
  },
  {
    x: 205, y: 410, w: 210, h: 74, fill: "#11183a", stroke: "#616783",
    iconX: 235, icon: "handshake", iconTone: "#f2f2f7",
    tx: 278, lines: [["New", 440], ["Partnership", 465]],
  },
  {
    x: 675, y: 420, w: 195, h: 74, fill: "#432015", stroke: "#e17b27",
    iconX: 705, icon: "chip", iconTone: "#ffb54d",
    tx: 748, lines: [["Technology", 450], ["Shift", 475]],
  },
  {
    x: 965, y: 492, w: 198, h: 74, fill: "#0f193a", stroke: "#357be5",
    iconX: 995, icon: "shield", iconTone: "#8ec8ff",
    tx: 1038, lines: [["Regulatory", 522], ["Change", 547]],
  },
  // v11's tenth card, and the only one whose icon Manu drew himself rather than
  // reaching for an emoji — two arrows changing places. It is `swap` in
  // CategoryIcon, drawn in this set's idiom rather than traced from his, which
  // is centred on its own origin at a different scale.
  //
  // LAST IN THIS ARRAY THOUGH SECOND IN HIS FILE, because the array index is
  // what picks the animation delay: his are one per second down the list and
  // this one is off the grid at 4.5s. Putting it second would shift the eight
  // cards after it onto each other's beats. Nothing overlaps, so the drawing
  // order it gives up carries no meaning.
  {
    x: 430, y: 92, w: 250, h: 74, fill: "#0d1a3e", stroke: "#58dce7",
    iconX: 462, icon: "swap", iconTone: "#58dce7",
    tx: 500, size: 16, lines: [["Competitor", 121], ["Repositioning", 145]],
  },
];

// Every card converges on the same point, (690,720). Card i's line and card i's
// travelling pulse share this string, so they cannot come apart.
const CONVERGE = [
  { d: "M200 169 C300 320,480 525,690 720", stroke: "#7651e7", width: 1.8, pulse: "#9c7bff", r: 6 },
  { d: "M885 156 C835 310,760 505,690 720", stroke: "#6383ef", width: 1.7, pulse: "#79a8ff", r: 6 },
  { d: "M970 254 C890 385,790 565,690 720", stroke: "#b24be7", width: 1.7, pulse: "#d875ff", r: 6 },
  { d: "M235 317 C350 440,520 610,690 720", stroke: "#4c69cb", width: 1.5, pulse: "#6d81d5", r: 6 },
  { d: "M608 358 C628 475,655 600,690 720", stroke: "#66c879", width: 2.0, pulse: "#79e08b", r: 7 },
  { d: "M1028 394 C925 490,810 625,690 720", stroke: "#8e6c9e", width: 1.5, pulse: "#9f7da8", r: 6 },
  { d: "M310 484 C420 565,560 650,690 720", stroke: "#5d6ac4", width: 1.5, pulse: "#6f7ed0", r: 6 },
  { d: "M772 494 C745 570,715 645,690 720", stroke: "#e58533", width: 1.7, pulse: "#ff9f47", r: 6 },
  { d: "M1064 566 C930 615,810 675,690 720", stroke: "#417fef", width: 1.7, pulse: "#5d9cff", r: 6 },
];

// The tenth card's line, kept out of CONVERGE because it is not one of the nine.
// It is drawn on its own in his file, at a lower opacity, and carries NO
// travelling pulse — he ships nine pulses for ten cards. It also stops short of
// the meeting point at (670,700) rather than reaching (690,720), so it runs
// behind the attention sphere instead of into its centre.
const CONVERGE_REPOSITIONING = {
  d: "M555 166 C565 330,610 500,670 700",
  stroke: "#58dce7",
  width: 2.2,
  opacity: 0.62,
};

// His three decorative layers. Same accumulator walk the hero's dot field uses:
// a coordinate steps by a constant and is pulled back by a period once it runs
// past a limit, which is why the field looks even without looking regular. Each
// limit sits mid-way through the window of values that reproduce his sequence,
// so none of the six is precarious.
const walk = (count, start, step, limit, period) => {
  let value = start;
  return Array.from({ length: count }, () => {
    const here = value;
    value += step;
    if (value > limit) value -= period;
    return here;
  });
};

const barY = walk(45, 82, 47, 619, 520);
const noiseBars = walk(45, 20, 83, 1289, 1280).map((x, i) => ({
  x,
  y: barY[i],
  w: 24 + 10 * (i % 5),
}));

const dotY = walk(38, 90, 59, 593, 530);
const noiseDots = walk(38, 22, 71, 1319, 1310).map((cx, i) => ({
  cx,
  cy: dotY[i],
  r: 1.8 + 0.8 * (i % 3),
}));

const chipY = walk(34, 105, 41, 613, 500);
const noiseChips = walk(34, 35, 97, 1248, 1260).map((x, i) => ({
  x,
  y: chipY[i],
  size: 3 + 2 * (i % 3),
}));

// One CategoryIcon's geometry, centred on a point and scaled off its 24-unit
// box — the same helper the hero uses, so the two artworks draw one icon set.
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

const ICON_SIZE = 26;

const WorthYourAttention = ({ title, description }) => (
  // .product-frame for the breakout sizing the rest of the page's artwork uses.
  // Its ground bleed stays off, since nothing sets --artwork-ground here: the
  // SVG's own radial already ends on the page background.
  <figure className="product-frame wya">
    <svg viewBox="0 0 1380 900" role="img" aria-labelledby="wya-title wya-desc">
      <title id="wya-title">{title}</title>
      <desc id="wya-desc">{description}</desc>

      <defs>
        {/* Outermost stop follows the page background rather than his #06112f,
            so the illustration dissolves into the page instead of ending at a
            rectangle. It comes from the stylesheet because a presentation
            attribute cannot read a custom property — see .artwork-fade. */}
        <radialGradient id="wya-bg" cx="50%" cy="72%" r="78%">
          <stop offset="0%" stopColor="#1c1252" />
          <stop offset="34%" stopColor="#0c1740" />
          <stop offset="100%" className="artwork-fade" />
        </radialGradient>

        {/* The endpoint's sphere, the hero's core gradients under another name —
            his attentionSphere/attentionEdge are centerSphere/centerEdge value
            for value, which is what makes the two visuals read as one system.
            They stay separate ids rather than being shared: the two components
            are independent transcriptions and neither should break if the other
            is replaced. */}
        <radialGradient id="wya-attention-sphere" cx="34%" cy="27%" r="82%">
          <stop offset="0%" stopColor="#1a3556" />
          <stop offset="38%" stopColor="#132b49" />
          <stop offset="72%" stopColor="#0e223d" />
          <stop offset="100%" stopColor="#0b1b34" />
        </radialGradient>
        <linearGradient id="wya-attention-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78dfe7" stopOpacity=".30" />
          <stop offset="52%" stopColor="#557287" stopOpacity=".20" />
          <stop offset="100%" stopColor="#8c73e8" stopOpacity=".12" />
        </linearGradient>

        <filter id="wya-card-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="wya-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="wya-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="9" stdDeviation="13" floodColor="#000" floodOpacity=".28" />
        </filter>
      </defs>

      <rect width="1380" height="900" fill="url(#wya-bg)" />

      {/* v11's two layers of grey market noise, drifting against each other.
          Carried as data rather than generated — see marketNoise.js for why. */}
      <g className="wya-market-noise-back" fill="#7d879a" aria-hidden="true">
        {NOISE_BACK.map(([x, y, w, h, o], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" opacity={o / 100} />
        ))}
      </g>
      <g className="wya-market-noise-front" fill="#7d879a" aria-hidden="true">
        {NOISE_FRONT.map(([x, y, w, h, o], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" opacity={o / 100} />
        ))}
      </g>

      {/* v11's centred headline, which replaces the small violet kicker that
          read EVERYTHING HAPPENING IN YOUR MARKET. §3.2 names it as part of the
          approved animation, and it is set as a heading rather than a label:
          22px/800 in near-white, with his accent rule and dot beneath its left
          edge. Same treatment as the hero's two framing lines.

          His file also defines a .heroCopyRight class and never uses it — this
          revision centres one line where the hero has two flanking ones. */}
      <g className="wya-header" fontFamily="Inter, Arial, sans-serif">
        <text x="690" y="39" textAnchor="middle" fontSize="22" fontWeight="800" fill="#f4f1ff">
          Your market moves. Know what deserves your attention.
        </text>
        <rect className="wya-header-glow" x="455" y="54" width="470" height="2" rx="1" fill="#8d6cff" filter="url(#wya-glow)" />
        <circle className="wya-header-glow" cx="455" cy="55" r="4" fill="#b69cff" filter="url(#wya-glow)" />
      </g>

      {/* Everything else the market is doing, at three drift speeds so it never
          settles into one rhythm. */}
      <g className="wya-noise-a" fill="#7780a9">
        {noiseBars.map((bar, i) => (
          <rect key={i} x={bar.x} y={bar.y} width={bar.w} height="10" rx="3" />
        ))}
      </g>

      <g className="wya-noise-b" fill="#5663c4">
        {noiseDots.map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} />
        ))}
      </g>

      <g className="wya-noise-c" fill="#8d5cff">
        {noiseChips.map((chip, i) => (
          <rect key={i} x={chip.x} y={chip.y} width={chip.size} height={chip.size} rx="1" />
        ))}
      </g>

      {/* The ten that turn out to matter, brightening one after another. Two
          carry their own type size, because his longest strings do. */}
      <g fontFamily="Inter, Arial, sans-serif" filter="url(#wya-shadow)">
        {SIGNALS.map((signal, i) => (
          <g className={`wya-signal wya-signal-${i + 1}`} key={signal.icon}>
            <rect
              x={signal.x}
              y={signal.y}
              width={signal.w}
              height={signal.h}
              rx="14"
              fill={signal.fill}
              stroke={signal.stroke}
            />
            <Icon
              name={signal.icon}
              cx={signal.iconX + ICON_SIZE / 2}
              cy={signal.y + signal.h / 2}
              size={ICON_SIZE}
              colour={signal.iconTone}
            />
            {signal.lines.map(([line, baseline]) => (
              <text
                key={line}
                x={signal.tx}
                y={baseline}
                fontSize={signal.size ?? 17}
                fontWeight="800"
                fill="#fff"
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </g>

      {/* Converging on one point. */}
      <g fill="none" filter="url(#wya-glow)">
        {CONVERGE.map((flow, i) => (
          <path key={i} className="wya-converge" d={flow.d} stroke={flow.stroke} strokeWidth={flow.width} />
        ))}
      </g>

      {/* The tenth card's line, on its own and with no pulse — see the constant. */}
      <path
        className="wya-converge"
        fill="none"
        d={CONVERGE_REPOSITIONING.d}
        stroke={CONVERGE_REPOSITIONING.stroke}
        strokeWidth={CONVERGE_REPOSITIONING.width}
        opacity={CONVERGE_REPOSITIONING.opacity}
      />

      {/* A pulse travelling each line, timed to its card lighting up. */}
      <g filter="url(#wya-glow)">
        {CONVERGE.map((flow, i) => (
          <circle
            key={i}
            className="wya-pulse"
            r={flow.r}
            fill={flow.pulse}
            // The visible curve's own `d`, so the two cannot drift apart.
            style={{ offsetPath: `path("${flow.d}")`, animationDelay: `${i}s` }}
          />
        ))}
      </g>

      {/* Where it lands. v11 makes this navy rather than purple, and it is the
          same lit sphere the hero's core became — his attentionSphere and
          attentionEdge gradients are the hero's centerSphere and centerEdge,
          value for value. The purple ellipse and its violet glow are gone, the
          oval tightens from 138x39 to 162x45, and the tick's ring moves 4 up
          and turns turquoise. §3.2 calls this "the approved navy Worth Your
          Attention oval/checkmark". */}
      <g className="wya-attention">
        <ellipse cx="690" cy="755" rx="205" ry="62" fill="#0a1730" opacity=".34" filter="url(#wya-glow)" />
        <ellipse cx="690" cy="755" rx="162" ry="45" fill="url(#wya-attention-sphere)" stroke="url(#wya-attention-edge)" strokeWidth="1.5" />
        <circle className="wya-check" cx="690" cy="720" r="22" fill="#0f2945" stroke="#72dfe8" strokeWidth="1.8" />
        <text x="690" y="728" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff">
          ✓
        </text>
        <text x="690" y="777" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="22" fontWeight="850" fill="#f4f8ff">
          Worth Your Attention
        </text>
      </g>
    </svg>
  </figure>
);

export default WorthYourAttention;
