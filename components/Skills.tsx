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

export default function Skills() {
  // mueve el reflector (glow) a la posición del cursor dentro de la card
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
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
    </div>
  );
}
