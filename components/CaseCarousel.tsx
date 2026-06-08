"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type Leaf = { src: string; alt: string; contain?: boolean };
type Slide = {
  src?: string;
  alt: string;
  contain?: boolean;
  collage?: Leaf[];
  bg?: "blue" | "dark";
  cols?: 2 | 3;
};

/**
 * Carrusel de fondo para un caso. Cada slide puede ser una sola imagen
 * (a pantalla completa) o un collage de varias imágenes en una rejilla.
 * Al hacer clic en cualquier imagen abre el visor (lightbox), que navega
 * por todas las imágenes individuales del caso.
 */
export default function CaseCarousel({ images }: { images: Slide[] }) {
  const slides = images;
  const n = slides.length;
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);

  // aplana todas las imágenes (para el visor) y guarda el índice inicial por slide
  const leaves: Leaf[] = [];
  const starts: number[] = [];
  slides.forEach((s) => {
    starts.push(leaves.length);
    if (s.collage) s.collage.forEach((l) => leaves.push(l));
    else leaves.push({ src: s.src ?? "", alt: s.alt, contain: s.contain });
  });
  const total = leaves.length;

  useEffect(() => {
    if (zoom !== null) return;
    const id = setTimeout(() => setI((p) => (p + 1) % n), 4500);
    return () => clearTimeout(id);
  }, [i, n, zoom]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, total]);

  const go = (d: number) => setI((p) => (p + d + n) % n);

  // swipe (táctil y arrastre con mouse) en la vista normal
  const startX = useRef(0);
  const swiped = useRef(false);
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    swiped.current = false;
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };
  // abre el visor solo si no fue un swipe
  const openZoom = (idx: number) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    setZoom(idx);
  };

  return (
    <>
      <div
        className="bg bg-carousel"
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`cc-slide${idx === i ? " on" : ""}`}
            aria-hidden={idx !== i}
          >
            {s.collage ? (
              <div
                className={`cc-collage ${s.bg === "blue" ? "bg-blue" : "bg-dark"} ${
                  s.cols === 2 ? "cols2" : "cols3"
                }`}
              >
                {s.collage.map((l, j) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={l.src}
                    src={l.src}
                    alt={l.alt}
                    loading="lazy"
                    decoding="async"
                    className={l.contain ? "contain" : ""}
                    onClick={() => openZoom(starts[idx] + j)}
                  />
                ))}
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className={s.contain ? "contain" : ""}
                onClick={() => openZoom(starts[idx])}
              />
            )}
          </div>
        ))}
      </div>

      <div className="cc-ui">
        <div className="cc-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={idx === i ? "on" : ""}
              onClick={() => setI(idx)}
              aria-label={`Ir al slide ${idx + 1}`}
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
    </>
  );
}
