"use client";

// Scroll con inercia (Lenis) solo donde suma: ratón o trackpad y sin
// «reducir movimiento». En celular se queda el scroll nativo y ni se descarga.
// El bucle de cuadros solo corre mientras Lenis se mueve; la página quieta
// no gasta nada.

import { useEffect } from "react";

export default function Smooth() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    let off = () => {};
    let dead = false;

    import("lenis").then(({ default: Lenis }) => {
      if (dead) return;
      const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.07, wheelMultiplier: 0.68 });
      let raf = 0;
      const loop = (t: number) => {
        lenis.raf(t);
        raf = lenis.isScrolling ? requestAnimationFrame(loop) : 0;
      };
      const wake = () => {
        if (!raf) raf = requestAnimationFrame(loop);
      };
      // Lenis pone isScrolling en la propia vuelta; "scroll" lo mantiene despierto.
      const unsub = lenis.on("scroll", wake);
      const opts = { passive: true } as const;
      window.addEventListener("wheel", wake, opts);
      window.addEventListener("pointerdown", wake, opts);
      window.addEventListener("keydown", wake, opts);

      // El modal de contacto bloquea el fondo con overflow:hidden en <body>.
      const sync = () => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
      const mo = new MutationObserver(sync);
      mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });

      off = () => {
        mo.disconnect();
        unsub();
        window.removeEventListener("wheel", wake);
        window.removeEventListener("pointerdown", wake);
        window.removeEventListener("keydown", wake);
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => {
      dead = true;
      off();
    };
  }, []);

  return null;
}
