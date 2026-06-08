"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import CasePlay from "@/components/CasePlay";

type Leaf = { src: string; alt: string; contain?: boolean };
type GItem = {
  src?: string;
  alt: string;
  contain?: boolean;
  collage?: Leaf[];
  bg?: "blue" | "dark";
  cols?: 2 | 3;
};
type Case = {
  accent: string;
  cover: string;
  gallery: GItem[];
  videos?: { id: string; label: string; vertical?: boolean }[];
  caseNo: string;
  title: string;
  sub: string;
  concept: string;
};

const cases: Case[] = [
  {
    accent: "#ff7a42",
    cover: "/assets/casos/compramos5.jpg",
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
    cover: "/assets/casos/poison2.jpg",
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
    cover: "/assets/casos/dogi1.jpg",
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

function flatten(gallery: GItem[]): Leaf[] {
  const out: Leaf[] = [];
  gallery.forEach((g) => {
    if (g.collage) g.collage.forEach((l) => out.push(l));
    else if (g.src) out.push({ src: g.src, alt: g.alt, contain: g.contain });
  });
  return out;
}

export default function Work() {
  const n = cases.length;
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);

  const current = cases[active];
  const leaves = flatten(current.gallery);
  const total = leaves.length;

  const go = (d: number) => setActive((p) => (p + d + n) % n);

  // swipe en el cover flow (táctil y arrastre)
  const startX = useRef(0);
  const moved = useRef(false);
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    moved.current = false;
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 45) {
      moved.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  // visor: teclado + bloqueo de scroll
  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      else if (e.key === "ArrowRight")
        setZoom((p) => (p === null ? p : (p + 1) % total));
      else if (e.key === "ArrowLeft")
        setZoom((p) => (p === null ? p : (p - 1 + total) % total));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, total]);

  return (
    <section id="trabajo" className="work">
      <div className="wrap cases-head">
        <div className="eyebrow reveal">Trabajo seleccionado</div>
      </div>

      <div className="flow" onPointerDown={onDown} onPointerUp={onUp}>
        <div className="flow-stage">
          {cases.map((c, idx) => {
            const off = idx - active;
            const a = Math.abs(off);
            const sign = Math.sign(off);
            const style = {
              transform: `translate(-50%,-50%) translateX(${off * 54}%) translateZ(${
                -a * 180
              }px) rotateY(${-sign * 44}deg) scale(${Math.max(0.62, 1 - a * 0.12)})`,
              zIndex: 100 - a,
              opacity: a > 2 ? 0 : 1,
              filter: `brightness(${Math.max(0.45, 1 - a * 0.42)})`,
              pointerEvents: a > 2 ? "none" : "auto",
              "--accent": c.accent,
            } as CSSProperties;
            return (
              <button
                key={c.caseNo}
                type="button"
                className={`flow-card${off === 0 ? " is-active" : ""}`}
                style={style}
                onClick={() => {
                  if (moved.current) {
                    moved.current = false;
                    return;
                  }
                  if (off === 0) setZoom(0);
                  else setActive(idx);
                }}
                aria-label={
                  off === 0 ? `Abrir galería de ${c.title}` : `Ver ${c.title}`
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.cover} alt={c.title} draggable={false} />
                <span className="flow-card-no">{c.caseNo}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flow-dots">
        {cases.map((c, idx) => (
          <button
            key={c.caseNo}
            type="button"
            className={idx === active ? "on" : ""}
            onClick={() => setActive(idx)}
            aria-label={`Ir a ${c.title}`}
          />
        ))}
      </div>

      <div
        className="flow-info"
        key={current.caseNo}
        style={{ "--accent": current.accent } as CSSProperties}
      >
        <div className="num">
          <span className="sq" />
          {current.caseNo}
        </div>
        <h2>
          {current.title}
          <span className="sub">{current.sub}</span>
        </h2>
        <p className="flow-concept">{current.concept}</p>
        <div className="flow-actions">
          <button
            type="button"
            className="flow-gallery-btn"
            onClick={() => setZoom(0)}
          >
            Ver galería ({total})
          </button>
          {current.videos?.map((v) => (
            <CasePlay
              key={v.id}
              id={v.id}
              label={v.label}
              vertical={v.vertical}
              title={current.title}
            />
          ))}
        </div>
      </div>

      {zoom !== null && (
        <div
          className="img-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imagen"
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            className="im-close"
            onClick={() => setZoom(null)}
            aria-label="Cerrar imagen"
          >
            ✕
          </button>
          {total > 1 && (
            <button
              type="button"
              className="im-nav im-prev"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((p) => (p === null ? p : (p - 1 + total) % total));
              }}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`im-img${leaves[zoom].contain ? " contain" : ""}`}
            src={leaves[zoom].src}
            alt={leaves[zoom].alt}
            onClick={(e) => e.stopPropagation()}
          />
          {total > 1 && (
            <button
              type="button"
              className="im-nav im-next"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((p) => (p === null ? p : (p + 1) % total));
              }}
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          )}
          <div className="im-count">
            {zoom + 1} / {total}
          </div>
        </div>
      )}
    </section>
  );
}
