/**
 * The rig is the static geometry of the mark: where every letterform sits, what
 * its pixels are, and the invisible construction lines the animation rides on.
 * Rebuilt on resize, then treated as read-only by every effect.
 *
 * The mark is expressed as a `Lockup` — a pure function of (cap height, origin,
 * baseline) — so the same composition can be laid out at any scale. The intro
 * only ever uses one: the nav-corner lockup, where the mark is seared in and
 * where it stays.
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

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
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

/**
 * Trace the five arms + hub of a laid-out lockup.
 */
export function pathAsterisk(ctx: CanvasRenderingContext2D, lk: Lockup) {
  const { astCx: cx, astCy: cy, astR: R } = lk;
  ctx.beginPath();
  for (const arm of lk.arms) {
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
// Rig
// ---------------------------------------------------------------------------

export interface Rig {
  w: number;
  h: number;
  dpr: number;

  /** The mark at nav scale, parked at the top-left. The only lockup there is:
   *  it is seared straight into its final position. */
  corner: Lockup;
  /** Ink box of the whole mark including the asterisk, in CSS px. */
  box: Rect;
  /** Where the light comes from — the middle of the mark. */
  sunX: number;
  sunY: number;

  /** White silhouette of the whole mark at viewport size, device-pixel backed. */
  silhouette: HTMLCanvasElement;
  logoBone: HTMLCanvasElement;
  logoInk: HTMLCanvasElement;

  diag: number;
}

export function buildRig(w: number, h: number, dpr: number): Rig {
  const fm = measureFont();

  // The corner lockup mirrors the nav's own CSS clamps so the parked mark lines
  // up with the links beside it. Keep these in step with `--gutter`, `--nav-h`
  // and `.nav-mark-slot` in globals.css.
  const gutter = Math.min(Math.max(20, w * 0.05), 72);
  const navH = Math.min(Math.max(64, w * 0.08), 86);
  const cornerCap = Math.min(Math.max(13, w * 0.013), 18);
  // Centre the lockup's cap box on the nav row.
  const corner = buildLockup(fm, cornerCap, gutter, navH / 2 + cornerCap / 2);

  const left = corner.sd.x;
  const right = corner.astCx + corner.astR;
  const top = Math.min(corner.sd.y, corner.astCy - corner.astR);
  const bottom = Math.max(corner.sd.y + corner.sd.h, corner.astCy + corner.astR);
  const box: Rect = { x: left, y: top, w: right - left, h: bottom - top };

  // --- silhouette + tinted blits -------------------------------------------
  // Live text, not a raster, so the seared mark and the parked one are the
  // same pixels.
  const silhouette = document.createElement("canvas");
  silhouette.width = Math.ceil(w * dpr);
  silhouette.height = Math.ceil(h * dpr);
  {
    const sc = silhouette.getContext("2d")!;
    sc.scale(dpr, dpr);
    drawSd(sc, corner, "#fff");
    sc.fillStyle = "#fff";
    pathAsterisk(sc, corner);
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
    corner,
    box,
    sunX: box.x + box.w / 2,
    sunY: box.y + box.h / 2,
    silhouette,
    logoBone: tintFull(rgb(BONE)),
    logoInk: tintFull(rgb(INK)),
    diag: Math.hypot(w, h),
  };
}
