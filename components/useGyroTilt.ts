"use client";

import { useEffect } from "react";

/**
 * Llama a onTilt(x, y) con valores normalizados (-0.5..0.5) según la
 * inclinación del dispositivo (giroscopio). Solo se activa en pantallas
 * táctiles (pointer: coarse). En iOS requiere permiso (ver GyroEnabler).
 * onTilt debe ser estable (useCallback).
 */
export function useGyroTilt(onTilt: (x: number, y: number) => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    let base: number | null = null;
    const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));

    const handler = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      // calibra el ángulo de reposo (cómo se sostiene el teléfono)
      if (base === null) base = e.beta;
      const x = clamp(e.gamma / 38); // izquierda/derecha
      const y = clamp((e.beta - base) / 38); // adelante/atrás
      onTilt(x, y);
    };

    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [onTilt]);
}
