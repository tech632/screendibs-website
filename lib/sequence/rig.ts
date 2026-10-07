/**
 * The rig is the static geometry of the mark: where every letterform sits, what
 * its pixels are, and the invisible construction lines the animation rides on.
 * Rebuilt on resize, then treated as read-only by every effect.
 *
 * The mark is expressed as a `Lockup` — a pure function of (cap height, origin,
 * baseline) — so the identical composition can be laid out at hero scale and at
 * nav-corner scale, and interpolated between the two.
 *
 * Proportions were measured off `Screendibs 2026-07-22 .png` (1258x794) and
 * expressed as multiples of the cap height C:
 *
 *   S and d ................ kiss, with 0.025 C of negative tracking
 *   gap d -> asterisk ...... 0.234 C
 *   asterisk radius ........ 0.2554 C
 *   asterisk centre y ...... baseline - 0.755 C
 */

import { BONE, INK, rgb } from "../palette";
import { mulberry32 } from "../rng";

const R_GAP = 0.234;
const R_AST_RADIUS = 0.2554;
/** Nudged a touch higher than the reference — reads better against the S. */
const R_AST_CY = 0.755;
/** The S and d touch in the reference; a hair of overlap is correct. */
const R_TRACK = 0.025;

export const FONT_STACK =
  '"Helvetica Neue", Helvetica, Arial, "Liberation Sans", "Segoe UI", sans-serif';

/** The S carries the mark and is set noticeably heavier than the d. */
export const WEIGHT_S = 700;
export const WEIGHT_D = 360;

/** Padding baked around each rasterised glyph so blur/bloom has room. */
const GLYPH_PAD = 24;

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GlyphRaster {
  /** Backing store is device-pixel sized; draw it scaled by 1/dpr. */
  canvas: HTMLCanvasElement;
  /** CSS-pixel size of the whole raster (ink + padding on all sides). */
  w: number;
  h: number;
  /** Ink box within the raster, in CSS px. Always (PAD, PAD, inkW, inkH). */
  pad: number;
  inkW: number;
  inkH: number;
}

export interface ArmQuad {
  /** Four corners, hub side first. */
  pts: Array<[number, number]>;
  angle: number;
  /** Unit vector from hub to tip. */
  dir: [number, number];
}

// ---------------------------------------------------------------------------
// Font measurement
// ---------------------------------------------------------------------------

export interface FontMetrics {
  capRatio: number;
  xRatio: number;
  stemRatio: number;
  /** Ink widths as multiples of font size, at each glyph's own weight. */
  sInk: number;
  dInk: number;
  /** Left side bearings, as multiples of font size (signed, per spec). */
  sLsb: number;
  dLsb: number;
  /**
   * True ink ascent/descent per glyph, as multiples of font size. Round
   * letterforms overshoot the cap line and the baseline, so the ink box is
   * taller than the cap height — using cap here would sit every rasterised
   * glyph a couple of pixels below where live text draws it.
   */
  sAsc: number;
  sDesc: number;
  dAsc: number;
  dDesc: number;
  /** Total mark width as a multiple of cap height. */
  totalRatio: number;
}

let cachedMetrics: FontMetrics | null = null;

export function measureFont(): FontMetrics {
  if (cachedMetrics) return cachedMetrics;
  const ctx = document.createElement("canvas").getContext("2d")!;
  const probe = 200;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  ctx.font = `${WEIGHT_D} ${probe}px ${FONT_STACK}`;
  const H = ctx.measureText("H");
  const x = ctx.measureText("x");
  const l = ctx.measureText("l");
  const d = ctx.measureText("d");

  ctx.font = `${WEIGHT_S} ${probe}px ${FONT_STACK}`;
  const S = ctx.measureText("S");

  const capRatio = H.actualBoundingBoxAscent / probe || 0.717;
  const sInk = (S.actualBoundingBoxRight + S.actualBoundingBoxLeft) / probe;
  const dInk = (d.actualBoundingBoxRight + d.actualBoundingBoxLeft) / probe;

  // Everything downstream is expressed per cap height, not per em, so the
  // lockup holds its proportions whatever font actually resolves.
  const perCap = (v: number) => v / capRatio;
  const totalRatio =
    perCap(sInk) + perCap(dInk) - R_TRACK + R_GAP + 2 * R_AST_RADIUS;

  cachedMetrics = {
    capRatio,
    xRatio: x.actualBoundingBoxAscent / probe || 0.523,
    stemRatio: (l.actualBoundingBoxRight + l.actualBoundingBoxLeft) / probe || 0.084,
    sInk,
    dInk,
    sLsb: S.actualBoundingBoxLeft / probe,
    dLsb: d.actualBoundingBoxLeft / probe,
    sAsc: S.actualBoundingBoxAscent / probe,
    sDesc: S.actualBoundingBoxDescent / probe,
    dAsc: d.actualBoundingBoxAscent / probe,
    dDesc: d.actualBoundingBoxDescent / probe,
    totalRatio,
  };
  return cachedMetrics;
}

// ---------------------------------------------------------------------------
// Lockup — the mark laid out at an arbitrary size and position
// ---------------------------------------------------------------------------

export interface Lockup {
  cap: number;
  fontPx: number;
  baseline: number;
  markW: number;

  sBox: Rect;
  dBox: Rect;
  /** Text-origin x for each glyph, i.e. where to call fillText. */
  sTextX: number;
  dTextX: number;

  /** Bounding box of the "Sd" group alone — what decomposes into motes. */
  sd: Rect;

  astCx: number;
  astCy: number;
  astR: number;
  hubR: number;
  arms: ArmQuad[];
}

let measureCtx: CanvasRenderingContext2D | null = null;

/** Measure a glyph at the exact size it will be drawn at. */
function inkAt(char: string, fontPx: number, weight: number) {
  if (!measureCtx) measureCtx = document.createElement("canvas").getContext("2d")!;
  const c = measureCtx;
  c.font = `${weight} ${fontPx}px ${FONT_STACK}`;
  c.textAlign = "left";
  c.textBaseline = "alphabetic";
  const m = c.measureText(char);
  return {
    w: Math.max(1, m.actualBoundingBoxRight + m.actualBoundingBoxLeft),
    asc: m.actualBoundingBoxAscent,
    desc: m.actualBoundingBoxDescent,
    lsb: m.actualBoundingBoxLeft,
  };
}

export function buildLockup(
  fm: FontMetrics,
  cap: number,
  originX: number,
  baseline: number,
): Lockup {
  const fontPx = cap / fm.capRatio;

  // Measured at the real font size rather than scaled from the probe: hinting
  // means a glyph's ink box is not perfectly linear in font size, and a raster
  // built at this size would otherwise land a pixel or two off the same glyph
  // drawn as live text — which is visible as a jump at the canvas handover.
  const s = inkAt("S", fontPx, WEIGHT_S);
  const d = inkAt("d", fontPx, WEIGHT_D);

  const sX = originX;
  const dX = sX + s.w - R_TRACK * cap;

  // Ink boxes, not cap boxes: `drawRaster` aligns a raster by its ink top.
  const sBox: Rect = { x: sX, y: baseline - s.asc, w: s.w, h: s.asc + s.desc };
  const dBox: Rect = { x: dX, y: baseline - d.asc, w: d.w, h: d.asc + d.desc };
  const sdRight = dX + d.w;

  const inkTop = Math.min(sBox.y, dBox.y);
  const inkBottom = Math.max(sBox.y + sBox.h, dBox.y + dBox.h);

  const astR = cap * R_AST_RADIUS;
  const astCx = sdRight + R_GAP * cap + astR;
  const astCy = baseline - R_AST_CY * cap;

  return {
    cap,
    fontPx,
    baseline,
    markW: cap * fm.totalRatio,
    sBox,
    dBox,
    sTextX: sX + s.lsb,
    dTextX: dX + d.lsb,
    sd: { x: sX, y: inkTop, w: sdRight - sX, h: inkBottom - inkTop },
    astCx,
    astCy,
    astR,
    hubR: astR * 0.115,
    arms: buildArms(astCx, astCy, astR, 0),
  };
}

function buildArms(cx: number, cy: number, R: number, rot: number): ArmQuad[] {
  const hubD = R * 0.06;
  const wIn = R * 0.085;
  const wOut = R * 0.255;
  const arms: ArmQuad[] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (-90 + i * 72) * (Math.PI / 180) + rot;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const px = -dy;
    const py = dx;
    arms.push({
      angle,
      dir: [dx, dy],
      pts: [
        [cx + dx * hubD + px * wIn, cy + dy * hubD + py * wIn],
        [cx + dx * R + px * wOut, cy + dy * R + py * wOut],
        [cx + dx * R - px * wOut, cy + dy * R - py * wOut],
        [cx + dx * hubD - px * wIn, cy + dy * hubD - py * wIn],
      ],
    });
  }
  return arms;
}

/** Trace a five-armed asterisk of radius R at (cx, cy), optionally rotated. */
export function pathAsteriskAt(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  R: number,
  rot = 0,
) {
  ctx.beginPath();
  for (const arm of buildArms(cx, cy, R, rot)) {
    ctx.moveTo(arm.pts[0][0], arm.pts[0][1]);
    for (let i = 1; i < 4; i++) ctx.lineTo(arm.pts[i][0], arm.pts[i][1]);
    ctx.closePath();
  }
  // Anticlockwise, to match the winding of the arm quads. Traced the other way
  // round, the nonzero fill rule reads the hub as a hole and punches a dot out
  // of the middle of the asterisk.
  ctx.moveTo(cx + R * 0.115, cy);
  ctx.arc(cx, cy, R * 0.115, 0, Math.PI * 2, true);
}

/** Trace the five arms + hub of a laid-out lockup. */
export function pathAsterisk(ctx: CanvasRenderingContext2D, lk: Lockup) {
  pathAsteriskAt(ctx, lk.astCx, lk.astCy, lk.astR, 0);
}

/**
 * Draw the "Sd" of a lockup with live text rather than a blitted raster, so it
 * stays crisp at every size the scroll morph passes through.
 */
export function drawSd(ctx: CanvasRenderingContext2D, lk: Lockup, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `${WEIGHT_S} ${lk.fontPx}px ${FONT_STACK}`;
  ctx.fillText("S", lk.sTextX, lk.baseline);
  ctx.font = `${WEIGHT_D} ${lk.fontPx}px ${FONT_STACK}`;
  ctx.fillText("d", lk.dTextX, lk.baseline);
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Rasterisation
// ---------------------------------------------------------------------------

export function rasterizeGlyph(
  char: string,
  fontPx: number,
  dpr: number,
  weight: number,
): GlyphRaster {
  const font = `${weight} ${fontPx}px ${FONT_STACK}`;
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = font;
  probe.textAlign = "left";
  probe.textBaseline = "alphabetic";
  const m = probe.measureText(char);

  const inkW = Math.max(1, m.actualBoundingBoxRight + m.actualBoundingBoxLeft);
  const inkH = Math.max(1, m.actualBoundingBoxAscent + m.actualBoundingBoxDescent);
  const w = inkW + GLYPH_PAD * 2;
  const h = inkH + GLYPH_PAD * 2;

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(w * dpr);
  canvas.height = Math.ceil(h * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.font = font;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#fff";
  // Shift the text origin so ink lands exactly at (PAD, PAD).
  ctx.fillText(
    char,
    GLYPH_PAD + m.actualBoundingBoxLeft,
    GLYPH_PAD + m.actualBoundingBoxAscent,
  );

  return { canvas, w, h, pad: GLYPH_PAD, inkW, inkH };
}

/** Recolour a white raster, keeping its alpha and geometry. */
export function tintRaster(g: GlyphRaster, color: string): GlyphRaster {
  const canvas = document.createElement("canvas");
  canvas.width = g.canvas.width;
  canvas.height = g.canvas.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(g.canvas, 0, 0);
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return { ...g, canvas };
}

/** Blit a raster so its ink box top-left lands on (x, y). */
export function drawRaster(
  ctx: CanvasRenderingContext2D,
  g: GlyphRaster,
  x: number,
  y: number,
) {
  ctx.drawImage(g.canvas, x - g.pad, y - g.pad, g.w, g.h);
}

// ---------------------------------------------------------------------------
// Path sampling — the pen the `d` is written with
// ---------------------------------------------------------------------------

export interface SampledPoint {
  x: number;
  y: number;
  sub: number;
  s: number;
}

/**
 * A polyline with cumulative arclength, possibly broken into subpaths (a pen
 * lift between them). Lets the reveal mask be stroked to an exact length.
 */
export class PathSampler {
  readonly pts: SampledPoint[] = [];
  readonly length: number;
  readonly subStarts: number[] = [];

  constructor(subpaths: Array<Array<[number, number]>>) {
    let s = 0;
    subpaths.forEach((sub, si) => {
      this.subStarts.push(this.pts.length);
      for (let i = 0; i < sub.length; i++) {
        const [x, y] = sub[i];
        if (i > 0) {
          const prev = sub[i - 1];
          s += Math.hypot(x - prev[0], y - prev[1]);
        }
        this.pts.push({ x, y, sub: si, s });
      }
    });
    this.length = s;
  }

  pointAt(s: number): SampledPoint {
    const target = Math.max(0, Math.min(this.length, s));
    let lo = 0;
    let hi = this.pts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.pts[mid].s < target) lo = mid + 1;
      else hi = mid;
    }
    return this.pts[lo];
  }

  strokeUpTo(
    ctx: CanvasRenderingContext2D,
    s: number,
    begin: (sub: number) => void,
  ) {
    let i = 0;
    while (i < this.pts.length) {
      const sub = this.pts[i].sub;
      const start = i;
      while (i < this.pts.length && this.pts[i].sub === sub) i++;
      const end = i;

      if (this.pts[start].s > s) break;

      begin(sub);
      ctx.beginPath();
      ctx.moveTo(this.pts[start].x, this.pts[start].y);
      let drew = false;
      for (let k = start + 1; k < end; k++) {
        const p = this.pts[k];
        if (p.s <= s) {
          ctx.lineTo(p.x, p.y);
          drew = true;
        } else {
          const prev = this.pts[k - 1];
          const seg = p.s - prev.s || 1;
          const f = (s - prev.s) / seg;
          ctx.lineTo(prev.x + (p.x - prev.x) * f, prev.y + (p.y - prev.y) * f);
          drew = true;
          break;
        }
      }
      if (!drew) ctx.lineTo(this.pts[start].x + 0.01, this.pts[start].y);
      ctx.stroke();
    }
  }
}

// ---------------------------------------------------------------------------
// Rig
// ---------------------------------------------------------------------------

export interface Rig {
  w: number;
  h: number;
  dpr: number;
  fm: FontMetrics;

  /** The mark at hero scale, centred in the viewport. */
  hero: Lockup;
  /** The mark at nav scale, parked at the top-left. */
  corner: Lockup;

  cap: number;
  baseline: number;
  sBox: Rect;
  dBox: Rect;
  astCx: number;
  astCy: number;
  astR: number;
  hubR: number;
  arms: ArmQuad[];

  sRaster: GlyphRaster;
  dRaster: GlyphRaster;
  sBone: GlyphRaster;
  dBone: GlyphRaster;

  dPen: PathSampler;
  dPenWidths: number[];

  silhouette: HTMLCanvasElement;
  logoBone: HTMLCanvasElement;
  logoInk: HTMLCanvasElement;

  /** Normalised (u, v) samples inside the "Sd" group, for the scroll morph. */
  motes: Float32Array;

  diag: number;
}

export function buildRig(w: number, h: number, dpr: number): Rig {
  const fm = measureFont();

  // Width-driven, then clamped so the centred mark leaves the lower third of
  // the viewport to the copy.
  const targetMarkW = Math.min(w * 0.8, 1180);
  let cap = targetMarkW / fm.totalRatio;
  cap = Math.min(cap, h * 0.27);
  cap = Math.max(cap, 40);

  const markW = cap * fm.totalRatio;
  const originX = (w - markW) / 2;
  // Dead centre of the viewport.
  const baseline = h / 2 + cap / 2;

  const hero = buildLockup(fm, cap, originX, baseline);

  // The corner lockup mirrors the nav's own CSS clamps so the parked mark lines
  // up with the links beside it. Keep these in step with `--gutter`, `--nav-h`
  // and `.nav-mark-slot` in globals.css.
  const gutter = Math.min(Math.max(20, w * 0.05), 72);
  const navH = Math.min(Math.max(64, w * 0.08), 86);
  const cornerCap = Math.min(Math.max(13, w * 0.013), 18);
  // Centre the lockup's cap box on the nav row.
  const corner = buildLockup(fm, cornerCap, gutter, navH / 2 + cornerCap / 2);

  const fontPx = hero.fontPx;
  const xH = fontPx * fm.xRatio;
  const stemW = fontPx * fm.stemRatio;

  const sRaster = rasterizeGlyph("S", fontPx, dpr, WEIGHT_S);
  const dRaster = rasterizeGlyph("d", fontPx, dpr, WEIGHT_D);

  // --- construction lines for the d -----------------------------------------
  const stemRight = hero.dBox.x + hero.dBox.w;
  const stemCx = stemRight - stemW / 2;
  const ringW = stemW * 0.94;

  const bowlCx = (hero.dBox.x + stemRight) / 2;
  const bowlCy = baseline - xH / 2;
  const bowlRx = Math.max(2, (stemRight - hero.dBox.x) / 2 - ringW / 2);
  const bowlRy = Math.max(2, xH / 2 - ringW / 2);

  // Subpath 0: the bowl, traced anticlockwise from 12 o'clock — the direction a
  // hand actually writes an "o". Starting at the top rather than at the stem
  // junction keeps the stroke's round start-cap from spilling up the ascender.
  const bowlPts: Array<[number, number]> = [];
  const BOWL_STEPS = 160;
  for (let i = 0; i <= BOWL_STEPS; i++) {
    const th = -Math.PI / 2 - (i / BOWL_STEPS) * Math.PI * 2;
    bowlPts.push([bowlCx + bowlRx * Math.cos(th), bowlCy + bowlRy * Math.sin(th)]);
  }
  // Subpath 1: the ascender, pulled top-down.
  const stemPts: Array<[number, number]> = [];
  const STEM_STEPS = 40;
  const stemTop = hero.dBox.y;
  for (let i = 0; i <= STEM_STEPS; i++) {
    stemPts.push([stemCx, stemTop + ((baseline - stemTop) * i) / STEM_STEPS]);
  }

  const dPen = new PathSampler([bowlPts, stemPts]);
  // Wide enough to cover the strokes it reveals with margin to spare, tight
  // enough that the caps don't reveal neighbouring parts of the letterform.
  const dPenWidths = [ringW * 1.5, stemW * 1.9];

  // --- silhouette + tinted blits -------------------------------------------
  const silhouette = document.createElement("canvas");
  silhouette.width = Math.ceil(w * dpr);
  silhouette.height = Math.ceil(h * dpr);
  {
    const sc = silhouette.getContext("2d")!;
    sc.scale(dpr, dpr);
    sc.fillStyle = "#fff";
    drawRaster(sc, sRaster, hero.sBox.x, hero.sBox.y);
    drawRaster(sc, dRaster, hero.dBox.x, hero.dBox.y);
    pathAsterisk(sc, hero);
    sc.fill();
  }

  const tintFull = (color: string) => {
    const c = document.createElement("canvas");
    c.width = silhouette.width;
    c.height = silhouette.height;
    const cc = c.getContext("2d")!;
    cc.drawImage(silhouette, 0, 0);
    cc.globalCompositeOperation = "source-in";
    cc.fillStyle = color;
    cc.fillRect(0, 0, c.width, c.height);
    return c;
  };

  return {
    w,
    h,
    dpr,
    fm,
    hero,
    corner,
    cap,
    baseline,
    sBox: hero.sBox,
    dBox: hero.dBox,
    astCx: hero.astCx,
    astCy: hero.astCy,
    astR: hero.astR,
    hubR: hero.hubR,
    arms: hero.arms,
    sRaster,
    dRaster,
    sBone: tintRaster(sRaster, rgb(BONE)),
    dBone: tintRaster(dRaster, rgb(BONE)),
    dPen,
    dPenWidths,
    silhouette,
    logoBone: tintFull(rgb(BONE)),
    logoInk: tintFull(rgb(INK)),
    motes: sampleMotes(hero, 760),
    diag: Math.hypot(w, h),
  };
}

/**
 * Rejection-sample points inside the "Sd" letterforms and store them normalised
 * to that group's bounding box, so the same cloud projects onto any lockup.
 */
function sampleMotes(lk: Lockup, count: number): Float32Array {
  const rnd = mulberry32(60712);
  const W = 300;
  const H = Math.max(8, Math.round((lk.sd.h / lk.sd.w) * W));
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  const k = W / lk.sd.w;
  ctx.scale(k, k);
  ctx.translate(-lk.sd.x, -lk.sd.y);
  drawSd(ctx, lk, "#fff");
  const data = ctx.getImageData(0, 0, W, H).data;

  const out = new Float32Array(count * 2);
  let n = 0;
  let guard = 0;
  while (n < count && guard++ < count * 400) {
    const px = Math.floor(rnd() * W);
    const py = Math.floor(rnd() * H);
    if (data[(py * W + px) * 4 + 3] < 140) continue;
    out[n * 2] = (px + 0.5) / W;
    out[n * 2 + 1] = (py + 0.5) / H;
    n++;
  }
  return out.slice(0, n * 2);
}

export function pointInQuad(
  px: number,
  py: number,
  quad: Array<[number, number]>,
): boolean {
  let inside = false;
  for (let i = 0, j = quad.length - 1; i < quad.length; j = i++) {
    const [xi, yi] = quad[i];
    const [xj, yj] = quad[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}
