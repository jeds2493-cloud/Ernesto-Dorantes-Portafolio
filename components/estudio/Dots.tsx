"use client";

// Navegación de un carrusel de celular: puntos (o pestañas con texto, si se
// pasan `labels`) que marcan la tarjeta visible y, al tocarlos, llevan a ella.
// Solo se muestran donde el carrusel existe (≤640 px).

import { useEffect, useState } from "react";

export default function Dots({
  target,
  count,
  label,
  labels,
}: {
  target: string;
  count: number;
  /** Para lectores de pantalla: «Paquete 2 de 4». */
  label: string;
  /** Con texto: pestañas en vez de puntos. */
  labels?: string[];
}) {
  const [on, setOn] = useState(0);

  useEffect(() => {
    const box = document.getElementById(target);
    if (!box) return;
    const items = [...box.children] as HTMLElement[];
    const ratios = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target, e.intersectionRatio);
        let best = 0;
        let bi = -1;
        items.forEach((el, i) => {
          const r = ratios.get(el) ?? 0;
          if (r > best) {
            best = r;
            bi = i;
          }
        });
        if (bi >= 0) setOn(bi);
      },
      { root: box, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    items.forEach((el) => io.observe(el));
    const center = (el: HTMLElement) =>
      box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
    const onFocus = (e: FocusEvent) => {
      const el = items.find((it) => it.contains(e.target as Node));
      if (el) center(el);
    };
    const fit = () => {
      box.tabIndex = box.scrollWidth > box.clientWidth ? 0 : -1;
    };
    fit();
    box.addEventListener("focusin", onFocus);
    window.addEventListener("resize", fit);
    return () => {
      io.disconnect();
      box.removeEventListener("focusin", onFocus);
      window.removeEventListener("resize", fit);
    };
  }, [target]);

  const go = (i: number) => {
    const box = document.getElementById(target);
    const el = box?.children[i] as HTMLElement | undefined;
    if (!box || !el) return;
    box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
  };

  return (
    <div className={labels ? "es-tabs" : "es-dots"} role="group" aria-label={`Elegir ${label.toLowerCase()}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          className={i === on ? "is-on" : undefined}
          aria-label={labels ? undefined : `${label} ${i + 1} de ${count}`}
          aria-current={i === on ? "true" : undefined}
          onClick={() => go(i)}
        >
          {labels?.[i]}
        </button>
      ))}
    </div>
  );
}
