"use client";

import { type MouseEvent } from "react";

type Cert = { img: string; alt: string; title: string; url: string };

const certs: Cert[] = [
  {
    img: "/assets/certs/google-ads-creative.png",
    alt: "Certificación en Creatividades de Google Ads",
    title: "Google Ads · Creatividades",
    url: "https://www.credential.net/fd1adad0-eea7-47b8-a03b-53f94bd7bb4e",
  },
  {
    img: "/assets/certs/google-analytics.png",
    alt: "Certificación de Google Analytics",
    title: "Google Analytics",
    url: "https://www.credential.net/81d55265-b3a7-474e-bba1-b486e90dab45",
  },
  {
    img: "/assets/certs/hubspot-content-marketing.png",
    alt: "HubSpot Academy — Content Marketing Certified",
    title: "HubSpot · Content Marketing",
    url: "https://app.hubspot.com/academy/achievements/pwyy5x46/en/1/ernesto-soto/content-marketing-certified",
  },
];

const services: [string, string, string][] = [
  ["01", "Branding e Identidad", "Estrategia, identidad visual y sistema de marca."],
  ["02", "Campañas y Dirección de Arte", "Conceptos y campañas 360° en todos los formatos."],
  ["03", "Producto y Experiencias Digitales", "Webs, landing pages e interfaces que convierten."],
  ["04", "Creative Partner", "Tu director creativo externo, de forma continua."],
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
      {/* Certificaciones */}
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
              width={120}
              height={120}
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

      {/* Servicios */}
      <div className="about-services">
        <div className="eyebrow reveal">Servicios</div>
        <div className="svc-teaser-grid reveal">
          {services.map(([n, title, tag]) => (
            <a key={n} href="/servicios" className="svc-teaser-item">
              <span className="n">{n}</span>
              <h3>{title}</h3>
              <p>{tag}</p>
              <span className="svc-teaser-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
