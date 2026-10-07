/**
 * Deterministic PRNG. The whole sequence is seeded so the starfield, the burn
 * noise and the ember spray are identical on every load — the animation is a
 * composition, not a lottery.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = () => number;

export const rand = (r: Rng, min: number, max: number) => min + r() * (max - min);
export const randInt = (r: Rng, min: number, max: number) =>
  Math.floor(min + r() * (max - min + 1));
export const pick = <T>(r: Rng, arr: readonly T[]): T => arr[Math.floor(r() * arr.length)];
