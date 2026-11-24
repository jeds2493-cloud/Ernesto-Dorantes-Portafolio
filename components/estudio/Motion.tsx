"use client";

// Piezas animadas del home (React Bits adaptado a la paleta del estudio).
// Todas respetan prefers-reduced-motion desde el propio componente.

import type { ReactNode } from "react";
import Contador from "./Contador";
import Magnet from "@/components/reactbits/Magnet";

/* ---------- Cifras que cuentan una vez al aparecer ---------- */
export function Count({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}) {
  // El valor real va en texto para lectores de pantalla y buscadores;
  // el contador animado es solo visual (sin JS nunca se lee "0").
  const real = `${prefix}${to.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  return (
    <>
      <span className="es-sr">{real}</span>
      <span aria-hidden="true">
        <Contador
          to={to}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          duration={1.8}
          className="es-count"
        />
      </span>
    </>
  );
}

/* ---------- Imán sutil para los CTA principales ---------- */
export function MagnetWrap({ children }: { children: ReactNode }) {
  return (
    <Magnet padding={70} magnetStrength={4} maxOffset={14} wrapperClassName="es-magnet">
      {children}
    </Magnet>
  );
}
