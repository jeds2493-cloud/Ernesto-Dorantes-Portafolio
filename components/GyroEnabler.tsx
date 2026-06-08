"use client";

import { useEffect } from "react";

/**
 * En iOS 13+ el acceso al giroscopio requiere permiso disparado por un
 * gesto del usuario. Esto lo solicita una sola vez en el primer toque/clic.
 * En Android/otros no hace falta y no hace nada.
 */
export default function GyroEnabler() {
  useEffect(() => {
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (!DOE || typeof DOE.requestPermission !== "function") return;

    const enable = () => {
      DOE.requestPermission?.().catch(() => {});
      window.removeEventListener("touchend", enable);
      window.removeEventListener("click", enable);
    };
    window.addEventListener("touchend", enable, { once: true });
    window.addEventListener("click", enable, { once: true });
    return () => {
      window.removeEventListener("touchend", enable);
      window.removeEventListener("click", enable);
    };
  }, []);

  return null;
}
