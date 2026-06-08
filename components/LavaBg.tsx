"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGyroTilt } from "@/components/useGyroTilt";

/**
 * Fondo animado tipo lámpara de lava (naranja tenue) que reacciona
 * sutilmente al movimiento del mouse. Se monta dentro de una sección
 * con position:relative; overflow:hidden.
 */
export default function LavaBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--lx", String((e.clientX - r.left) / r.width - 0.5));
      el.style.setProperty("--ly", String((e.clientY - r.top) / r.height - 0.5));
    };
    const reset = () => {
      el.style.setProperty("--lx", "0");
      el.style.setProperty("--ly", "0");
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", reset);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", reset);
    };
  }, []);

  // giroscopio (móvil) → desplaza la lava
  const onGyro = useCallback((x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--lx", String(x));
    el.style.setProperty("--ly", String(y));
  }, []);
  useGyroTilt(onGyro);

  return (
    <div className="lava" ref={ref} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
