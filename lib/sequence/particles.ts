import { clamp01 } from "../easing";
import { buildFireLUT } from "../palette";

const LUT = buildFireLUT();

export interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  /** 0..1 into the fire ramp. Decays over the spark's life. */
  heat: number;
  drag: number;
  /** Negative = rises. Embers rise, pen sparks fall. */
  grav: number;
  /** Motion streak length multiplier. */
  trail: number;
}

/**
 * One fixed-capacity pool serving every hot particle in the piece — the sparks
 * that converge before ignition, the embers thrown off the burn front, and the
 * sparks flicked off the pen tip. Dead slots are reused, so no GC churn.
 */
export class Sparks {
  private pool: Spark[] = [];
  private cursor = 0;

  constructor(private capacity = 700) {
    for (let i = 0; i < capacity; i++) {
      this.pool.push({
        x: 0, y: 0, vx: 0, vy: 0,
        age: 1, life: 1, size: 1, heat: 0, drag: 0.96, grav: 0, trail: 1,
      });
    }
  }

  emit(p: Partial<Spark> & { x: number; y: number }) {
    const s = this.pool[this.cursor];
    this.cursor = (this.cursor + 1) % this.capacity;
    s.x = p.x;
    s.y = p.y;
    s.vx = p.vx ?? 0;
    s.vy = p.vy ?? 0;
    s.age = 0;
    s.life = p.life ?? 1;
    s.size = p.size ?? 1.4;
    s.heat = p.heat ?? 1;
    s.drag = p.drag ?? 0.965;
    s.grav = p.grav ?? -18;
    s.trail = p.trail ?? 1;
    return s;
  }

  update(dt: number) {
    for (const s of this.pool) {
      if (s.age >= s.life) continue;
      s.age += dt;
      s.vy += s.grav * dt;
      const d = Math.pow(s.drag, dt * 60);
      s.vx *= d;
      s.vy *= d;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
    }
  }

  draw(ctx: CanvasRenderingContext2D, alpha = 1) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const s of this.pool) {
      if (s.age >= s.life) continue;
      const u = clamp01(s.age / s.life);
      // Fade out on a curve so sparks linger bright then vanish quickly.
      const a = (1 - u) * (1 - u) * alpha;
      if (a <= 0.01) continue;
      const heat = clamp01(s.heat * (1 - u * 0.72));
      const i = Math.min(255, Math.round(heat * 255)) * 3;
      ctx.fillStyle = `rgba(${LUT[i]},${LUT[i + 1]},${LUT[i + 2]},${a})`;

      const sp = Math.hypot(s.vx, s.vy);
      const len = Math.min(14, sp * 0.014 * s.trail);
      const r = s.size * (0.45 + (1 - u) * 0.55);
      if (len > 1.2) {
        // Stretch fast sparks into a streak along their velocity.
        const nx = s.vx / (sp || 1);
        const ny = s.vy / (sp || 1);
        ctx.beginPath();
        ctx.moveTo(s.x - nx * len, s.y - ny * len);
        ctx.lineTo(s.x, s.y);
        ctx.lineWidth = r * 1.6;
        ctx.lineCap = "round";
        ctx.strokeStyle = ctx.fillStyle;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  clear() {
    for (const s of this.pool) s.age = s.life;
  }
}
