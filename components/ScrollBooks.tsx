import type { CSSProperties } from "react";

/**
 * The scroll cue: a column of open books spelling SCROLL, one letter per
 * spread, each volume smaller than the one above it. Reading runs downward and
 * the stack tapers as it goes, so the whole thing points down the page; a dip
 * travels down the column to make the direction explicit.
 */

type Tone = "ink" | "sage" | "coral" | "peri";

const BOOKS: Array<{ letter: string; tone: Tone }> = [
  { letter: "S", tone: "ink" },
  { letter: "C", tone: "sage" },
  { letter: "R", tone: "coral" },
  { letter: "O", tone: "peri" },
  { letter: "L", tone: "ink" },
  { letter: "L", tone: "sage" },
];

/**
 * An open spread, drawn wide and fanned hard toward the gutter — the sag is
 * deep enough that the top and bottom edges alone read as a V, so the shelf
 * doubles as a downward arrow. Drawn as two halves — split from the same
 * curves at the gutter — so the right-hand page can be shaded and sell the
 * fold.
 */
const VIEW_W = 150;
const EDGE_X = 6;
const RIGHT_X = VIEW_W - EDGE_X;
const GUTTER_X = VIEW_W / 2;
const EDGE_TOP_Y = 4;
const PAGE_H = 28;
const EDGE_BOT_Y = EDGE_TOP_Y + PAGE_H;
/** How hard the pages fan open — bigger sags the gutter deeper, sharpening the V. */
const DIP = 18;
const TOP_TROUGH = EDGE_TOP_Y + DIP;
const BOT_TROUGH = EDGE_BOT_Y + DIP;
const TOP_CTRL = 2 * TOP_TROUGH - EDGE_TOP_Y;
const BOT_CTRL = 2 * BOT_TROUGH - EDGE_BOT_Y;
const BLOCK_OFFSET = 4;
const VIEW_H = BOT_TROUGH + BLOCK_OFFSET + 6;
const MID_L = (EDGE_X + GUTTER_X) / 2;
const MID_R = (GUTTER_X + RIGHT_X) / 2;
const LETTER_Y = 28.3;

const SPREAD = `M${EDGE_X} ${EDGE_TOP_Y} Q${GUTTER_X} ${TOP_CTRL} ${RIGHT_X} ${EDGE_TOP_Y} L${RIGHT_X} ${EDGE_BOT_Y} Q${GUTTER_X} ${BOT_CTRL} ${EDGE_X} ${EDGE_BOT_Y} Z`;
const PAGE_L = `M${EDGE_X} ${EDGE_TOP_Y} Q${MID_L} ${TOP_TROUGH} ${GUTTER_X} ${TOP_TROUGH} L${GUTTER_X} ${BOT_TROUGH} Q${MID_L} ${BOT_TROUGH} ${EDGE_X} ${EDGE_BOT_Y} Z`;
const PAGE_R = `M${GUTTER_X} ${TOP_TROUGH} Q${MID_R} ${TOP_TROUGH} ${RIGHT_X} ${EDGE_TOP_Y} L${RIGHT_X} ${EDGE_BOT_Y} Q${MID_R} ${BOT_TROUGH} ${GUTTER_X} ${BOT_TROUGH} Z`;
const GUTTER_LINE = `M${GUTTER_X} ${TOP_TROUGH} V${BOT_TROUGH}`;
const RULES = "M87 28.3 L131 21.7 M87 33.9 L131 27.3 M87 39.5 L131 32.9";

/** Widest volume, in px, and the ratio each next one shrinks by — a faster
    taper keeps the stack short even at a wide starting size. */
const BASE_W = 100;
const STEP = 0.9;
const ASPECT = VIEW_H / VIEW_W;

export default function ScrollBooks() {
  return (
    <div className="hero-cue">
      <div className="scroll-books" aria-hidden>
        {BOOKS.map((b, i) => {
          const w = BASE_W * Math.pow(STEP, i);
          return (
            <svg
              key={i}
              className={`book book-${b.tone}`}
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              width={w}
              height={w * ASPECT}
              style={{ "--i": i } as CSSProperties}
            >
              {/* The page block, offset down so the spread sits on top of it. */}
              <path
                className="bk-block"
                d={SPREAD}
                transform={`translate(0 ${BLOCK_OFFSET})`}
              />
              <path className="bk-body" d={PAGE_L} />
              <path className="bk-body" d={PAGE_R} />
              {/* The two leaves are separate planes, so they cannot catch the
                  same light. Without this the spread reads as one curved slab. */}
              <path className="bk-hi" d={PAGE_L} />
              <path className="bk-shade" d={PAGE_R} />
              <path className="bk-gutter" d={GUTTER_LINE} />
              {/* Ruled lines on the far page: the letter is the recto, this is
                  the verso, and together they read as a book being read. */}
              <path className="bk-rules" d={RULES} />
              <text
                className="bk-letter"
                x={MID_L}
                y={LETTER_Y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="22"
              >
                {b.letter}
              </text>
            </svg>
          );
        })}
      </div>
      {/* Read as a word, not as six loose letters. */}
      <span className="sr-only">Scroll down</span>
    </div>
  );
}
