"use client";

import { useEffect, useRef, useState } from "react";
import NeonBulb, { type NeonVariant } from "@/components/NeonBulb";
import Dust from "@/components/Dust";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [icon, setIcon] = useState<NeonVariant>("arte");
  const poster =
    icon === "story"
      ? "/assets/ernesto-noir.jpg"
      : icon === "campanas"
        ? "/assets/ernesto-billboard.jpg"
        : "/assets/ernesto-poster.jpg";

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion:reduce)"
    ).matches;
    if (reduce) return;

    const hero = heroRef.current;
    if (!hero) return;
    const diffuser = hero.querySelector<HTMLElement>(".diffuser");
    const portrait = hero.querySelector<HTMLElement>(".portrait");
    const inner = hero.querySelector<HTMLElement>(".hero-inner");
    const poster = hero.querySelector<HTMLElement>(".poster");
    const sheen = hero.querySelector<HTMLElement>(".sheen");
    if (!diffuser || !portrait || !inner) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      active = false,
      raf: number | null = null;

    function onMove(e: MouseEvent) {
      const r = hero!.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      active = true;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function loop() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      diffuser!.style.transform =
        "translate(" + cx * 48 + "px," + cy * 30 + "px)";
      diffuser!.style.setProperty("--gx", 50 + cx * 26 + "%");
      portrait!.style.transform = "translate(" + cx * 22 + "px,0)";
      if (poster)
        poster.style.transform =
          "rotate(-1.2deg) rotateY(" +
          cx * -5 +
          "deg) rotateX(" +
          cy * 3 +
          "deg)";
      inner!.style.transform =
        "translate(" + cx * -14 + "px," + cy * -8 + "px)";
      if (sheen)
        sheen.style.backgroundPosition = 50 + cx * 34 + "% " + (50 + cy * 20) + "%";
      if (active || Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }

    function onLeave() {
      tx = 0;
      ty = 0;
      active = false;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    hero.style.perspective = "1200px";

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="diffuser" aria-hidden="true" />
      <div className="portrait">
        <div className="poster">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={poster}
            src={poster}
            alt="Ernesto Dorantes, Director Creativo"
          />
          <span className="sheen" />
          <span className="tape tape-tl" />
          <span className="tape tape-br" />
        </div>
      </div>
      <Dust />
      <div className="hero-inner">
        <NeonBulb variant={icon} />
        <span className="tag">
          <span className="sq" />
          Portafolio 2026
        </span>
        <p className="sup">
          Diseño <b>campañas, marcas y experiencias visuales</b> que convierten
          ideas en <b>sistemas memorables</b>.
        </p>
        <h1>
          <span className="ln1">Ernesto</span>
          <span className="ln2 accent">Dorantes</span>
        </h1>
        <div className="role-row">
          <button
            type="button"
            className={`chip${icon === "arte" ? " fill" : ""}`}
            onClick={() => setIcon("arte")}
          >
            Dirección de arte
          </button>
          <button
            type="button"
            className={`chip${icon === "story" ? " fill" : ""}`}
            onClick={() => setIcon("story")}
          >
            Storytelling visual
          </button>
          <button
            type="button"
            className={`chip${icon === "campanas" ? " fill" : ""}`}
            onClick={() => setIcon("campanas")}
          >
            Campañas 360°
          </button>
        </div>
        <a
          className="cv-btn"
          href="/Curriculum_Ernesto_Dorantes.pdf"
          download
        >
          Descargar CV
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}
