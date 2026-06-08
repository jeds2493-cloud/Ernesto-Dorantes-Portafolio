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

// genera una galería de N piezas con nombre secuencial
const gen = (prefix: string, count: number, alt: string): GItem[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/assets/casos/${prefix}${i + 1}.jpg`,
    alt: `${alt} ${i + 1}`,
  }));

const COORD_SUB = "Coordinación de publicidad · Casting, locaciones y dirección de arte";
const COORD_CONCEPT =
  "Coordinación de la campaña: casting de modelos, scouting de locaciones, dirección artística, props y mood, y la distribución del material de los shootings en medios exteriores (OOH).";

const cases: Case[] = [
  {
    accent: "#ff7a42",
    cover: "/assets/casos/compramos-portada.jpg",
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
    cover: "/assets/casos/poison-portada.jpg",
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
    cover: "/assets/casos/dogi-portada.jpg",
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
  {
    accent: "#f4cf52",
    cover: "/assets/casos/pocho-portada.jpg",
    gallery: [
      { src: "/assets/casos/pocho6.jpg", alt: "Niños modelando pijamas Pochokino" },
      {
        src: "/assets/casos/pocho3.jpg",
        alt: "Pijama Pochokino que brilla en la oscuridad",
      },
      { src: "/assets/casos/pocho4.jpg", alt: "Pijama infantil Pochokino" },
      { src: "/assets/casos/pocho5.jpg", alt: "Pijama infantil Pochokino" },
      { src: "/assets/casos/pocho7.jpg", alt: "Pieza de campaña Pochokino" },
      { src: "/assets/casos/pocho8.jpg", alt: "Pieza de campaña Pochokino" },
      { src: "/assets/casos/pocho1.jpg", alt: "Pieza de campaña Pochokino" },
      { src: "/assets/casos/pocho2.jpg", alt: "Pieza de campaña Pochokino" },
    ],
    caseNo: "Caso 04",
    title: "Pochokino",
    sub: "Pijamas infantiles · Branding & dirección de arte",
    concept:
      "Identidad cálida y juguetona para el descanso en familia: producto, modelos infantiles y piezas para redes y tienda en línea.",
  },
  {
    accent: "#e8443a",
    cover: "/assets/casos/ag-portada.jpg",
    gallery: gen("ag", 11, "Campaña Action Gear — pieza"),
    caseNo: "Caso 05",
    title: "Action Gear",
    sub: COORD_SUB,
    concept: COORD_CONCEPT,
  },
  {
    accent: "#62c9c0",
    cover: "/assets/casos/bopt-portada.jpg",
    gallery: gen("bopt", 13, "Campaña Baby Optima — pieza"),
    caseNo: "Caso 06",
    title: "Baby Optima",
    sub: COORD_SUB,
    concept: COORD_CONCEPT,
  },
  {
    accent: "#e3242b",
    cover: "/assets/casos/baby-portada.jpg",
    gallery: gen("baby", 8, "Campaña Baby Creysi — pieza"),
    caseNo: "Caso 07",
    title: "Baby Creysi",
    sub: COORD_SUB,
    concept: COORD_CONCEPT,
  },
  {
    accent: "#e6dcc4",
    cover: "/assets/casos/skiny-portada.jpg",
    gallery: gen("skiny", 7, "Campaña Skiny — pieza"),
    caseNo: "Caso 08",
    title: "Skiny",
    sub: COORD_SUB,
    concept: COORD_CONCEPT,
  },
  {
    accent: "#f3a08a",
    cover: "/assets/casos/tb-portada.jpg",
    gallery: gen("tb", 23, "Campaña Tops & Bottoms — pieza"),
    caseNo: "Caso 09",
    title: "Tops & Bottoms",
    sub: COORD_SUB,
    concept: COORD_CONCEPT,
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

  // swipe + tilt en el escenario
  const stageRef = useRef<HTMLDivElement>(null);
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
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--tx", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--ty", String((e.clientY - r.top) / r.height - 0.5));
  };
  const onLeave = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--tx", "0");
    el.style.setProperty("--ty", "0");
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

  const cardStyle = (idx: number): CSSProperties => {
    const off = idx - active;
    const a = Math.abs(off);
    const sign = Math.sign(off);
    if (off === 0) {
      return {
        transform:
          "translate(-50%,-50%) translateX(calc(var(--tx,0) * 16px)) translateY(calc(var(--ty,0) * 12px)) translateZ(80px) rotateX(calc(var(--ty,0) * 13deg)) rotateY(calc(var(--tx,0) * -17deg)) scale(1.03)",
        zIndex: 60,
        opacity: 1,
        "--accent": cases[idx].accent,
      } as CSSProperties;
    }
    const tx = sign * (40 + (a - 1) * 17);
    const tz = -(50 + a * 80);
    const sc = Math.max(0.55, 1 - a * 0.1);
    return {
      transform: `translate(-50%,-50%) translateX(${tx}%) translateZ(${tz}px) rotateY(${
        -sign * 46
      }deg) scale(${sc})`,
      zIndex: 50 - a,
      opacity: a > 3 ? 0 : 1 - (a - 1) * 0.14,
      filter: `brightness(${Math.max(0.4, 1 - a * 0.26)})`,
      pointerEvents: a > 3 ? "none" : "auto",
      "--accent": cases[idx].accent,
    } as CSSProperties;
  };

  return (
    <section id="trabajo" className="work">
      <div className="wrap cases-head">
        <div className="eyebrow reveal">Trabajo seleccionado</div>
      </div>

      <div className="work-cols">
        <div className="flow-col">
      <div
        className="flow"
        ref={stageRef}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="flow-stage">
          {cases.map((c, idx) => (
            <button
              key={c.caseNo}
              type="button"
              className={`flow-card${idx === active ? " is-active" : ""}`}
              style={cardStyle(idx)}
              onClick={() => {
                if (moved.current) {
                  moved.current = false;
                  return;
                }
                if (idx === active) setZoom(0);
                else setActive(idx);
              }}
              aria-label={
                idx === active ? `Abrir galería de ${c.title}` : `Ver ${c.title}`
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.cover} alt={c.title} draggable={false} />
              <span className="flow-glass" />
              <span className="flow-card-no">{c.caseNo}</span>
            </button>
          ))}
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
