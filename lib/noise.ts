import { mulberry32 } from "./rng";

/**
 * Tileable value noise + fbm. Used for the burn front (so the S dissolves in
 * with an organic, molten edge rather than a straight wipe) and for wobbling
 * the sunrise wavefront.
 */
export class ValueNoise {
  private readonly size: number;
  private readonly mask: number;
  private readonly grid: Float32Array;

  constructor(seed: number, size = 256) {
    this.size = size;
    this.mask = size - 1;
    const rnd = mulberry32(seed);
    this.grid = new Float32Array(size * size);
    for (let i = 0; i < this.grid.length; i++) this.grid[i] = rnd();
  }

  private at(ix: number, iy: number) {
    return this.grid[(iy & this.mask) * this.size + (ix & this.mask)];
  }

  /** Sample at grid coordinates (not normalised). Returns 0..1. */
  sample(x: number, y: number): number {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = x - x0;
    const fy = y - y0;
    // Quintic fade — smoother than linear, no directional banding.
    const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
    const uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);

    const a = this.at(x0, y0);
    const b = this.at(x0 + 1, y0);
    const c = this.at(x0, y0 + 1);
    const d = this.at(x0 + 1, y0 + 1);

    const top = a + (b - a) * ux;
    const bot = c + (d - c) * ux;
    return top + (bot - top) * uy;
  }

  /** Fractal sum. Returns roughly 0..1. */
  fbm(x: number, y: number, octaves = 4, lacunarity = 2, gain = 0.5): number {
    let amp = 1;
    let freq = 1;
    let sum = 0;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += amp * this.sample(x * freq, y * freq);
      norm += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return sum / norm;
  }
}
