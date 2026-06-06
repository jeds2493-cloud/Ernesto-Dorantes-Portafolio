import type { CSSProperties } from "react";
import CaseCarousel from "@/components/CaseCarousel";
import CasePlay from "@/components/CasePlay";

type Case = {
  accent: string;
  note?: string;
  img?: string;
  alt?: string;
  gallery?: {
    src?: string;
    alt: string;
    contain?: boolean;
    collage?: { src: string; alt: string; contain?: boolean }[];
    bg?: "blue" | "dark";
    cols?: 2 | 3;
  }[];
  videos?: { id: string; label: string; vertical?: boolean }[];
  caseNo: string;
  title: string;
  sub: string;
  concept: string;
};

const cases: Case[] = [
  {
    accent: "#ff7a42",
    gallery: [
      {
        src: "/assets/casos/compramos1.jpg",
        alt: "Stand, roll-up banner y flyers de Compramos Tu Casa",
      },
      {
        src: "/assets/casos/compramos2.jpg",
        alt: "Flotador inflable con el logo de Compramos Tu Casa en una alberca",
      },
      {
        src: "/assets/casos/compramos3.jpg",
        alt: "Tapete de bienvenida con el logo de Compramos Tu Casa",
      },
      {
        src: "/assets/casos/compramos4.jpg",
        alt: "Espectacular: ¿Qué tal unas vacaciones? Véndenos tu casa",
      },
      {
        src: "/assets/casos/compramos5.jpg",
        alt: "Espectacular: ¿Buscando la casa de tus sueños?",
      },
    ],
    videos: [
      { id: "oWTXFA5YAEY", label: "Spot 1" },
      { id: "nNpKQX5AaKc", label: "Spot 2" },
      { id: "Bs0Eabp6jM4", label: "Short 1", vertical: true },
      { id: "ZRMvfKcDRPA", label: "Short 2", vertical: true },
      { id: "LmvdLYXI1l4", label: "Short 3", vertical: true },
    ],
    caseNo: "Caso 01",
    title: "Compramos Tu Casa",
    sub: "PropTech · Lead Content, Graphics & Product Designer",
    concept:
      "Branding, UI/UX y campañas potenciadas con IA. Conceptos como “Más rápido que comprar una pizza” y ads optimizados para A/B testing.",
  },
  {
    accent: "#8ee84a",
    gallery: [
      { src: "/assets/casos/poison1.jpg", alt: "Lata Poison Energy Drink" },
      {
        src: "/assets/casos/poison2.jpg",
        alt: "Esqueleto sosteniendo la lata de Poison",
      },
      {
        src: "/assets/casos/poison3.jpg",
        alt: "Billboard de Poison — Pure Raw Energy",
      },
      {
        src: "/assets/casos/poison4.jpg",
        alt: "Mupi de Poison en la ciudad de noche",
      },
    ],
    videos: [{ id: "rk8uh1dmTHw", label: "Ver spot" }],
    caseNo: "Caso 02",
    title: "Poison",
    sub: "Energy Drink · Branding & dirección de arte",
    concept:
      "Identidad oscura de inspiración metal: lata, sistema gráfico y campaña OOH. “Pure raw energy — drink at your own risk.”",
  },
  {
    accent: "#3b9ae0",
    gallery: [
      {
        src: "/assets/casos/dogi1.jpg",
        alt: "Labrador descansando panza arriba en cama dogi-dogi",
      },
      {
        src: "/assets/casos/dogi2.jpg",
        alt: "Señalización digital dogi-dogi en plaza — Where pets truly rest",
      },
      {
        src: "/assets/casos/dogi3.jpg",
        alt: "Playera polo dogi-dogi con la mascota",
      },
      {
        src: "/assets/casos/dogi4.jpg",
        alt: "Schnauzer relajado en cama dogi-dogi",
      },
      {
        src: "/assets/casos/dogi-mascota.jpg",
        alt: "Personaje de marca dogi-dogi en varias poses",
      },
      {
        alt: "Línea de camas dogi-dogi",
        bg: "dark",
        cols: 3,
        collage: [
          { src: "/assets/casos/dogi-p1.jpg", alt: "Cama dogi-dogi azul plush" },
          { src: "/assets/casos/dogi-p2.jpg", alt: "Cama dogi-dogi rosa" },
          {
            src: "/assets/casos/dogi-p3.jpg",
            alt: "Cama dogi-dogi rojo con azul marino",
          },
          {
            src: "/assets/casos/dogi-p4.jpg",
            alt: "Cama dogi-dogi azul con borrega gris",
          },
          { src: "/assets/casos/dogi-p5.jpg", alt: "Cojín dogi-dogi gris" },
        ],
      },
    ],
    caseNo: "Caso 03",
    title: "dogi-dogi",
    sub: "Camas para mascotas · Dirección de arte",
    concept:
      "Ternura y descanso como territorio de marca. “Where pets truly rest” — campaña OOH y merchandising cálido.",
  },
];

export default function Work() {
  return (
    <section id="trabajo">
      <div className="wrap cases-head">
        <div className="eyebrow reveal">Trabajo seleccionado</div>
      </div>
      {cases.map((c) => (
        <article
          className="case"
          key={c.caseNo}
          style={{ "--accent": c.accent } as CSSProperties}
        >
          {c.gallery ? (
            <CaseCarousel images={c.gallery} />
          ) : (
            <>
              {c.note && <span className="placeholder-note">{c.note}</span>}
              <div className="bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.alt} />
              </div>
            </>
          )}
          <div className="scrim" />
          <div className="content">
            <div className="cinner">
              <div>
                <div className="num">
                  <span className="sq" />
                  {c.caseNo}
                </div>
                <h2>
                  <span className="case-title-row">
                    {c.title}
                    {c.videos && c.videos.length > 0 && (
                      <span className="case-spots">
                        {c.videos.map((v) => (
                          <CasePlay
                            key={v.id}
                            id={v.id}
                            label={v.label}
                            vertical={v.vertical}
                            title={c.title}
                          />
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="sub">{c.sub}</span>
                </h2>
              </div>
              <div className="side">
                <div className="role">Concepto</div>
                <p>{c.concept}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
