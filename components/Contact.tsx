"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import ContactForm from "./ContactForm";

const MAIL = "hello@ernestodorantes.com";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  // glow del fondo sigue al cursor (sutil)
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
          Trabajemos <span className="o"><em>juntos</em></span>
        </h2>
        <p className="contact-sub reveal">
          Cuéntame lo esencial de tu proyecto y te respondo <b>en menos de 24 h</b>{" "}
          con un diagnóstico y los siguientes pasos. Solo lo básico — sin
          formularios eternos.
        </p>

        <ContactForm />

        <div className="cta reveal">
          <a href={`mailto:${MAIL}`} className="primary">
            {MAIL}
          </a>
          <a
            href="https://linkedin.com/in/ernestodorantes2493"
            target="_blank"
            rel="noopener"
          >
            LinkedIn ↗
          </a>
        </div>
        <p className="foot">
          Ernesto Dorantes · Director Creativo
          <span className="loc">Toluca de Lerdo, México</span>
        </p>
        <p className="legal-note">
          Las marcas y logotipos que aparecen en este sitio se incluyen
          únicamente con fines ilustrativos de portafolio. Cada marca es
          propiedad de su respectiva empresa.
        </p>
      </div>
    </section>
  );
}
