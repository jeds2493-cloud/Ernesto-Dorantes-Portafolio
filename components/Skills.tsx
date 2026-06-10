"use client";

import { useEffect, useState, type MouseEvent } from "react";

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

export default function Skills() {
  // en móvil las skills fluyen en marquee continuo; en desktop son grid
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width:700px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

      {/* Skills — grid en desktop, marquee continuo en móvil */}
      {isMobile ? (
        <div className="skills-marquee" aria-label="Habilidades">
          <div className="skills-track">
            {[...skills, ...skills].map((t, i) => (
              <div
                className="skill"
                key={i}
                aria-hidden={i >= skills.length}
              >
                <span className="n">
                  {String((i % skills.length) + 1).padStart(2, "0")}
                </span>
                <span className="t">{t}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="skills">
          {skills.map((t, i) => (
            <div className="skill reveal" key={t} onMouseMove={onMove}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{t}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
