"use client";

// Envoltura que avisa cuando su contenido entra a la pantalla: pone la clase
// `is-in` (y la quita al salir por completo, para que la animación se repita).

import { useEffect, useRef, useState, type ReactNode } from "react";

export function InView({
  as: Tag = "div",
  className = "",
  at = 0.4,
  wideDelay = 0,
  replay = false,
  children,
  ...rest
}: {
  as?: "div" | "li" | "figure" | "section";
  className?: string;
  /** Fracción visible a partir de la cual se considera «en pantalla». */
  at?: number;
  /** Milisegundos de espera antes de marcar `is-in`, solo en pantallas anchas. */
  wideDelay?: number;
  /** Al pasar el ratón por encima, la animación se repite. */
  replay?: boolean;
  children: ReactNode;
  [k: `data-${string}`]: string | number | undefined;
  "aria-labelledby"?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);
  const [armed, setArmed] = useState(false); // ya hay JS: se puede partir del estado inicial

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setArmed(true);
    const wait = wideDelay && window.matchMedia("(min-width: 1001px)").matches ? wideDelay : 0;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(timer);
        if (e.intersectionRatio >= at) timer = window.setTimeout(() => setOn(true), wait);
        else if (!e.isIntersecting) setOn(false);
      },
      { threshold: [0, at] },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [at, wideDelay]);

  // Repetir: se quita `is-in` un cuadro y se vuelve a poner.
  const again = () => {
    if (!on) return;
    setOn(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} onPointerEnter={replay ? again : undefined} className={`${className}${armed ? " is-armed" : ""}${on ? " is-in" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}
