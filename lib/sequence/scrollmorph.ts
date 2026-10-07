import {
  clamp01,
  easeInOutCubic,
  easeOutCubic,
  lerp,
  remap,
  smoothstep,
} from "../easing";
import { INK, rgb } from "../palette";
import { mulberry32 } from "../rng";
import { drawSd, pathAsteriskAt, type Lockup, type Rig } from "./rig";

/**
 * The scroll act. Once the intro has settled, the centred mark is bound to
 * scroll position rather than to a clock:
 *
 *   ABSORB  the asterisk eats the "Sd" right-to-left; the letterforms erode
 *           into motes that stream into it
 *   TRAVEL  the loaded asterisk turns once and flies to the top-left, the
 *           motes orbiting it like an electron shell
 *   REWRITE the motes stream back out and the "Sd" reassembles at nav scale,
 *           swaying left and right before it settles
 *
 * Every value is a pure function of the scroll fraction, so the whole thing
 * scrubs and reverses exactly.
 */

const ABSORB = [0.0, 0.34] as const;
const TRAVEL = [0.3, 0.7] as const;
const REWRITE = [0.66, 1.0] as const;

/** Share of the erosion sweep a single mote's flight occupies. */
const FLIGHT = 0.4;
/** Peak raggedness of the erosion boundary, as a share of the "Sd" width. */
const EDGE_AMP = 0.045;

interface Mote {
  u: number;
  v: number;
  /** Orbit parameters for the travel leg. */
  orbR: number;
  orbPhase: number;
  orbTilt: number;
  size: number;
  /** Per-mote arc on the way in/out. */
  bow: number;
}

export class ScrollMorph {
  private motes: Mote[] = [];
  /** Ragged profile of the erosion boundary, -1..1 per vertical sample. */
  private edge: Float32Array;

  constructor(private rig: Rig) {
    const rnd = mulberry32(4242);
    const N = 22;
    this.edge = new Float32Array(N + 1);
    let prev = 0;
    for (let i = 0; i <= N; i++) {
      // Smoothed random walk, so the boundary wanders rather than jitters.
      prev = prev * 0.55 + (rnd() * 2 - 1) * 0.45;
      this.edge[i] = prev;
    }
    const src = rig.motes;
    for (let i = 0; i < src.length; i += 2) {
      this.motes.push({
        u: src[i],
        v: src[i + 1],
        orbR: 0.55 + rnd() * 1.15,
        orbPhase: rnd() * Math.PI * 2,
        orbTilt: 0.35 + rnd() * 0.65,
        size: 0.7 + rnd() * 1.1,
        bow: (rnd() - 0.5) * 0.5,
      });
    }
  }

  /** Where the asterisk is, and how big, at scroll fraction s. */
  private asterisk(s: number) {
    const { hero, corner } = this.rig;
    const k = easeInOutCubic(clamp01(remap(s, TRAVEL[0], TRAVEL[1])));
    // Arc the flight up and out rather than cutting the diagonal.
    const mx = lerp(hero.astCx, corner.astCx, 0.5) + (corner.astCx - hero.astCx) * 0.18;
    const my = lerp(hero.astCy, corner.astCy, 0.5) - Math.abs(hero.astCx - corner.astCx) * 0.1;
    const it = 1 - k;
    const cx = it * it * hero.astCx + 2 * it * k * mx + k * k * corner.astCx;
    const cy = it * it * hero.astCy + 2 * it * k * my + k * k * corner.astCy;
    return {
      cx,
      cy,
      r: lerp(hero.astR, corner.astR, k),
      // Exactly one turn, so it lands square.
      rot: k * Math.PI * 2,
      k,
    };
  }

  /** Damped left-right sway applied to the reassembling "Sd". */
  private sway(s: number) {
    const r = clamp01(remap(s, REWRITE[0], REWRITE[1]));
    if (r <= 0 || r >= 1) return 0;
    const decay = Math.pow(1 - r, 1.8);
    return this.rig.corner.cap * 1.35 * Math.cos(r * Math.PI * 4.5) * decay;
  }

  /**
   * @param s 0..1 scroll fraction through the transition
   */
  render(ctx: CanvasRenderingContext2D, s: number) {
    const { hero, corner } = this.rig;
    const ink = rgb(INK);

    const absorbT = easeInOutCubic(clamp01(remap(s, ABSORB[0], ABSORB[1])));
    // The erosion front has to run past the right-hand edge by a whole flight
    // time, or the last motes never get a full flight and freeze mid-air.
    const sweep = absorbT * (1 + FLIGHT);
    const rewriteT = clamp01(remap(s, REWRITE[0], REWRITE[1]));
    const ast = this.asterisk(s);
    const swayX = this.sway(s);

    // --- the asterisk ------------------------------------------------------
    ctx.save();
    ctx.fillStyle = ink;
    pathAsteriskAt(ctx, ast.cx, ast.cy, ast.r, ast.rot);
    ctx.fill();
    ctx.restore();

    // --- the solid part of the Sd ------------------------------------------
    // During absorb the hero lockup erodes from its right edge; during rewrite
    // the corner lockup grows back from the asterisk the same way. At either
    // extreme the letterforms are whole and must be drawn with no clip at all —
    // a boundary sitting exactly on the ink edge still bites into it, because
    // the edge is ragged.
    if (rewriteT <= 0) {
      const frontU = clamp01(1 - sweep);
      if (frontU >= 0.999) drawSd(ctx, hero, ink);
      else if (frontU > 0.001) this.clippedSd(ctx, hero, ink, frontU, "left", 0);
    } else {
      // Solid exactly where a mote has already landed. This schedule and the
      // one in motePos() must agree or the letterforms tear.
      const frontU = 1 - clamp01((rewriteT - 0.45) / 0.5);
      if (frontU <= 0.001) {
        ctx.save();
        ctx.translate(swayX, 0);
        drawSd(ctx, corner, ink);
        ctx.restore();
      } else if (frontU < 0.999) {
        this.clippedSd(ctx, corner, ink, frontU, "right", swayX);
      }
    }

    // --- motes -------------------------------------------------------------
    ctx.save();
    ctx.fillStyle = ink;
    for (const m of this.motes) {
      const p = this.motePos(m, sweep, rewriteT, ast, swayX);
      if (!p) continue;
      ctx.globalAlpha = p.a;
      const r = m.size * p.scale;
      if (r < 0.35) continue;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  /**
   * Draw the Sd of `lk` kept only on one side of a moving vertical boundary.
   * The boundary is deliberately ragged — a dead-straight cut through a
   * letterform reads as a crop, not as erosion.
   *
   * @param keep "left" during absorb (what has not been eaten yet),
   *             "right" during rewrite (what has already reassembled).
   */
  private clippedSd(
    ctx: CanvasRenderingContext2D,
    lk: Lockup,
    color: string,
    uEdge: number,
    keep: "left" | "right",
    dx: number,
  ) {
    const { sd, cap } = lk;
    const top = sd.y - cap * 0.35;
    const bottom = sd.y + sd.h + cap * 0.35;
    const far = keep === "left" ? sd.x - cap : sd.x + sd.w + cap;

    // Raggedness swells in the middle of the sweep and vanishes at both ends,
    // so the boundary never chews into an edge of a letterform that is meant
    // to be whole, and there is no step when the clip engages.
    const amp = EDGE_AMP * Math.sin(Math.PI * clamp01(uEdge));

    ctx.save();
    ctx.translate(dx, 0);
    ctx.beginPath();
    ctx.moveTo(far, top);
    const N = this.edge.length - 1;
    for (let i = 0; i <= N; i++) {
      const y = top + ((bottom - top) * i) / N;
      const x = sd.x + (uEdge + this.edge[i] * amp) * sd.w;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(far, bottom);
    ctx.closePath();
    ctx.clip();
    drawSd(ctx, lk, color);
    ctx.restore();
  }

  private project(lk: Lockup, m: Mote): [number, number] {
    return [lk.sd.x + m.u * lk.sd.w, lk.sd.y + m.v * lk.sd.h];
  }

  private motePos(
    m: Mote,
    sweep: number,
    rewriteT: number,
    ast: { cx: number; cy: number; r: number; k: number },
    swayX: number,
  ): { x: number; y: number; a: number; scale: number } | null {
    // --- outbound: hero letterform -> asterisk ------------------------------
    if (rewriteT <= 0) {
      const past = sweep - (1 - m.u);
      if (past <= 0) return null; // the front hasn't reached it yet
      const f = clamp01(past / FLIGHT);
      if (f >= 1) return this.orbit(m, ast, 0);
      const [x0, y0] = this.project(this.rig.hero, m);
      return this.arc(x0, y0, ast.cx, ast.cy, m.bow, easeInOutCubic(f), 1 - f * 0.35);
    }

    // --- inbound: asterisk -> corner letterform -----------------------------
    const depart = (1 - m.u) * 0.5;
    const f = clamp01((rewriteT - depart) / 0.45);
    if (f <= 0) return this.orbit(m, ast, 1);
    if (f >= 1) return null; // landed; the solid glyph covers it
    const [x1, y1] = this.project(this.rig.corner, m);
    const e = easeOutCubic(f);
    // The sway rides in on the motes too, easing to the glyph's own offset.
    const p = this.arc(ast.cx, ast.cy, x1 + swayX, y1, -m.bow, e, 0.65 + f * 0.35);
    return p;
  }

  /** Quadratic arc between two points, bowed perpendicular to the chord. */
  private arc(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    bow: number,
    t: number,
    scale: number,
  ) {
    const mx = (x0 + x1) / 2 - (y1 - y0) * bow;
    const my = (y0 + y1) / 2 + (x1 - x0) * bow;
    const it = 1 - t;
    return {
      x: it * it * x0 + 2 * it * t * mx + t * t * x1,
      y: it * it * y0 + 2 * it * t * my + t * t * y1,
      a: 1,
      scale,
    };
  }

  /**
   * Held state between absorb and rewrite: a tight shell around the travelling
   * asterisk. `phase` 0 = just swallowed, 1 = about to be spat back out.
   */
  private orbit(
    m: Mote,
    ast: { cx: number; cy: number; r: number; k: number },
    phase: number,
  ) {
    const spin = m.orbPhase + ast.k * Math.PI * 2 * m.orbTilt + phase * 0.4;
    const rad = ast.r * (0.85 + m.orbR * 0.7);
    // Squash the shell into an ellipse so it reads as depth, not a flat ring.
    return {
      x: ast.cx + Math.cos(spin) * rad,
      y: ast.cy + Math.sin(spin) * rad * (0.4 + m.orbTilt * 0.5),
      a: 0.5 + 0.5 * Math.sin(spin * 2),
      scale: 0.55,
    };
  }

  /** Opacity of the hero-scale mark, so the intro can hand over cleanly. */
  static heroFade(s: number) {
    return 1 - smoothstep(0, 0.12, s);
  }
}
