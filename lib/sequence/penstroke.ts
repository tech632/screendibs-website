import { clamp01, easeInOutCubic, smoothstep } from "../easing";
import { BONE, rgb } from "../palette";
import { mulberry32, type Rng } from "../rng";
import { drawRaster, type Rig } from "./rig";
import type { EmitOpts } from "./forge";

/** Share of the phase spent on the bowl before the pen lifts to the ascender. */
const BOWL_SHARE = 0.6;
/** Dead beat between the two strokes — the pen lift reads as intent. */
const LIFT = 0.06;

/**
 * Beat 2 — the d is written, not faded in.
 *
 * The glyph raster never changes; what animates is a *mask*. A generously wide
 * round-capped stroke is laid down along the letterform's construction lines
 * (bowl anticlockwise from 3 o'clock, pen lift, ascender pulled top to bottom)
 * and the glyph is composited into it. Because the mask is wider than the
 * strokes it reveals, the letter emerges exactly as a pen would lay it, and
 * nothing outside the glyph's own outline can ever show.
 */
export class PenStroke {
  private rng: Rng = mulberry32(31337);

  constructor(private rig: Rig) {}

  /** Arclength reached at phase progress `p`, plus which stroke is live. */
  private headAt(p: number) {
    const pen = this.rig.dPen;
    const bowlLen = pen.pts[pen.subStarts[1] - 1].s;
    const total = pen.length;

    if (p < BOWL_SHARE) {
      const q = easeInOutCubic(clamp01(p / BOWL_SHARE));
      return { s: bowlLen * q, sub: 0, lifting: false };
    }
    const after = (p - BOWL_SHARE) / (1 - BOWL_SHARE);
    if (after < LIFT) return { s: bowlLen, sub: 0, lifting: true };
    const q = easeInOutCubic(clamp01((after - LIFT) / (1 - LIFT)));
    return { s: bowlLen + (total - bowlLen) * q, sub: 1, lifting: false };
  }

  render(
    ctx: CanvasRenderingContext2D,
    progress: number,
    scratch: CanvasRenderingContext2D,
    emit: (x: number, y: number, opts: EmitOpts) => void,
    dt: number,
  ) {
    const rig = this.rig;
    const { s, sub, lifting } = this.headAt(progress);

    // --- the mask -----------------------------------------------------------
    scratch.save();
    scratch.clearRect(0, 0, rig.w, rig.h);
    scratch.lineCap = "round";
    scratch.lineJoin = "round";
    scratch.strokeStyle = "#fff";
    rig.dPen.strokeUpTo(scratch, s, (i) => {
      scratch.lineWidth = rig.dPenWidths[i];
    });
    // Keep only the parts of the mask that are actually letterform.
    scratch.globalCompositeOperation = "destination-in";
    drawRaster(scratch, rig.dRaster, rig.dBox.x, rig.dBox.y);
    // Recolour what survived.
    scratch.globalCompositeOperation = "source-in";
    scratch.fillStyle = rgb(BONE);
    scratch.fillRect(0, 0, rig.w, rig.h);
    scratch.restore();

    ctx.drawImage(scratch.canvas, 0, 0, rig.w, rig.h);

    // The mask's round caps can leave slivers at the bowl/stem junction, so the
    // last sliver of the phase crossfades to the true glyph.
    const settle = smoothstep(0.9, 1, progress);
    if (settle > 0) {
      ctx.save();
      ctx.globalAlpha = settle;
      drawRaster(ctx, rig.dBone, rig.dBox.x, rig.dBox.y);
      ctx.restore();
    }

    // --- the pen tip --------------------------------------------------------
    if (progress >= 1) return;
    const head = rig.dPen.pointAt(s);
    const tipGlow = lifting ? 0.25 : 1;
    const rad = rig.cap * 0.075 * tipGlow;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const grd = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, rad);
    grd.addColorStop(0, `rgba(255,253,246,${0.95 * tipGlow})`);
    grd.addColorStop(0.25, `rgba(255,228,172,${0.42 * tipGlow})`);
    grd.addColorStop(1, "rgba(255,170,70,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(head.x - rad, head.y - rad, rad * 2, rad * 2);
    ctx.restore();

    // Sparks shed from the tip. They fall, unlike the forge's rising embers —
    // the pen is scoring the surface, not burning through it.
    if (!lifting) {
      const n = Math.round(dt * 90);
      for (let i = 0; i < n; i++) {
        const a = this.rng() * Math.PI * 2;
        emit(head.x, head.y, {
          vx: Math.cos(a) * rig.cap * 0.3,
          vy: Math.sin(a) * rig.cap * 0.3,
          life: 0.28 + this.rng() * 0.3,
          size: 0.7 + this.rng() * 0.8,
          heat: 0.6 + this.rng() * 0.35,
          grav: rig.cap * 0.55,
          drag: 0.9,
          trail: 0.7,
        });
      }
    }

    // A thin bright rim rides just behind the tip along the finished stroke.
    const trailLen = rig.cap * 0.4;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    const steps = 12;
    for (let i = 0; i < steps; i++) {
      const back = (i / steps) * trailLen;
      const p0 = rig.dPen.pointAt(s - back);
      if (p0.sub !== head.sub) break;
      const f = 1 - i / steps;
      ctx.globalAlpha = 0.13 * f * f * tipGlow;
      ctx.strokeStyle = "rgba(255,236,196,1)";
      ctx.lineWidth = rig.dPenWidths[p0.sub] * 0.9 * (0.4 + f * 0.6);
      const p1 = rig.dPen.pointAt(s - back - trailLen / steps);
      if (p1.sub !== head.sub) break;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  /** Once written, the d is just the letterform. */
  renderDone(ctx: CanvasRenderingContext2D) {
    const rig = this.rig;
    drawRaster(ctx, rig.dBone, rig.dBox.x, rig.dBox.y);
  }
}
