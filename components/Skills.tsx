"use client";

import type { MouseEvent } from "react";

const skills = [
  "Dirección de arte & branding",
  "UI/UX",
  "Diseño publicitario y editorial",
  "Motion graphics",
  "IA aplicada al diseño y eficiencia de procesos",
  "Adobe Creative Suite",
  "Liderazgo creativo de equipos",
  "Storytelling & copywriting",
  "Campañas ATL / BTL",
];

type Cert = { img: string; alt: string; title: string; url: string };

const certs: Cert[] = [
  {
    img: "/assets/certs/google-ads-creative.png",
    alt: "Certificación en Creatividades de Google Ads",
    title: "Google Ads · Creatividades",
    url: "https://www.credential.net/fd1adad0-eea7-47b8-a03b-53f94bd7bb4e",
  },
];

export default function Skills() {
  // mueve el reflector (glow) a la posición del cursor dentro de la card
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="skills-wrap">
      {/* Certificaciones — estáticas, arriba del carrusel */}
      <div className="certs reveal">
        {certs.map((c) => (
          <a
            key={c.url}
            className="skill cert-skill"
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={onMove}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cert-badge"
              src={c.img}
              alt={c.alt}
              loading="lazy"
              decoding="async"
            />
            <span className="cert-meta">
              <span className="cert-eyebrow">Certificación</span>
              <span className="t">{c.title}</span>
              <span className="cert-link">Ver credencial →</span>
            </span>
          </a>
        ))}
      </div>

      {/* Skills — grid en desktop, carrusel deslizable en móvil */}
      <div className="skills">
        {skills.map((t, i) => (
          <div className="skill reveal" key={t} onMouseMove={onMove}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="t">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
