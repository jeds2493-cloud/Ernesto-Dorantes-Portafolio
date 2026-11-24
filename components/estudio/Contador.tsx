"use client";

// Contador ligero: escribe sobre el nodo de texto (nodeValue) en vez de
// textContent, así no se recalcula el estilo de toda la página en cada cuadro.
// El HTML del servidor ya trae el valor real: sin JS nunca dice 0.

import { useEffect, useRef } from "react";

export default function Contador({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  duration = 1.8,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) =>
    `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).replace(/,/g, separator)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    const node = el?.firstChild;
    if (!el || !node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return; // ya visible: se queda el valor real
    node.nodeValue = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / (duration * 1000), 1);
        const k = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        node.nodeValue = fmt(to * k);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      node.nodeValue = fmt(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {fmt(to)}
    </span>
  );
}
