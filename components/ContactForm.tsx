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
  "Branding e identidad",
  "Campaña y dirección de arte",
  "Producto y experiencias digitales",
  "Creative partner (continuo)",
  "Otro",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot anti-spam

    setStatus("sending");
    const payload = new URLSearchParams();
    data.forEach((v, k) => payload.append(k, String(v)));
    payload.append("origen", "ernestodorantes.com");
    payload.append("fecha", new Date().toLocaleString("es-MX"));

    try {
      if (!FORM_ENDPOINT) throw new Error("sin-endpoint");
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      setStatus("sent");
      form.reset();
    } catch {
      // respaldo: si aún no hay hoja conectada, abre el correo con los datos
      const subject = `Nuevo proyecto — ${data.get("nombre") ?? ""}`;
      const body =
        `Nombre: ${data.get("nombre") ?? ""}\n` +
        `Email: ${data.get("email") ?? ""}\n` +
        `Empresa: ${data.get("empresa") ?? ""}\n` +
        `Tipo de proyecto: ${data.get("tipo") ?? ""}\n\n` +
        `${data.get("mensaje") ?? ""}`;
      window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-ok">
        <span className="contact-ok-ic">✓</span>
        <h3>¡Gracias! Mensaje recibido.</h3>
        <p>
          Te contactaré muy pronto. Si es urgente, escríbeme directo a{" "}
          <a href={`mailto:${MAIL}`}>{MAIL}</a>.
        </p>
        <button
          type="button"
          className="contact-reset"
          onClick={() => setStatus("idle")}
        >
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
          <input
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
          />
        </label>
        <label className="cf-field">
          <span>Email *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@correo.com"
          />
        </label>
      </div>
      <div className="cf-row">
        <label className="cf-field">
          <span>Empresa o marca</span>
          <input
            name="empresa"
            type="text"
            autoComplete="organization"
            placeholder="Opcional"
          />
        </label>
        <label className="cf-field">
          <span>Tipo de proyecto</span>
          <select name="tipo" defaultValue="">
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
        <span>Cuéntame sobre tu proyecto *</span>
        <textarea
          name="mensaje"
          required
          rows={4}
          placeholder="Objetivo, alcance, fechas aproximadas… lo que tengas en mente."
        />
      </label>
      {/* honeypot — invisible para humanos */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="cf-hp"
        aria-hidden="true"
      />
      <button type="submit" className="cf-submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
      {status === "error" && (
        <p className="cf-error">No se pudo enviar. Escríbeme a {MAIL}.</p>
      )}
    </form>
  );
}
