import { clamp01, easeOutCubic, pulse, smoothstep } from "../easing";
import type { Rig } from "./rig";

/**
 * Beat 2 — the fire reaching the asterisk is the ignition for the sunrise: a
 * hard white flash at the hub and an expanding shock ring.
 *
 * @param f 0..1 through the fuse phase
 */
export function renderFuse(ctx: CanvasRenderingContext2D, rig: Rig, f: number) {
  const flash = pulse(clamp01(f), 0.16);
  if (flash <= 0.01) return;

  const rad = rig.astR * (0.6 + easeOutCubic(clamp01(f)) * 7);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const grd = ctx.createRadialGradient(rig.astCx, rig.astCy, 0, rig.astCx, rig.astCy, rad);
  grd.addColorStop(0, `rgba(255,252,242,${0.95 * flash})`);
  grd.addColorStop(0.18, `rgba(255,226,168,${0.6 * flash})`);
  grd.addColorStop(0.55, `rgba(255,168,72,${0.18 * flash})`);
  grd.addColorStop(1, "rgba(255,140,40,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(rig.astCx - rad, rig.astCy - rad, rad * 2, rad * 2);

  const ringR = rig.astR * (1 + easeOutCubic(clamp01(f * 1.4)) * 5);
  ctx.globalAlpha = flash * 0.5 * (1 - smoothstep(0.3, 1, f));
  ctx.strokeStyle = "rgba(255,244,214,1)";
  ctx.lineWidth = Math.max(1, rig.astR * 0.09 * (1 - f));
  ctx.beginPath();
  ctx.arc(rig.astCx, rig.astCy, ringR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}
