"use client";

// Piezas chicas con estado del home: disponibilidad, correo que se copia y
// la barra fija de celular.

import { useEffect, useState, type ReactNode } from "react";
import { AgendaCta } from "./Cta";
import { AGENDA_URL } from "@/lib/estudio";

/** Señal de estudio vivo: un punto que late y la disponibilidad. */
export function LiveStatus({ label }: { label: ReactNode }) {
  return (
    <span className="es-live">
      <i aria-hidden="true" />
      {label}
    </span>
  );
}

/** Correo que se copia al tocarlo (si el navegador no deja, abre el correo). */
export function CopyMail({ mail }: { mail: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mail);
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.href = `mailto:${mail}`;
    }
  };
  return (
    <button type="button" className="es-copy" onClick={copy}>
      <span>{mail}</span>
      <em aria-live="polite">{done ? "Copiado" : "Copiar"}</em>
    </button>
  );
}

/** Barra fija de celular: aparece al pasar los botones del inicio y se
 *  esconde cuando ya está a la vista el formulario del cierre. */
export function StickyCta({ label, wa }: { label: string; wa: string }) {
  const [on, setOn] = useState(false);
  const [nota, setNota] = useState("");
  useEffect(() => {
    const onPicks = (e: Event) => {
      const n = (e as CustomEvent<{ nota?: string }>).detail?.nota;
      setNota(typeof n === "string" ? n.trim() : "");
    };
    window.addEventListener("builder-picks", onPicks);
    return () => window.removeEventListener("builder-picks", onPicks);
  }, []);
  useEffect(() => {
    const hero = document.querySelector(".es-hero .es-ctas");
    const end = document.querySelector(".es-final");
    if (!hero || !end) return;
    const others = [
      ...document.querySelectorAll(".es-builder-foot, .es-about .es-ctas, .es-pack-stub .es-btn"),
    ];
    const state = new Map<Element, boolean>([
      [hero, true],
      [end, false],
      ...others.map((el) => [el, false] as [Element, boolean]),
    ]);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) state.set(e.target, e.isIntersecting);
      setOn(![...state.values()].some(Boolean));
    });
    state.forEach((_, el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const text = nota ? "Cotizar mi combinación" : label;
  return (
    <div className={`es-sticky${on ? " is-on" : ""}`} inert={!on}>
      {AGENDA_URL && !nota ? (
        <AgendaCta>{text}</AgendaCta>
      ) : (
        <button
          type="button"
          className="es-btn es-btn--signal"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("open-contact", {
                detail: nota ? { tipo: "A la medida", nota, cta: "sticky" } : { cta: "sticky" },
              }),
            )
          }
        >
          {text}
        </button>
      )}
      {wa && (
        <a className="es-sticky-wa" href={wa} target="_blank" rel="noopener" aria-label="Escríbeme por WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.76 4.88-1.28A10 10 0 1 0 12 2Zm4.5 12.06c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5l.37-.43c.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43l-.76-1.84c-.2-.48-.4-.42-.56-.42h-.48a.92.92 0 0 0-.66.31 2.78 2.78 0 0 0-.87 2.07 4.83 4.83 0 0 0 1.01 2.56c.12.17 1.75 2.67 4.24 3.74 1.5.65 2.1.7 2.97.58.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.17-.47-.29Z"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
