import { clamp01, easeOutQuad, lerp, smoothstep } from "../easing";
import { mulberry32 } from "../rng";
import { PHASES } from "./timeline";
import type { Rect, Rig } from "./rig";

/** Seconds the bright edge takes to cross the mark. Quick on purpose: a brand
 *  is pressed, not burnt, and the edge should be gone before it can be followed. */
const SWEEP = 0.4;
/** Share of the phase over which the imprint cools from hot orange to bone. */
const COOL_FROM = 0.3;
const COOL_TO = 0.92;
/** Heat trailing the edge, and the thin bright lead ahead of it, in cap heights. */
const TRAIL = 1.1;
const LEAD = 0.12;
/** The edge is not quite vertical, so it reads as an iron laid down, not a wipe. */
const TILT = 0.2;
/** Margin around the mark baked into the heat buffer so the bloom has room. */
const PAD_CAPS = 3;

const PUFFS = 8;

interface Puff {
  /** Where along the mark it lifts off, 0..1. */
  at: number;
  /** Seconds into the phase at which it is born, and how long it lives. */
  born: number;
  life: number;
  rise: number;
  drift: number;
  wobble: number;
  size: number;
}

/**
 * Beat 1: the mark is seared in.
 *
 * Not a fire: a hot iron pressed into leather. The mark does not exist until
 * the edge reaches it. A thin white-hot line, slightly tilted, crosses the
 * silhouette in a few tenths of a second, leaving a trail of orange metal that
 * then cools straight back to bone. A tight glow rides the edge, and a few
 * grey wisps lift off the imprint. No sparks, no flash.
 *
 * Everything here is a pure function of the time handed in, so a seeked frame
 * is exactly the frame that plays.
 */
export class Sear {
  /** The heat buffer's footprint on the canvas, in CSS px (mark plus margin). */
  private box: Rect;
  private heat: HTMLCanvasElement;
  private hctx: CanvasRenderingContext2D;
  /** The mark's silhouette and its cooled bone copy, cropped to the buffer. */
  private mask: HTMLCanvasElement;
  private bone: HTMLCanvasElement;
  private puffs: Puff[] = [];
  /** Unit normal of the edge, the mark's centre, and its half-extent along the
   *  normal. */
  private nx: number;
  private ny: number;
  private cx: number;
  private cy: number;
  private ext: number;
  readonly duration = PHASES.sear[1] - PHASES.sear[0];

  constructor(private rig: Rig) {
    const cap = rig.corner.cap;
    const pad = cap * PAD_CAPS;
    const box: Rect = {
      x: rig.box.x - pad,
      y: rig.box.y - pad,
      w: rig.box.w + pad * 2,
      h: rig.box.h + pad * 2,
    };
    this.box = box;
    const dpr = rig.dpr;

    const mk = () => {
      const c = document.createElement("canvas");
      c.width = Math.ceil(box.w * dpr);
      c.height = Math.ceil(box.h * dpr);
      return c;
    };
    // Crop the full-frame silhouettes into buffers only as big as the mark. The
    // sources are viewport-sized and the margin can poke past the left/top
    // edge, so draw them translated rather than via a source rect.
    const crop = (src: HTMLCanvasElement) => {
      const c = mk();
      const cc = c.getContext("2d")!;
      cc.setTransform(dpr, 0, 0, dpr, -box.x * dpr, -box.y * dpr);
      cc.drawImage(src, 0, 0, rig.w, rig.h);
      return c;
    };
    this.mask = crop(rig.silhouette);
    this.bone = crop(rig.logoBone);
    this.heat = mk();
    this.hctx = this.heat.getContext("2d")!;

    this.nx = Math.cos(TILT);
    this.ny = Math.sin(TILT);
    this.cx = rig.box.x + rig.box.w / 2;
    this.cy = rig.box.y + rig.box.h / 2;
    this.ext = (Math.abs(this.nx) * rig.box.w + Math.abs(this.ny) * rig.box.h) / 2;

    const rnd = mulberry32(31337);
    for (let i = 0; i < PUFFS; i++) {
      const at = (i + 0.3 + rnd() * 0.4) / PUFFS;
      this.puffs.push({
        at,
        // Born just after the edge has passed that part of the mark.
        born: at * SWEEP + 0.06 + rnd() * 0.1,
        life: 0.85 + rnd() * 0.5,
        rise: cap * (1.4 + rnd() * 1.3),
        drift: (rnd() - 0.2) * cap * 1.8,
        wobble: rnd() * Math.PI * 2,
        size: cap * (0.32 + rnd() * 0.22),
      });
    }
  }

  /**
   * The hot imprint. Draws nothing once the phase is over; the caller swaps in
   * the plain bone mark then.
   *
   * @param s seconds into the sear phase
   */
  renderHeat(ctx: CanvasRenderingContext2D, s: number) {
    if (s < 0 || s >= this.duration) return;
    const { rig, box, hctx: h, nx, ny, cx, cy, ext } = this;
    const cap = rig.corner.cap;

    const q = clamp01(s / SWEEP);
    const trail = cap * TRAIL;
    const lead = cap * LEAD;
    // Position of the edge along its normal, from the mark's centre. It ends
    // one trail-length past the far side, so the whole mark is left behind it.
    const edge = lerp(-ext, ext + trail, easeOutQuad(q));
    const cool = smoothstep(COOL_FROM, COOL_TO, s / this.duration);
    const at = (d: number): [number, number] => [cx + nx * d, cy + ny * d];

    // --- the metal, cut to the mark's own silhouette -------------------------
    h.setTransform(rig.dpr, 0, 0, rig.dpr, -box.x * rig.dpr, -box.y * rig.dpr);
    h.globalCompositeOperation = "source-over";
    h.globalAlpha = 1;
    h.clearRect(box.x, box.y, box.w, box.h);
    const [x0, y0] = at(edge - trail);
    const [x1, y1] = at(edge + lead);
    const g = h.createLinearGradient(x0, y0, x1, y1);
    const front = trail / (trail + lead);
    g.addColorStop(0, "rgba(232,104,52,1)");
    g.addColorStop(0.5 * front, "rgba(255,150,64,1)");
    g.addColorStop(front * 0.9, "rgba(255,216,156,1)");
    g.addColorStop(front, "rgba(255,252,240,1)");
    g.addColorStop(1, "rgba(255,150,64,0)");
    h.fillStyle = g;
    h.fillRect(box.x, box.y, box.w, box.h);

    // Keep only the mark, then let it cool back to bone. Pixel space from here.
    h.setTransform(1, 0, 0, 1, 0, 0);
    h.globalCompositeOperation = "destination-in";
    h.drawImage(this.mask, 0, 0);
    if (cool > 0) {
      h.globalCompositeOperation = "source-atop";
      h.globalAlpha = cool;
      h.drawImage(this.bone, 0, 0);
    }
    h.globalCompositeOperation = "source-over";
    h.globalAlpha = 1;

    ctx.drawImage(this.heat, box.x, box.y, box.w, box.h);

    // --- light thrown off it -------------------------------------------------
    const heat = 1 - cool;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // A tight glow riding the edge while it moves.
    const travelling = Math.sin(Math.PI * q);
    if (travelling > 0.01 && q < 1) {
      const [gx, gy] = at(Math.min(edge, ext));
      const r = cap * 2.4;
      const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
      gr.addColorStop(0, `rgba(255,236,200,${0.5 * travelling})`);
      gr.addColorStop(0.35, `rgba(255,150,70,${0.2 * travelling})`);
      gr.addColorStop(1, "rgba(255,110,40,0)");
      ctx.fillStyle = gr;
      ctx.fillRect(gx - r, gy - r, r * 2, r * 2);
    }
    // A soft bloom of the imprint itself, fading as it cools.
    if (heat > 0.02) {
      if ("filter" in ctx) ctx.filter = `blur(${Math.max(3, cap * 0.45)}px)`;
      ctx.globalAlpha = 0.8 * heat;
      ctx.drawImage(this.heat, box.x, box.y, box.w, box.h);
    }
    ctx.restore();
  }

  /**
   * A few grey wisps lifting off the imprint. Drawn above the wash, so the
   * light opening underneath doesn't cut them off.
   *
   * @param s seconds into the sear phase
   */
  renderSmoke(ctx: CanvasRenderingContext2D, s: number) {
    const cap = this.rig.corner.cap;
    const b = this.rig.box;
    ctx.save();
    for (const p of this.puffs) {
      const u = (s - p.born) / p.life;
      if (u <= 0 || u >= 1) continue;
      const rise = 1 - Math.pow(1 - u, 2);
      const x = b.x + p.at * b.w + p.drift * u + Math.sin(u * 3.2 + p.wobble) * cap * 0.25;
      const y = b.y + b.h * 0.35 - p.rise * rise;
      const r = p.size * (0.7 + u * 1.5);
      const a = 0.17 * smoothstep(0, 0.18, u) * Math.pow(1 - u, 1.6);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(176,172,168,${a})`);
      g.addColorStop(1, "rgba(176,172,168,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    ctx.restore();
  }
}
