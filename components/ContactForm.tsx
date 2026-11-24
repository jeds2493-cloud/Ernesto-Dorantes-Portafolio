"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent, SyntheticEvent } from "react";
import { MAIL } from "@/lib/estudio";

const projectTypes = [
  "Landing page",
  "Sitio web completo",
  "Tienda en línea",
  "Contenido mensual para redes",
  "A la medida",
  "Todavía no sé",
];

type Status = "idle" | "sending" | "sent" | "error";

const MSG_WA = "Escribe tu WhatsApp a 10 dígitos, por ejemplo 55 1234 5678.";
const MSG_NOMBRE = "Escribe tu nombre.";
const MSG_NEGOCIO = "Cuéntame en una línea a qué se dedica tu negocio.";

export default function ContactForm({
  defaultTipo,
  nota,
  motivo,
  cta,
  onDone,
  onSentChange,
}: {
  defaultTipo?: string;
  /** Lo que el cliente marcó en el armador «A la medida». */
  nota?: string;
  /** «whatsapp»: la persona pidió que le escribas tú; cambia la etiqueta del mensaje y el botón. */
  motivo?: string;
  /** Qué botón abrió el formulario («hero», «sticky»…); va a la hoja en «origen». */
  cta?: string;
  /** Si existe, el éxito muestra «Listo» y lo llama (la ventana se cierra). */
  onDone?: () => void;
  /** Avisa a la ventana cuando el envío se hizo (para ocultar su título). */
  onSentChange?: (sent: boolean) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();
  const helpId = `${uid}-wa-ayuda`;
  const okTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    onSentChange?.(status === "sent");
    if (status === "sent") okTitle.current?.focus({ preventScroll: true });
  }, [status, onSentChange]);

  const onInvalid = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, msg: string) => {
    const el = e.currentTarget;
    if (el.validity.valueMissing || el.validity.patternMismatch) el.setCustomValidity(msg);
  };
  const clear = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    e.currentTarget.setCustomValidity("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot anti-spam

    const wa = form.elements.namedItem("whatsapp") as HTMLInputElement;
    const digits = wa.value.replace(/\D/g, "").length;
    if (digits < 10 || digits > 13) {
      wa.setCustomValidity(MSG_WA);
      wa.reportValidity();
      return;
    }
    wa.setCustomValidity("");

    setStatus("sending");
    const payload = new URLSearchParams();
    data.forEach((v, k) => {
      if (k === "website") return;
      // El WhatsApp va también dentro del mensaje, por si la hoja no tiene esa columna.
      if (k === "mensaje") {
        const combo = nota ? `Combinación: ${nota}\n` : "";
        payload.append(k, `WhatsApp: ${data.get("whatsapp") ?? ""}\n${combo}${String(v)}`);
      } else {
        payload.append(k, String(v));
      }
    });
    // El formulario fijo del cierre manda «cierre»; la ventana, el botón que la abrió.
    const origen = form.closest(".es-final") ? "cierre" : cta;
    payload.append("origen", origen ? `ernestodorantes.com · ${origen}` : "ernestodorantes.com");
    payload.append("fecha", new Date().toLocaleString("es-MX"));

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
        signal: AbortSignal.timeout(12000),
      });
      if (!res.ok) throw new Error(`http-${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      // Sin red, sin respuesta o con error: no fingimos que se envió y no borramos lo escrito.
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-ok" role="status">
        <span className="contact-ok-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 ref={okTitle} tabIndex={-1}>
          ¡Gracias! Tu mensaje va en camino.
        </h3>
        <p>
          Te escribo por WhatsApp en menos de 24 h para agendar la llamada. Si
          para entonces no te llegó nada, escríbeme a{" "}
          <a href={`mailto:${MAIL}`}>{MAIL}</a>.
        </p>
        {onDone && (
          <button type="button" className="cf-submit cf-done" onClick={onDone}>
            Listo
          </button>
        )}
        <button type="button" className="contact-reset" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const esWa = motivo === "whatsapp";
  const sending = status === "sending";

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {nota && (
        <p className="cf-nota">
          <b>Tu combinación:</b> {nota}
          <input type="hidden" name="combinacion" value={nota} />
        </p>
      )}
      <div className="cf-row">
        <label className="cf-field">
          <span>Nombre *</span>
          <input
            name="nombre"
            type="text"
            required
            autoComplete="name"
            enterKeyHint="next"
            placeholder="Tu nombre"
            onInvalid={(e) => onInvalid(e, MSG_NOMBRE)}
            onInput={clear}
          />
        </label>
        <label className="cf-field">
          <span>WhatsApp *</span>
          <input
            name="whatsapp"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            pattern="[0-9 +\(\)\-]{10,20}"
            placeholder="55 1234 5678"
            aria-describedby={helpId}
            onInvalid={(e) => onInvalid(e, MSG_WA)}
            onInput={clear}
          />
          <small id={helpId} className="cf-help" aria-hidden="true">
            10 dígitos
          </small>
        </label>
      </div>
      <div className="cf-row">
        <label className="cf-field">
          <span>Correo (opcional)</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            enterKeyHint="next"
            placeholder="tu@correo.com"
          />
        </label>
        <label className="cf-field">
          <span>¿Qué necesitas?</span>
          <select name="tipo" defaultValue={defaultTipo ?? ""}>
            <option value="" disabled>
              Selecciona…
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="cf-field">
        <span>{esWa ? "¿En qué te ayudo? *" : "¿A qué se dedica tu negocio y qué quieres lograr? *"}</span>
        <textarea
          name="mensaje"
          required
          rows={3}
          enterKeyHint="send"
          placeholder="Ej.: consultorio dental, quiero más citas por WhatsApp."
          onInvalid={(e) => onInvalid(e, MSG_NEGOCIO)}
          onInput={clear}
        />
      </label>
      {/* honeypot — invisible para humanos */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="cf-hp" aria-hidden="true" />
      <button type="submit" className="cf-submit" aria-disabled={sending}>
        {sending ? "Enviando…" : esWa ? "Enviar mi WhatsApp" : "Pedir mi llamada de 20 minutos"}
      </button>
      {status === "error" && (
        <p className="cf-error" role="alert">
          No se pudo enviar. Revisa tu conexión e inténtalo de nuevo; lo que
          escribiste sigue aquí. También puedes escribirme a{" "}
          <a href={`mailto:${MAIL}`}>{MAIL}</a>.
        </p>
      )}
    </form>
  );
}
