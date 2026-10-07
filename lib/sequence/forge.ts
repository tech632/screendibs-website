import { clamp01, easeInOutCubic, lerp, pulse, smoothstep } from "../easing";
import { ValueNoise } from "../noise";
import { buildFireLUT } from "../palette";
import { mulberry32, type Rng } from "../rng";
import type { Rect, Rig } from "./rig";

const LUT = buildFireLUT();

/** How much of the field is "still glowing" behind the front, in mark heights. */
const BAND = 0.3;
/** How far the heat bleeds *ahead* of the front, through the metal. */
const PREBAND = 0.11;
/** Mask resolution cap, in device px. The burn is authored per-pixel; past this
 *  the upscale supplies the heat-shimmer softness for free. */
const MASK_W = 1100;
/** Noise cycles per mark height — sets how ragged the burn front is. */
const NOISE_FREQ = 7.4;

/** Phase-normalised beats. The strike and the burn overlap on purpose. */
const STRIKE_END = 0.1;
const GLOW_END = 0.21;
const BURN_START = 0.06;

const SUPPORTS_FILTER =
  typeof window !== "undefined" &&
  typeof CanvasRenderingContext2D !== "undefined" &&
  "filter" in CanvasRenderingContext2D.prototype;

/**
 * Beat 1 — the mark is forged.
 *
 * A burn-dissolve across the whole Sd* lockup: every pixel of the silhouette
 * gets a scalar from a noise field blended with a directional ramp, and a
 * threshold sweeps through it. Pixels the threshold just crossed are white-hot,
 * pixels it crossed a moment ago are cooling through gold→orange→red, and
 * pixels it hasn't reached yet are dark. The fire catches at the foot of the S,
 * runs through the d, and the asterisk is the last thing to take — which is
 * where the sunrise is lit from.
 */
export class Forge {
  private box: Rect;
  private mw: number;
  private mh: number;
  /** Mask indices that carry ink, and their alpha. Everything else stays clear. */
  private inked: Uint32Array;
  private inkAlpha: Uint8Array;
  /** Burn scalar per inked pixel, normalised 0..1 over the ink. */
  private field: Float32Array;
  /** BAND / PREBAND rescaled into normalised field units. */
  private band: number;
  private preband: number;
  private img: ImageData;
  private cv: HTMLCanvasElement;
  private cctx: CanvasRenderingContext2D;
  /** The glowing pixels alone — the bloom source, so only the fire throws
   *  light and the cooled letterforms behind it stay clean. */
  private hotImg: ImageData;
  private hotCv: HTMLCanvasElement;
  private hotCtx: CanvasRenderingContext2D;
  private rng: Rng = mulberry32(9051);
  private frontPts: number[] = [];
  /** Where the first spark lands, in canvas px. */
  readonly ignite: [number, number];

  constructor(private rig: Rig) {
    const lk = rig.hero;
    // The whole lockup. The asterisk's arm tips flare a little past its radius.
    const reach = lk.astR * 1.06;
    const x0 = Math.floor(lk.sd.x) - 1;
    const y0 = Math.floor(Math.min(lk.sd.y, lk.astCy - reach)) - 1;
    const x1 = Math.ceil(lk.astCx + reach) + 1;
    const y1 = Math.ceil(Math.max(lk.sd.y + lk.sd.h, lk.astCy + reach)) + 1;
    const box: Rect = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    this.box = box;

    const scale = Math.min(1, MASK_W / (box.w * rig.dpr)) * rig.dpr;
    this.mw = Math.max(8, Math.round(box.w * scale));
    this.mh = Math.max(8, Math.round(box.h * scale));

    // --- silhouette alpha at mask resolution --------------------------------
    const gc = document.createElement("canvas");
    gc.width = this.mw;
    gc.height = this.mh;
    const gctx = gc.getContext("2d", { willReadFrequently: true })!;
    gctx.imageSmoothingQuality = "high";
    gctx.drawImage(
      rig.silhouette,
      box.x * rig.dpr,
      box.y * rig.dpr,
      box.w * rig.dpr,
      box.h * rig.dpr,
      0,
      0,
      this.mw,
      this.mh,
    );
    const gd = gctx.getImageData(0, 0, this.mw, this.mh).data;
    let count = 0;
    for (let i = 0; i < this.mw * this.mh; i++) if (gd[i * 4 + 3] > 0) count++;
    this.inked = new Uint32Array(count);
    this.inkAlpha = new Uint8Array(count);
    for (let i = 0, k = 0; i < this.mw * this.mh; i++) {
      const a = gd[i * 4 + 3];
      if (a === 0) continue;
      this.inked[k] = i;
      this.inkAlpha[k] = a;
      k++;
    }

    // --- burn field ---------------------------------------------------------
    // Ignition sits at the lower-left terminal of the S and the fire runs
    // along the mark and slightly up, the way it would across a sheet held at
    // one corner. Distances are in mark heights so the raggedness of the front
    // holds whatever size the lockup is laid out at.
    const noise = new ValueNoise(4477, 128);
    const igX = lk.sBox.x + 0.13 * lk.sBox.w;
    const igY = lk.sBox.y + 0.9 * lk.sBox.h;
    const ix = (igX - box.x) / box.w;
    const iy = (igY - box.y) / box.h;
    const dirX = 0.94;
    const dirY = -0.34;
    const aspect = box.w / box.h;
    this.field = new Float32Array(count);
    let min = Infinity;
    let max = -Infinity;
    for (let k = 0; k < count; k++) {
      const i = this.inked[k];
      const u = (i % this.mw) / this.mw;
      const v = ((i / this.mw) | 0) / this.mh;
      const rx = (u - ix) * aspect;
      const ry = v - iy;
      const radial = Math.hypot(rx, ry);
      const along = rx * dirX + ry * dirY;
      const ramp = radial * 0.45 + along * 0.55;
      const n = noise.fbm(u * aspect * NOISE_FREQ, v * NOISE_FREQ, 4, 2.1, 0.52);
      const f = ramp * 0.74 + n * 0.34;
      this.field[k] = f;
      if (f < min) min = f;
      if (f > max) max = f;
    }
    // Normalise over the ink alone, so the sweep starts the instant the first
    // pixel catches and finishes exactly as the last one does.
    const span = max - min || 1;
    for (let k = 0; k < count; k++) this.field[k] = (this.field[k] - min) / span;
    this.band = BAND / span;
    this.preband = PREBAND / span;

    this.cv = document.createElement("canvas");
    this.cv.width = this.mw;
    this.cv.height = this.mh;
    this.cctx = this.cv.getContext("2d")!;
    this.img = this.cctx.createImageData(this.mw, this.mh);

    this.hotCv = document.createElement("canvas");
    this.hotCv.width = this.mw;
    this.hotCv.height = this.mh;
    this.hotCtx = this.hotCv.getContext("2d")!;
    this.hotImg = this.hotCtx.createImageData(this.mw, this.mh);

    this.ignite = [igX, igY];
  }

  /** Rebuild the pixel buffer for threshold `p` and note where the front is. */
  private rasterise(p: number) {
    const d = this.img.data;
    const hd = this.hotImg.data;
    const field = this.field;
    const inked = this.inked;
    const ga = this.inkAlpha;
    const band = this.band;
    const preband = this.preband;
    this.frontPts.length = 0;

    for (let k = 0; k < inked.length; k++) {
      const o = inked[k] * 4;
      const a = ga[k];
      const delta = p - field[k];

      if (delta >= band) {
        // Long cooled — the finished letterform.
        d[o] = LUT[0];
        d[o + 1] = LUT[1];
        d[o + 2] = LUT[2];
        d[o + 3] = a;
        hd[o + 3] = 0;
      } else if (delta >= 0) {
        // In the glowing band. delta 0 = just crossed = hottest.
        const heat = 1 - delta / band;
        const li = ((heat * 255) | 0) * 3;
        hd[o] = d[o] = LUT[li];
        hd[o + 1] = d[o + 1] = LUT[li + 1];
        hd[o + 2] = d[o + 2] = LUT[li + 2];
        d[o + 3] = a;
        // Light output falls away as the metal cools, so the bloom has no
        // hard trailing edge.
        hd[o + 3] = a * Math.min(1, heat * 1.6);
        if ((k & 31) === 0 && heat > 0.82) this.frontPts.push(inked[k]);
      } else if (delta > -preband) {
        // Heat conducting ahead of the front through unburnt metal.
        const q = 1 + delta / preband; // 0 at the far edge, 1 at the front
        const q2 = q * q;
        hd[o] = d[o] = 150 * q2;
        hd[o + 1] = d[o + 1] = 32 * q2;
        hd[o + 2] = d[o + 2] = 10 * q2;
        hd[o + 3] = d[o + 3] = a * q2 * 0.9;
      } else {
        d[o + 3] = 0;
        hd[o + 3] = 0;
      }
    }
    this.cctx.putImageData(this.img, 0, 0);
    this.hotCtx.putImageData(this.hotImg, 0, 0);
  }

  /**
   * @param progress 0..1 through the forge phase
   */
  render(
    ctx: CanvasRenderingContext2D,
    progress: number,
    emit: (x: number, y: number, opts: EmitOpts) => void,
    dt: number,
  ) {
    const rig = this.rig;
    const box = this.box;

    // Beat A: the strike. A spark lands and swells before the metal takes.
    // Nothing of the mark is visible yet.
    const strike = clamp01(progress / STRIKE_END);
    if (progress < GLOW_END) {
      const glow = pulse(clamp01(progress / GLOW_END), 0.26);
      const [gx, gy] = this.ignite;
      const rad = rig.cap * (0.05 + glow * 0.22);
      const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad);
      grd.addColorStop(0, `rgba(255,246,224,${0.95 * glow})`);
      grd.addColorStop(0.28, `rgba(255,168,48,${0.55 * glow})`);
      grd.addColorStop(1, "rgba(255,90,10,0)");
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = grd;
      ctx.fillRect(gx - rad, gy - rad, rad * 2, rad * 2);
      ctx.restore();

      // Sparks converge on the strike point, then blow outward from it. Rate is
      // per-second, not per-frame, so a 120Hz display doesn't spray twice as much.
      const n = Math.round(dt * (strike < 1 ? 180 : 60));
      for (let i = 0; i < n; i++) {
        const ang = this.rng() * Math.PI * 2;
        const dist = rig.cap * (0.15 + this.rng() * 0.5);
        if (strike < 0.75) {
          emit(gx + Math.cos(ang) * dist, gy + Math.sin(ang) * dist, {
            vx: -Math.cos(ang) * dist * 2.4,
            vy: -Math.sin(ang) * dist * 2.4,
            life: 0.36,
            size: 1.5,
            heat: 0.9,
            grav: 0,
            drag: 0.93,
            trail: 1.7,
          });
        } else {
          emit(gx, gy, {
            vx: Math.cos(ang) * rig.cap * (0.4 + this.rng()),
            vy: Math.sin(ang) * rig.cap * (0.4 + this.rng()) - rig.cap * 0.3,
            life: 0.5 + this.rng() * 0.5,
            size: 1.3,
            heat: 1,
            grav: -rig.cap * 0.35,
          });
        }
      }
    }

    // Beat B: the burn sweeps the mark.
    const burnT = clamp01((progress - BURN_START) / (1 - BURN_START));
    if (burnT <= 0) return;

    // Slow to catch, then a steady travel — a full ease-in-out would flash
    // through the d in a few frames.
    const eased = lerp(burnT, easeInOutCubic(burnT), 0.4);
    // Stops short of fully cooling the far end: the asterisk is still hot when
    // the sunrise is lit from it.
    const tail = this.band * 0.6;
    const p = -this.preband + (1 + this.preband + tail) * eased;
    this.rasterise(p);

    const heatAmt = 1 - smoothstep(0.88, 1, burnT);

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(this.cv, box.x, box.y, box.w, box.h);

    // Bloom: the glowing pixels, blurred and added back, so the hot band
    // throws light onto the sky around it.
    if (heatAmt > 0.02) {
      ctx.globalCompositeOperation = "lighter";
      const blur = Math.max(4, rig.cap * 0.06);
      if (SUPPORTS_FILTER) {
        ctx.filter = `blur(${blur}px)`;
        ctx.globalAlpha = 0.85 * heatAmt;
        ctx.drawImage(this.hotCv, box.x, box.y, box.w, box.h);
        ctx.filter = "none";
      } else {
        ctx.globalAlpha = 0.35 * heatAmt;
        ctx.drawImage(
          this.hotCv,
          box.x - blur,
          box.y - blur,
          box.w + blur * 2,
          box.h + blur * 2,
        );
      }
    }
    ctx.restore();

    // Beat C: once the front has left the ink, hand over to the crisp
    // silhouette so the finished mark is razor sharp, not an upscaled buffer.
    const crisp = smoothstep(1, 1 + tail, p);
    if (crisp > 0) {
      ctx.save();
      ctx.globalAlpha = crisp;
      ctx.drawImage(rig.logoBone, 0, 0, rig.w, rig.h);
      ctx.restore();
    }

    // Embers peel off the burn front and rise.
    if (heatAmt > 0.05 && this.frontPts.length) {
      const count = Math.min(12, Math.round(dt * 320 * heatAmt));
      for (let i = 0; i < count; i++) {
        const idx = this.frontPts[(this.rng() * this.frontPts.length) | 0];
        const mx = idx % this.mw;
        const my = (idx / this.mw) | 0;
        const x = box.x + (mx / this.mw) * box.w;
        const y = box.y + (my / this.mh) * box.h;
        emit(x, y, {
          vx: (this.rng() - 0.5) * rig.cap * 0.55,
          vy: -this.rng() * rig.cap * 0.75 - rig.cap * 0.12,
          life: 0.6 + this.rng() * 0.9,
          size: 0.9 + this.rng() * 1.4,
          heat: 0.75 + this.rng() * 0.25,
          grav: -rig.cap * 0.5,
          drag: 0.975,
        });
      }
    }
  }
}

export interface EmitOpts {
  vx?: number;
  vy?: number;
  life?: number;
  size?: number;
  heat?: number;
  grav?: number;
  drag?: number;
  trail?: number;
}
