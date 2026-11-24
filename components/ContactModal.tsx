"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import ContactForm from "./ContactForm";
import "../app/contacto.css";

// Modal global del formulario de contacto.
// Se abre con
//   window.dispatchEvent(new CustomEvent("open-contact", { detail }))
// donde detail = { tipo?, nota?, motivo?, cta? } (todo opcional):
//   tipo   preselecciona el servicio.
//   nota   lleva lo marcado en el armador «A la medida».
//   motivo "whatsapp" cambia los textos: la persona deja su número y tú le escribes.
//   cta    origen del clic («hero», «sticky», «paquete-landing-page»…); va a la hoja.
type Detalle = { tipo?: string; nota?: string; motivo?: string; cta?: string };

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [d, setD] = useState<Detalle>({});
  const [sent, setSent] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const downFondo = useRef(false);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const x = (e as CustomEvent<Detalle | null>).detail;
      setD({ tipo: x?.tipo, nota: x?.nota, motivo: x?.motivo, cta: x?.cta ?? (x?.nota ? "armador" : undefined) });
      setSent(false);
      setOpen(true);
    };
    window.addEventListener("open-contact", onOpen);
    return () => window.removeEventListener("open-contact", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const rootEl = root.current;

    // Todo lo que no contiene la ventana queda inerte (incluidos skip-link y .es).
    const inerted: HTMLElement[] = [];
    Array.from(document.body.children).forEach((el) => {
      if (el instanceof HTMLElement && !(rootEl && el.contains(rootEl)) && !el.inert) {
        el.inert = true;
        inerted.push(el);
      }
    });
    // La caja, no el primer campo: en celular enfocar un campo abriría el teclado solo.
    box.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !rootEl) return;
      const f = Array.from(
        rootEl.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]):not([tabindex="-1"]),select:not([disabled]),textarea:not([disabled])',
        ),
      ).filter((n) => n.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      const act = document.activeElement;
      if (e.shiftKey && (act === first || act === box.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && act === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      inerted.forEach((el) => {
        el.inert = false;
      });
      prev?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;

  const wa = d.motivo === "whatsapp";

  return (
    <div
      ref={root}
      className="contact-modal"
      data-lenis-prevent
      onPointerDown={(e) => {
        downFondo.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        // Solo cierra si el clic empezó y terminó en el fondo: arrastrar una selección hacia fuera no la cierra.
        if (e.target === e.currentTarget && downFondo.current) setOpen(false);
        downFondo.current = false;
      }}
    >
      <div
        ref={box}
        className="contact-modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button type="button" className="contact-modal-close" onClick={close} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <h3 id={titleId} className={`contact-modal-title${sent ? " cm-oculto" : ""}`}>
          {wa ? (
            <>
              Te escribo yo por <span className="o">WhatsApp</span>
            </>
          ) : (
            <>
              Cotiza tu <span className="o">proyecto</span>
            </>
          )}
        </h3>
        {!sent && (
          <p className="contact-modal-sub">
            {wa
              ? "Déjame tu número y en menos de 24 h te escribo. Si tienes una duda, ponla abajo y te la contesto ahí."
              : "Déjame tu WhatsApp y en menos de 24 h te propongo una llamada de 20 minutos. Sin costo y sin compromiso."}
          </p>
        )}
        <ContactForm
          key={`${d.tipo ?? "general"}|${d.nota ?? ""}|${d.motivo ?? ""}`}
          defaultTipo={d.tipo}
          nota={d.nota}
          motivo={d.motivo}
          cta={d.cta}
          onDone={close}
          onSentChange={setSent}
        />
      </div>
    </div>
  );
}
