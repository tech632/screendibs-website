import { clamp01, smoothstep } from "../easing";
import { ScrollMorph } from "./scrollmorph";
import { Forge, type EmitOpts } from "./forge";
import { renderFuse } from "./fuse";
import { Sparks } from "./particles";
import { buildRig, type Rig } from "./rig";
import { Starfield } from "./starfield";
import { Sunrise } from "./sunrise";
import { phaseT, TOTAL } from "./timeline";

export interface EngineOptions {
  /** Fires every frame with 0..1 settle progress, for the DOM copy + page bg. */
  onProgress?: (t: number, settle: number) => void;
  reducedMotion?: boolean;
  /**
   * Freeze the sequence at a fixed second and hold it there. Driven by `?t=`
   * in dev so any single frame of the choreography can be inspected.
   */
  seek?: number | null;
}

/**
 * Owns the canvas, the clock, and the render order. Every beat is an
 * independent object that knows how to paint itself at a given progress; this
 * class decides which ones are live and hands them a context.
 */
export class Sequence {
  private ctx: CanvasRenderingContext2D;
  /**
   * The parked mark lives on its own fixed, transparent canvas above the page
   * content, so it stays pinned to the corner while the hero scrolls away.
   * Handover happens at scrollY 0, where hero and viewport coordinates
   * coincide, so it is seamless.
   */
  private markCtx: CanvasRenderingContext2D;
  private morph!: ScrollMorph;
  private scrollFrac = 0;
  private rig!: Rig;
  private stars!: Starfield;
  private forge!: Forge;
  private sunrise!: Sunrise;
  private sparks = new Sparks(720);

  private raf = 0;
  private startedAt = 0;
  private last = 0;
  /** Seconds into the sequence. Clamped at TOTAL, then idle takes over. */
  private t = 0;
  private disposed = false;
  /** Set once fonts have loaded. Guards `resize()` so the rig is never built
   *  against fallback font metrics by an early ResizeObserver callback. */
  private ready = false;
  private cssW = 0;
  private cssH = 0;
  private dpr = 1;

  private emit = (x: number, y: number, o: EmitOpts) => {
    this.sparks.emit({ x, y, ...o });
  };

  constructor(
    private canvas: HTMLCanvasElement,
    private markCanvas: HTMLCanvasElement,
    private opts: EngineOptions = {},
  ) {
    const ctx = canvas.getContext("2d", { alpha: false });
    const mctx = markCanvas.getContext("2d");
    if (!ctx || !mctx) throw new Error("2d context unavailable");
    this.ctx = ctx;
    this.markCtx = mctx;
  }

  /** Scroll fraction through the corner transition, 0..1. */
  setScroll(frac: number) {
    this.scrollFrac = clamp01(frac);
    // Past the intro the loop is idling; repaint immediately so scrubbing
    // tracks the wheel instead of waiting on the next frame.
    if (this.ready && this.t >= TOTAL) this.renderFrame(0);
  }

  async init() {
    // System-stack glyphs are usually ready instantly, but wait anyway — a
    // rig built against a fallback metric would be subtly wrong.
    if (document.fonts?.ready) {
      try {
        await document.fonts.ready;
      } catch {
        /* non-fatal */
      }
    }
    if (this.disposed) return;
    this.ready = true;
    this.resize();
    if (this.opts.seek != null) {
      this.t = this.opts.seek;
      // Two passes: effects that lazily initialise on first render need a
      // frame before they paint anything.
      this.renderFrame(1 / 60);
      this.renderFrame(1 / 60);
      this.opts.onProgress?.(this.t, phaseT(this.t, "settle"));
      return;
    }
    if (this.opts.reducedMotion) {
      this.t = TOTAL;
      this.renderFrame(0);
      this.opts.onProgress?.(TOTAL, 1);
      return;
    }
    this.startedAt = performance.now();
    this.last = this.startedAt;
    this.loop();
  }

  resize() {
    if (!this.ready || this.disposed) return;
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (w === this.cssW && h === this.cssH && dpr === this.dpr && this.rig) return;

    this.cssW = w;
    this.cssH = h;
    this.dpr = dpr;

    for (const c of [this.canvas, this.markCanvas]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.markCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.rig = buildRig(w, h, dpr);
    this.morph = new ScrollMorph(this.rig);
    this.stars = new Starfield(this.rig);
    this.forge = new Forge(this.rig);
    this.sunrise = new Sunrise(this.rig);
    this.sparks.clear();

    if (this.opts.seek != null) {
      this.t = this.opts.seek;
      this.renderFrame(1 / 60);
      this.renderFrame(1 / 60);
    } else if (this.opts.reducedMotion || this.t >= TOTAL) {
      this.t = TOTAL;
      this.renderFrame(0);
    }
  }

  /** Jump to the end — used by the skip affordance. */
  skip() {
    if (this.t >= TOTAL) return;
    this.t = TOTAL;
    this.startedAt = performance.now() - TOTAL * 1000;
    this.sparks.clear();
  }

  get finished() {
    return this.t >= TOTAL;
  }

  private loop = () => {
    if (this.disposed) return;
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.t = Math.min(TOTAL + 1e6, (now - this.startedAt) / 1000);

    this.renderFrame(dt);
    this.opts.onProgress?.(this.t, phaseT(this.t, "settle"));
    this.raf = requestAnimationFrame(this.loop);
  };

  private renderFrame(dt: number) {
    const { ctx, rig } = this;
    const t = this.t;
    const w = rig.w;
    const h = rig.h;

    this.sparks.update(dt);

    // The mark canvas is only live once the intro has handed over.
    this.markCtx.clearRect(0, 0, w, h);
    if (t >= TOTAL) this.morph.render(this.markCtx, this.scrollFrac);

    // --- 0. the sky ---------------------------------------------------------
    const sunP = phaseT(t, "sunrise");
    const front = sunP > 0 ? this.sunrise.frontRef(sunP) : null;

    if (t >= TOTAL) {
      this.sunrise.renderIdle(ctx, t);
    } else {
      ctx.fillStyle = "#0b0b0c";
      ctx.fillRect(0, 0, w, h);
      // A barely-there nebula so the black isn't dead flat.
      const neb = ctx.createRadialGradient(
        rig.astCx,
        rig.astCy,
        0,
        rig.astCx,
        rig.astCy,
        rig.diag * 0.6,
      );
      neb.addColorStop(0, "rgba(38,36,44,0.55)");
      neb.addColorStop(1, "rgba(10,10,12,0)");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, w, h);

      this.stars.applyFront(front);
      this.stars.draw(ctx, t, smoothstep(0, 1, phaseT(t, "sky")), rig);

      // Vignette belongs to the night, so it goes down before the wash — drawn
      // afterwards it just muddies the beige.
      const night = 1 - smoothstep(0, 0.35, sunP);
      if (night > 0.01) {
        const vg = ctx.createRadialGradient(
          w / 2,
          h / 2,
          Math.min(w, h) * 0.25,
          w / 2,
          h / 2,
          rig.diag * 0.72,
        );
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, `rgba(0,0,0,${0.55 * night})`);
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, w, h);
      }
    }

    // Idle: just the beige field and its breathing sun. The mark itself now
    // belongs to the fixed canvas, which owns it for the rest of the page.
    if (t >= TOTAL) return;

    // --- 1. forge the mark --------------------------------------------------
    // One burn front runs the whole lockup. Once it has passed, the mark is
    // just the finished object.
    const forgeP = phaseT(t, "forge");
    if (forgeP >= 1) ctx.drawImage(rig.logoBone, 0, 0, w, h);
    else if (forgeP > 0) this.forge.render(ctx, forgeP, this.emit, dt);

    // --- 2. the fire reaches the hub ----------------------------------------
    const fuseP = phaseT(t, "fuse");
    if (fuseP > 0 && fuseP < 1) renderFuse(ctx, rig, fuseP);

    // --- 3. sunrise ---------------------------------------------------------
    if (sunP > 0) {
      this.sunrise.render(ctx, sunP, t);
      // Re-assert the mark on top of the wash, inverting where the light has
      // already reached it.
      ctx.drawImage(rig.logoBone, 0, 0, w, h);
      ctx.save();
      this.sunrise.clipToFront(ctx, sunP);
      ctx.drawImage(rig.logoInk, 0, 0, w, h);
      ctx.restore();
    }

    // --- sparks sit above everything but the wash ---------------------------
    this.sparks.draw(ctx, 1 - smoothstep(0, 0.4, sunP));
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
  }
}
