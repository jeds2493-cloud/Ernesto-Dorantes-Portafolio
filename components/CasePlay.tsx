"use client";

import { useEffect, useState } from "react";

/**
 * Botón de play junto al título de un caso. Abre el spot (YouTube)
 * en un modal con autoplay. Cierra con Esc, clic en el fondo o la ✕.
 */
export default function CasePlay({
  id,
  label = "Ver spot",
  title,
  vertical = false,
}: {
  id: string;
  label?: string;
  title?: string;
  vertical?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="play-btn"
        onClick={() => setOpen(true)}
        aria-label={`Reproducir ${label}${title ? " de " + title : ""}`}
      >
        <svg
          className="play-ic"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        <span className="play-label">{label}</span>
      </button>

      {open && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${title ?? ""} — ${label}`}
          onClick={() => setOpen(false)}
        >
          <div
            className={`vm-inner${vertical ? " vertical" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="vm-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar video"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
              title={`${title ?? ""} — ${label}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
