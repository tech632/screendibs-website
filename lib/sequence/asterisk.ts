import { clamp01, easeInOutCubic, easeOutBack, easeOutCubic, lerp, pulse, smoothstep } from "../easing";
import { BONE, rgb } from "../palette";
import { mulberry32, type Rng } from "../rng";
import { pointInQuad, type ArmQuad, type Rig } from "./rig";
import type { Star, Starfield } from "./starfield";

/** Stars pulled out of the sky per arm. */
const PER_ARM = 38;
/** Arms ignite one after another rather than all at once. */
const ARM_STAGGER = 0.055;
/** How long the tip→hub sweep takes, in phase-normalised time. */
const SWEEP = 0.42;
/** Flight time of a single star. */
const FLIGHT = 0.34;

interface Traveller {
  star: Star;
  /** Launch point, frozen at claim time. */
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  /** Quadratic bezier control point — gives the approach an arc. */
  cx: number;
  cy: number;
  t0: number;
  arm: number;
  /** 0 at the hub, 1 at the tip. */
  u: number;
  spin: number;
}

const qbez = (a: number, b: number, c: number, t: number) => {
  const it = 1 - t;
  return it * it * a + 2 * it * t * b + t * t * c;
};

/**
 * Beat 3 — the asterisk is assembled out of the sky.
 *
 * Five clusters of existing stars break formation and fly into the five arms.
 * They arrive tip-first, so each arm appears to grow inward, and the five
 * growing arms converge on the hub at the same instant — which is the moment
 * the sunrise is triggered from.
 */
export class AsteriskGather {
  private rng: Rng = mulberry32(770722);
  private travellers: Traveller[] = [];
  private claimed = false;

  constructor(private rig: Rig) {}

  /** Called once, the frame the gather phase opens. */
  private claim(field: Starfield) {
    const rig = this.rig;
    const stars = field.claim(PER_ARM * 5);
    let k = 0;
    for (let a = 0; a < 5; a++) {
      const arm = rig.arms[a];
      const targets = this.sampleArm(arm, PER_ARM);
      for (const [tx, ty, u] of targets) {
        const star = stars[k++];
        if (!star) break;
        // Bow the flight path sideways so the swarm curves in rather than
        // collapsing along straight radii.
        const mx = (star.x + tx) / 2;
        const my = (star.y + ty) / 2;
        const dx = tx - star.x;
        const dy = ty - star.y;
        const bow = (this.rng() - 0.5) * 0.42;
        this.travellers.push({
          star,
          x0: star.x,
          y0: star.y,
          x1: tx,
          y1: ty,
          cx: mx - dy * bow,
          cy: my + dx * bow,
          t0: a * ARM_STAGGER + (1 - u) * SWEEP,
          arm: a,
          u,
          spin: this.rng() * Math.PI * 2,
        });
      }
    }
    this.claimed = true;
  }

  /** Rejection-sample points inside an arm, returning [x, y, u]. */
  private sampleArm(arm: ArmQuad, n: number): Array<[number, number, number]> {
    const xs = arm.pts.map((p) => p[0]);
    const ys = arm.pts.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const out: Array<[number, number, number]> = [];
    let guard = 0;
    while (out.length < n && guard++ < n * 200) {
      const x = lerp(minX, maxX, this.rng());
      const y = lerp(minY, maxY, this.rng());
      if (!pointInQuad(x, y, arm.pts)) continue;
      const d = Math.hypot(x - this.rig.astCx, y - this.rig.astCy);
      out.push([x, y, clamp01(d / this.rig.astR)]);
    }
    // Tips first, so flight delays and the arm sweep stay in lockstep.
    out.sort((a, b) => b[2] - a[2]);
    return out;
  }

  /** How far arm `a` has filled from tip toward hub, 0..1. */
  private armFill(a: number, g: number) {
    return clamp01((g - a * ARM_STAGGER - FLIGHT) / SWEEP);
  }

  /**
   * @param g   0..1 through the gather phase
   * @param f   0..1 through the fuse phase (hub + flash)
   */
  render(
    ctx: CanvasRenderingContext2D,
    g: number,
    f: number,
    field: Starfield,
  ) {
    const rig = this.rig;
    if (!this.claimed) this.claim(field);

    // --- filled arms --------------------------------------------------------
    ctx.save();
    ctx.fillStyle = rgb(BONE);
    for (let a = 0; a < 5; a++) {
      const q = this.armFill(a, g);
      if (q <= 0) continue;
      const [p0, p1, p2, p3] = rig.arms[a].pts;
      const back = 1 - q;
      const ax = lerp(p0[0], p1[0], back);
      const ay = lerp(p0[1], p1[1], back);
      const dx = lerp(p3[0], p2[0], back);
      const dy = lerp(p3[1], p2[1], back);
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(dx, dy);
      ctx.closePath();
      ctx.fill();

      // Hot leading edge on the inward-growing boundary.
      if (q < 1) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.75;
        ctx.strokeStyle = "rgba(255,252,240,1)";
        ctx.lineWidth = Math.max(1.2, rig.astR * 0.045);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(dx, dy);
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.restore();

    // --- travelling stars ---------------------------------------------------
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const tr of this.travellers) {
      const local = (g - tr.t0) / FLIGHT;
      // Before launch a traveller must keep looking exactly like the star the
      // field was drawing a frame ago, or 190 stars visibly pop at once.
      const r0 = tr.star.r;
      const a0 = tr.star.base;

      if (local < -0.35) {
        // Still in the sky, but already trembling — the pull is felt first.
        const jitter = Math.sin(g * 22 + tr.spin) * 0.9;
        this.dot(ctx, tr.x0 + jitter, tr.y0, r0, a0);
        continue;
      }
      if (local >= 1) continue;
      if (local < 0) {
        // Wind-up: drift back a touch before launching.
        const w = (local + 0.35) / 0.35;
        const bx = tr.x0 - (tr.x1 - tr.x0) * 0.05 * w;
        const by = tr.y0 - (tr.y1 - tr.y0) * 0.05 * w;
        this.dot(ctx, bx, by, r0 + w * 0.6, a0 + (1 - a0) * w);
        continue;
      }

      const e = easeInOutCubic(local);
      const x = qbez(tr.x0, tr.cx, tr.x1, e);
      const y = qbez(tr.y0, tr.cy, tr.y1, e);
      const e2 = easeInOutCubic(Math.max(0, local - 0.05));
      const px = qbez(tr.x0, tr.cx, tr.x1, e2);
      const py = qbez(tr.y0, tr.cy, tr.y1, e2);

      // Streak along the direction of travel, brightest at mid-flight. The
      // length is capped rather than derived from raw speed — a long-haul star
      // crossing the frame would otherwise trail a line the width of the page.
      const dx = x - px;
      const dy = y - py;
      const speed = Math.hypot(dx, dy);
      const bright = 0.5 + 0.5 * Math.sin(local * Math.PI);
      const len = Math.min(rig.astR * 0.55, speed * 1.9);
      if (speed > 0.01 && len > 1) {
        const nx = dx / speed;
        const ny = dy / speed;
        ctx.globalAlpha = 0.42 * bright;
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = 1.1;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x - nx * len, y - ny * len);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      this.dot(ctx, x, y, 1.1 + Math.min(1.2, speed * 0.04), 0.75 + bright * 0.25);

      // Touchdown flare.
      if (local > 0.88) {
        const k = pulse((local - 0.88) / 0.12, 0.4);
        this.dot(ctx, tr.x1, tr.y1, 2 + k * rig.astR * 0.09, k * 0.9);
      }
    }
    ctx.restore();

    // --- hub + fuse flash ---------------------------------------------------
    const allFilled = Math.min(...[0, 1, 2, 3, 4].map((a) => this.armFill(a, g)));
    const hubT = f > 0 ? f : allFilled >= 1 ? 1 : 0;
    if (hubT > 0) {
      const s = easeOutBack(clamp01(hubT / 0.45));
      ctx.save();
      ctx.fillStyle = rgb(BONE);
      ctx.beginPath();
      ctx.arc(rig.astCx, rig.astCy, rig.hubR * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // The five arms meeting is the ignition for the sunrise: a hard white
      // flash and an expanding shock ring.
      const flash = pulse(clamp01(hubT), 0.16);
      if (flash > 0.01) {
        const rad = rig.astR * (0.6 + easeOutCubic(clamp01(hubT)) * 7);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const grd = ctx.createRadialGradient(
          rig.astCx,
          rig.astCy,
          0,
          rig.astCx,
          rig.astCy,
          rad,
        );
        grd.addColorStop(0, `rgba(255,252,242,${0.95 * flash})`);
        grd.addColorStop(0.18, `rgba(255,226,168,${0.6 * flash})`);
        grd.addColorStop(0.55, `rgba(255,168,72,${0.18 * flash})`);
        grd.addColorStop(1, "rgba(255,140,40,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(rig.astCx - rad, rig.astCy - rad, rad * 2, rad * 2);

        const ringR = rig.astR * (1 + easeOutCubic(clamp01(hubT * 1.4)) * 5);
        ctx.globalAlpha = flash * 0.5 * (1 - smoothstep(0.3, 1, hubT));
        ctx.strokeStyle = "rgba(255,244,214,1)";
        ctx.lineWidth = Math.max(1, rig.astR * 0.09 * (1 - hubT));
        ctx.beginPath();
        ctx.arc(rig.astCx, rig.astCy, ringR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  private dot(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    a: number,
  ) {
    ctx.globalAlpha = a;
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}
