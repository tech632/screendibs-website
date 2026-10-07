import { clamp01, easeInOutCubic, easeOutCubic, smoothstep } from "../easing";
import { ValueNoise } from "../noise";
import { rgb, CREAM, CREAM_DEEP, CREAM_LIT } from "../palette";
import type { Rig } from "./rig";
import type { FrontRef } from "./starfield";

const ANGLES = 192;

/**
 * Beat 4 — the merge becomes a sunrise.
 *
 * The instant the five arms meet, a wavefront leaves the hub and floods the
 * frame with cream. It is not a flat circle: its radius is modulated per angle
 * by a noise ring, so it advances like light spilling over a horizon. The mark
 * inverts from bone to ink exactly where the front passes it, and the stars it
 * overtakes are consumed.
 */
export class Sunrise {
  /** Per-angle radius multipliers, ~0.94 .. 1.06. */
  private wobble: Float32Array;

  constructor(private rig: Rig) {
    const n = new ValueNoise(88221, 64);
    this.wobble = new Float32Array(ANGLES);
    for (let i = 0; i < ANGLES; i++) {
      const a = (i / ANGLES) * Math.PI * 2;
      // Sampled on a circle so the ring is seamless where it wraps.
      const v = n.fbm(8 + Math.cos(a) * 3.2, 8 + Math.sin(a) * 3.2, 3, 2, 0.55);
      this.wobble[i] = 1 + (v - 0.5) * 0.14;
    }
  }

  /**
   * Base radius at sunrise progress `p`. Deliberately eased in and out rather
   * than snapped outward — an ease-out curve covers the far corners inside the
   * first fifth of the phase and the travelling front is the whole point.
   */
  private baseRadius(p: number) {
    return easeInOutCubic(clamp01(p)) * this.rig.diag * 1.06;
  }

  /** A front description the starfield can query. */
  frontRef(p: number): FrontRef | null {
    if (p <= 0) return null;
    const R = this.baseRadius(p);
    // The wobble flattens out as the front grows — a huge wave reads smooth.
    const amp = 1 - smoothstep(0.15, 0.75, p);
    const rig = this.rig;
    const wob = this.wobble;
    return {
      cx: rig.astCx,
      cy: rig.astCy,
      radiusAt(x, y) {
        const a = Math.atan2(y - rig.astCy, x - rig.astCx);
        const i = ((((a / (Math.PI * 2)) * ANGLES) | 0) % ANGLES + ANGLES) % ANGLES;
        return R * (1 + (wob[i] - 1) * amp);
      },
    };
  }

  /** Trace the wobbled wavefront into the current path. */
  private tracePath(ctx: CanvasRenderingContext2D, p: number) {
    const R = this.baseRadius(p);
    const amp = 1 - smoothstep(0.15, 0.75, p);
    const rig = this.rig;
    ctx.beginPath();
    for (let i = 0; i <= ANGLES; i++) {
      const idx = i % ANGLES;
      const a = (idx / ANGLES) * Math.PI * 2;
      const r = R * (1 + (this.wobble[idx] - 1) * amp);
      const x = rig.astCx + Math.cos(a) * r;
      const y = rig.astCy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    return R;
  }

  /**
   * Paint the wash. Returns the region path so the caller can reuse it to clip
   * the ink version of the mark.
   *
   * @param p 0..1 through the sunrise phase
   */
  render(ctx: CanvasRenderingContext2D, p: number, t: number) {
    if (p <= 0) return;
    const rig = this.rig;

    ctx.save();
    this.tracePath(ctx, p);

    ctx.fillStyle = this.fieldGradient(ctx);
    ctx.fill();

    // The advancing rim, riding the wobble. Kept genuinely hot — at low alpha
    // an orange stroke over black reads as mud, not fire.
    const rimFade = 1 - smoothstep(0.55, 0.95, p);
    if (rimFade > 0.01) {
      ctx.globalCompositeOperation = "lighter";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 0.72 * rimFade;
      ctx.strokeStyle = "rgba(247,120,70,1)";
      ctx.lineWidth = Math.max(5, rig.cap * 0.1);
      ctx.stroke();
      ctx.globalAlpha = 0.95 * rimFade;
      ctx.strokeStyle = "rgba(255,250,238,1)";
      ctx.lineWidth = Math.max(1.5, rig.cap * 0.014);
      ctx.stroke();
    }
    ctx.restore();

    // The sun itself, sitting where the arms met. It swells hard, then settles
    // into exactly the bloom the idle state keeps, so the handoff is seamless.
    this.drawSun(ctx, t, p);
    this.drawHorizonLift(ctx, t, smoothstep(0.72, 1, p));
  }

  /**
   * The cream field. Anchored to the frame, not to the current front radius,
   * so the light has a fixed source and the wash travels *over* it instead of
   * dragging the whole gradient along with it.
   */
  private fieldGradient(ctx: CanvasRenderingContext2D) {
    const rig = this.rig;
    const g = ctx.createRadialGradient(
      rig.astCx,
      rig.astCy,
      0,
      rig.astCx,
      rig.astCy,
      Math.max(1, rig.diag * 0.95),
    );
    g.addColorStop(0, rgb(CREAM_LIT));
    g.addColorStop(0.34, rgb(CREAM));
    g.addColorStop(1, rgb(CREAM_DEEP));
    return g;
  }

  /**
   * Shared by the live phase and the idle loop — identical at p = 1, so the
   * handoff to idle is invisible. Kept broad and low-intensity: the sun should
   * feel like the room is lit, not like a lamp is pointed at the viewer.
   */
  private drawSun(ctx: CanvasRenderingContext2D, t: number, p: number) {
    const rig = this.rig;
    const coreR =
      rig.cap *
      (0.4 + easeOutCubic(clamp01(p * 1.4)) * 3.4) *
      (1 + Math.sin(t * 0.55) * 0.03);
    // Blinding at the moment of ignition, then off the gas quickly — held high
    // it blows the whole washed region out to white and the beige never lands.
    const coreA = 1 - smoothstep(0, 0.45, p) * 0.78;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const g = ctx.createRadialGradient(
      rig.astCx,
      rig.astCy,
      0,
      rig.astCx,
      rig.astCy,
      Math.max(1, coreR),
    );
    // Warm white at the core falling off through the brand coral.
    g.addColorStop(0, `rgba(255,251,240,${0.85 * coreA})`);
    g.addColorStop(0.18, `rgba(252,214,168,${0.32 * coreA})`);
    g.addColorStop(0.45, `rgba(247,140,105,${0.1 * coreA})`);
    g.addColorStop(1, "rgba(247,109,82,0)");
    ctx.fillStyle = g;
    ctx.fillRect(rig.astCx - coreR, rig.astCy - coreR, coreR * 2, coreR * 2);
    ctx.restore();
  }

  /** A slow warm rise off the lower edge, so the cream never reads as paint. */
  private drawHorizonLift(ctx: CanvasRenderingContext2D, t: number, amount: number) {
    if (amount <= 0.001) return;
    const rig = this.rig;
    const lg = ctx.createLinearGradient(0, rig.h, 0, rig.h * 0.35);
    const k = (0.1 + Math.sin(t * 0.4) * 0.02) * amount;
    lg.addColorStop(0, `rgba(206,196,168,${k})`);
    lg.addColorStop(1, "rgba(206,196,168,0)");
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, rig.w, rig.h);
  }

  /** Clip to the washed region — used to swap the mark to ink in place. */
  clipToFront(ctx: CanvasRenderingContext2D, p: number) {
    this.tracePath(ctx, p);
    ctx.clip();
  }

  /** Steady state once the sequence has run: cream field, breathing sun. */
  renderIdle(ctx: CanvasRenderingContext2D, t: number) {
    const rig = this.rig;
    // The front has long since swallowed the frame, so the clip is redundant.
    ctx.fillStyle = this.fieldGradient(ctx);
    ctx.fillRect(0, 0, rig.w, rig.h);

    this.drawSun(ctx, t, 1);
    this.drawHorizonLift(ctx, t, 1);
  }
}
