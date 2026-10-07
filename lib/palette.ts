export type RGB = readonly [number, number, number];

/**
 * The Screendibs palette. Four identifiable hues over a warm canvas, with a
 * near-black for type and a soft white for anything reversed out.
 *
 *   Cream       #EAE7DA   warm canvas, editorial and print-like
 *   Sage        #A6BF84   calm, literary, natural
 *   Coral       #F76D52   energetic, human, disruptive
 *   Periwinkle  #769AF4   digital, youthful, modern
 */
export const INK: RGB = [17, 17, 17];
export const BONE: RGB = [245, 245, 245];

export const SAGE: RGB = [166, 191, 132];
export const CORAL: RGB = [247, 109, 82];
export const PERIWINKLE: RGB = [118, 154, 244];

/**
 * The canvas the sunrise floods the world with: lightest where the light comes
 * from, deepening toward the edges of the frame.
 */
export const CREAM_LIT: RGB = [244, 241, 230];
export const CREAM: RGB = [234, 231, 218];
export const CREAM_DEEP: RGB = [221, 217, 202];

export const rgb = (c: RGB, a = 1) =>
  a >= 1 ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${a})`;

export const mixRGB = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * Heat ramp for the forge. Index 0 = fully cooled (the soft white of the
 * finished letterform), 255 = the white-hot burn front. The middle of the ramp
 * is pulled onto the brand coral, so the fire that forges the mark and the
 * accent the site is built on are the same colour.
 */
const FIRE_STOPS: Array<[number, RGB]> = [
  [0.0, BONE],
  [0.1, [172, 142, 128]],
  [0.22, [150, 40, 25]],
  [0.42, [232, 70, 45]],
  [0.62, CORAL],
  [0.8, [255, 170, 110]],
  [0.92, [255, 226, 184]],
  [1.0, [255, 252, 245]],
];

export function buildFireLUT(): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let k = 0;
    while (k < FIRE_STOPS.length - 2 && t > FIRE_STOPS[k + 1][0]) k++;
    const [t0, c0] = FIRE_STOPS[k];
    const [t1, c1] = FIRE_STOPS[k + 1];
    const f = (t - t0) / (t1 - t0 || 1);
    lut[i * 3 + 0] = c0[0] + (c1[0] - c0[0]) * f;
    lut[i * 3 + 1] = c0[1] + (c1[1] - c0[1]) * f;
    lut[i * 3 + 2] = c0[2] + (c1[2] - c0[2]) * f;
  }
  return lut;
}
