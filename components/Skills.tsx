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

const CERT_URL =
  "https://www.credential.net/fd1adad0-eea7-47b8-a03b-53f94bd7bb4e";

export default function Skills() {
  // mueve el reflector (glow) a la posición del cursor dentro de la card
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="skills">
      {skills.map((t, i) => (
        <div className="skill reveal" key={t} onMouseMove={onMove}>
          <span className="n">{String(i + 1).padStart(2, "0")}</span>
          <span className="t">{t}</span>
        </div>
      ))}
      <a
        className="skill cert-skill reveal"
        href={CERT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="cert-badge"
          src="/assets/certs/google-ads-creative.png"
          alt="Certificación en Creatividades de Google Ads"
          loading="lazy"
          decoding="async"
        />
        <span className="cert-meta">
          <span className="cert-eyebrow">Certificación</span>
          <span className="t">Google Ads · Creatividades</span>
          <span className="cert-link">Ver credencial →</span>
        </span>
      </a>
    </div>
  );
}
