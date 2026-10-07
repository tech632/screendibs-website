import { clamp01, smoothstep } from "../easing";
import { mulberry32, rand, type Rng } from "../rng";
import type { Rig } from "./rig";

export interface Star {
  x: number;
  y: number;
  r: number;
  /** Resting brightness. */
  base: number;
  /** Twinkle phase + rate. */
  tw: number;
  tws: number;
  /** Parallax factor, 0.3 (far) .. 1 (near). */
  depth: number;
  /** Taken over by the asterisk gather — the field stops drawing it. */
  claimed: boolean;
  /** 0..1 dissolve, driven by the sunrise wavefront. */
  burn: number;
}

export interface FrontRef {
  cx: number;
  cy: number;
  /** Radius per angle-bucket, or null when no front is active. */
  radiusAt: (x: number, y: number) => number;
}

/** Brightness of a star right now, before any fades. */
export function starBrightness(s: Star, t: number) {
  const flicker = 0.72 + 0.28 * Math.sin(s.tw + t * s.tws);
  return s.base * flicker;
}

export class Starfield {
  readonly stars: Star[] = [];
  private rng: Rng;

  constructor(rig: Rig, seed = 20260722) {
    this.rng = mulberry32(seed);
    const count = Math.round(
      Math.min(1100, Math.max(260, (rig.w * rig.h) / 3400)),
    );
    for (let i = 0; i < count; i++) {
      const r = this.rng;
      const depth = rand(r, 0.28, 1);
      this.stars.push({
        x: r() * rig.w,
        y: r() * rig.h,
        // Near stars are bigger and brighter — cheap depth cue.
        r: rand(r, 0.35, 1.05) * (0.55 + depth * 0.85),
        base: rand(r, 0.18, 0.95) * (0.4 + depth * 0.7),
        tw: r() * Math.PI * 2,
        tws: rand(r, 0.5, 2.4),
        depth,
        claimed: false,
        burn: 0,
      });
    }
  }

  /**
   * Hand out `n` stars for the asterisk, preferring bright ones so the arms are
   * built from stars the eye was already tracking.
   */
  claim(n: number): Star[] {
    const pool = this.stars
      .filter((s) => !s.claimed)
      .sort((a, b) => b.base * b.depth - a.base * a.depth)
      .slice(0, Math.min(this.stars.length, n * 3));
    // Shuffle the shortlist so the arms aren't built strictly brightest-first.
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const out = pool.slice(0, n);
    out.forEach((s) => (s.claimed = true));
    return out;
  }

  /** Dissolve stars the beige wavefront has swept past. */
  applyFront(front: FrontRef | null) {
    if (!front) return;
    for (const s of this.stars) {
      const d = Math.hypot(s.x - front.cx, s.y - front.cy);
      const edge = front.radiusAt(s.x, s.y);
      // Inside the front (d < edge) the star is consumed by the light. Burn is
      // monotonic — once taken, a star never comes back.
      s.burn = Math.max(s.burn, 1 - smoothstep(edge - 130, edge + 10, d));
    }
  }

  draw(ctx: CanvasRenderingContext2D, t: number, globalAlpha: number, rig: Rig) {
    if (globalAlpha <= 0.001) return;
    // A slow rightward/upward drift keeps the sky alive without being noticed.
    const driftX = Math.sin(t * 0.07) * 9;
    const driftY = -t * 1.6;

    ctx.save();
    for (const s of this.stars) {
      if (s.claimed) continue;
      const a = clamp01(starBrightness(s, t) * globalAlpha * (1 - s.burn));
      if (a <= 0.004) continue;
      const x = s.x + driftX * s.depth;
      const y = ((s.y + driftY * s.depth) % (rig.h + 40) + rig.h + 40) % (rig.h + 40);

      ctx.globalAlpha = a;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();

      // The brightest few get a soft halo so the field has some sparkle.
      if (s.r > 1.25 && a > 0.55) {
        ctx.globalAlpha = a * 0.16;
        ctx.beginPath();
        ctx.arc(x, y, s.r * 4.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}
