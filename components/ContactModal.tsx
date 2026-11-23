"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

// Modal global del formulario de contacto.
// Se abre con `window.dispatchEvent(new CustomEvent("open-contact", { detail: { tipo } }))`;
// `tipo` (opcional) preselecciona el servicio.
export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<string | undefined>();

  useEffect(() => {
    const onOpen = (e: Event) => {
      setTipo((e as CustomEvent<{ tipo?: string } | null>).detail?.tipo);
      setOpen(true);
    };
    window.addEventListener("open-contact", onOpen);
    return () => window.removeEventListener("open-contact", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="contact-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Pide tu diagnóstico gratis"
      onClick={() => setOpen(false)}
    >
      <div className="contact-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="contact-modal-close"
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <h3 className="contact-modal-title">
          Pide tu <span className="o">diagnóstico</span>
        </h3>
        <p className="contact-modal-sub">
          Déjame tu WhatsApp y en menos de 24 h te propongo una llamada de 20
          minutos. Sin costo y sin compromiso.
        </p>
        <ContactForm key={tipo ?? "general"} defaultTipo={tipo} />
      </div>
    </div>
  );
}
