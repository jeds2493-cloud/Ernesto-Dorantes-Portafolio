"use client";

import { useState } from "react";
import type { FormEvent } from "react";

// Endpoint de Google Apps Script (Web App) que escribe en la Google Sheet.
// Se puede sobreescribir con la variable de entorno NEXT_PUBLIC_FORM_ENDPOINT.
const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbzSb1Ytz9pM47eDS5grx9AG65S7KozZBzqUgd4QLol9ZFeH0oT16XcXnxr-UNFo3nUD/exec";
const MAIL = "hello@ernestodorantes.com";

const projectTypes = [
  "Landing page",
  "Sitio web completo",
  "Contenido mensual para redes",
  "Todavía no sé",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ defaultTipo }: { defaultTipo?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot anti-spam

    setStatus("sending");
    const payload = new URLSearchParams();
    data.forEach((v, k) => {
      // El WhatsApp va también dentro del mensaje, por si la hoja no tiene esa columna.
      if (k === "mensaje") {
        payload.append(k, `WhatsApp: ${data.get("whatsapp") ?? ""}\n${String(v)}`);
      } else {
        payload.append(k, String(v));
      }
    });
    payload.append("origen", "ernestodorantes.com");
    payload.append("fecha", new Date().toLocaleString("es-MX"));

    try {
      if (!FORM_ENDPOINT) throw new Error("sin-endpoint");
      // no-cors: el navegador no deja leer la respuesta; solo detectamos fallas de red.
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      setStatus("sent");
      form.reset();
    } catch {
      // Sin red o sin endpoint: no fingimos que se envió y no borramos lo escrito.
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
        <h3>¡Gracias! Ya lo envié.</h3>
        <p>
          Te escribo por WhatsApp en menos de 24 h. Si para entonces no te llegó
          nada, escríbeme a <a href={`mailto:${MAIL}`}>{MAIL}</a>.
        </p>
        <button type="button" className="contact-reset" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="cf-row">
        <label className="cf-field">
          <span>Nombre *</span>
          <input name="nombre" type="text" required autoComplete="name" placeholder="Tu nombre" />
        </label>
        <label className="cf-field">
          <span>WhatsApp *</span>
          <input
            name="whatsapp"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9 +()\-]{10,}"
            title="Escribe tu número a 10 dígitos"
            placeholder="722 123 4567"
          />
        </label>
      </div>
      <div className="cf-row">
        <label className="cf-field">
          <span>Correo</span>
          <input name="email" type="email" autoComplete="email" placeholder="Opcional" />
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
        <span>¿A qué se dedica tu negocio? *</span>
        <textarea
          name="mensaje"
          required
          rows={3}
          placeholder="Ej.: consultorio dental en Metepec, quiero más citas por WhatsApp."
        />
      </label>
      {/* honeypot — invisible para humanos */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="cf-hp" aria-hidden="true" />
      <button type="submit" className="cf-submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Pedir mi diagnóstico gratis"}
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
