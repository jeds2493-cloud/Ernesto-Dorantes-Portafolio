"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <section
      className="contact"
      id="contacto"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <div className="rings" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <h2 className="reveal">
          Trabajemos <span className="o">juntos</span>
        </h2>
        <div className="cta reveal">
          <a href="mailto:jeds2493@gmail.com" className="primary">
            jeds2493@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/ernestodorantes2493"
            target="_blank"
            rel="noopener"
          >
            LinkedIn ↗
          </a>
          <a href="/Curriculum_Ernesto_Dorantes.pdf" download>
            Descargar CV ↓
          </a>
        </div>
        <p className="foot">
          Ernesto Dorantes · Director Creativo
          <span className="loc">Toluca de Lerdo, México</span>
        </p>
      </div>
    </section>
  );
}
