"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

// Modal global del formulario de contacto.
// Se abre disparando el evento `window.dispatchEvent(new Event("open-contact"))`.
export default function ContactModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
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
      aria-label="Agenda una sesión"
      onClick={() => setOpen(false)}
    >
      <div className="contact-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="contact-modal-close"
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
        >
          ✕
        </button>
        <h3 className="contact-modal-title">
          Agenda una <span className="o">sesión</span>
        </h3>
        <p className="contact-modal-sub">
          Cuéntame lo esencial de tu proyecto y te respondo con los siguientes
          pasos. Solo lo básico.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
