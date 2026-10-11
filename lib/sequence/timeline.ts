import { clamp01 } from "../easing";

/**
 * The whole sequence on one clock, in seconds. Phases overlap on purpose — the
 * light starts opening while the last of the heat is still leaving the iron's
 * imprint — so it reads as one press-and-release rather than queued animations.
 */
export const PHASES = {
  /** Black. A beat of nothing, so the brand lands on a held breath. */
  hold: [0.0, 0.45],
  /** The iron comes down: a bright edge crosses the mark fast, the imprint
   *  cools from white-hot to bone, and a little smoke lifts off it. */
  sear: [0.45, 1.4],
  /** Beige wavefront opens from the mark, top-left outward; the mark inverts
   *  to ink as it passes. */
  sunrise: [1.3, 2.9],
  /** Page chrome and copy come in, background settles, idle loop takes over. */
  settle: [2.6, 3.4],
} as const;

export type PhaseName = keyof typeof PHASES;

export const TOTAL = 3.4;

/** Normalised 0..1 progress through a phase at absolute time `t`. */
export function phaseT(t: number, name: PhaseName): number {
  const [a, b] = PHASES[name];
  return clamp01((t - a) / (b - a));
}

/** True once `t` has entered the phase (even if not finished). */
export function started(t: number, name: PhaseName): boolean {
  return t >= PHASES[name][0];
}
