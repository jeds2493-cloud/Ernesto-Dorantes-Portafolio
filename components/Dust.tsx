"use client";

import { useEffect, useRef } from "react";

/**
 * Polvo flotante en el hero — motas cálidas que derivan lento, como las
 * partículas que se ven cuando una lámpara/proyector alumbra la oscuridad.
 * Más visibles hacia la derecha (donde está la luz cálida del difusor).
 * Canvas ligero; respeta prefers-reduced-motion.
 */
type P = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  ph: number;
  sp: number;
};

export default function Dust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let parts: P[] = [];

    const spawn = (): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.18 + 0.04),
      a: Math.random() * 0.5 + 0.2,
      ph: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.6 + 0.3,
    });

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(120, (w * h) / 13000));
      parts = Array.from({ length: count }, spawn);
    };

    const draw = (animated: boolean, t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (animated) {
          p.x += p.vx + Math.sin(t * p.sp + p.ph) * 0.14;
          p.y += p.vy;
          if (p.y < -6) {
            p.y = h + 6;
            p.x = Math.random() * w;
          }
          if (p.x < -6) p.x = w + 6;
          else if (p.x > w + 6) p.x = -6;
        }
        // más visible hacia la derecha (la luz cálida)
        const side = 0.18 + (p.x / w) * 0.95;
        const twinkle = animated ? 0.7 + Math.sin(t * 1.5 * p.sp + p.ph) * 0.3 : 1;
        const alpha = Math.min(0.7, p.a * side * twinkle);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,236,214,${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let t = 0;
    const frame = () => {
      t += 0.016;
      draw(true, t);
      raf = requestAnimationFrame(frame);
    };

    resize();
    if (reduce) {
      draw(false, 0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="dust" aria-hidden="true" />;
}
