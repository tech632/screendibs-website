import { clamp01 } from "../easing";

/**
 * The whole sequence on one clock, in seconds. Phases deliberately overlap —
 * the fire catches while the stars are still fading up, the flash opens before
 * the last arm has cooled — so the piece reads as one continuous forging rather
 * than queued animations.
 */
export const PHASES = {
  /** Stars fade up out of black. */
  sky: [0.0, 1.2],
  /** Sparks converge on the foot of the S, then the burn runs the whole mark:
   *  S, d, asterisk. Deliberately unhurried — the molten edge is the detail
   *  worth watching, and it needs time to be read. */
  forge: [0.9, 5.7],
  /** The fire reaches the asterisk's hub. Flash. */
  fuse: [5.5, 6.0],
  /** Beige wavefront expands from the mark; the logo inverts as it passes. */
  sunrise: [5.7, 7.25],
  /** Copy rises, background settles, idle loop takes over. */
  settle: [7.0, 7.85],
} as const;

export type PhaseName = keyof typeof PHASES;

export const TOTAL = 7.85;

/** Normalised 0..1 progress through a phase at absolute time `t`. */
export function phaseT(t: number, name: PhaseName): number {
  const [a, b] = PHASES[name];
  return clamp01((t - a) / (b - a));
}

/** True once `t` has entered the phase (even if not finished). */
export function started(t: number, name: PhaseName): boolean {
  return t >= PHASES[name][0];
}
