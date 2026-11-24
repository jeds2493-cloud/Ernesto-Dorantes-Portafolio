"use client";

import type { MouseEvent, ReactNode } from "react";

// Dónde está el botón → origen que se guarda en la hoja («ernestodorantes.com · hero»).
function origenDe(el: HTMLElement, tipo?: string): string | undefined {
  if (el.closest(".es-sticky")) return "sticky";
  if (el.closest(".es-final")) return "cierre";
  if (el.closest(".es-header")) return "header";
  if (el.closest(".es-hero")) return "hero";
  if (el.closest(".es-pack")) {
    const t = (tipo ?? "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return t ? `paquete-${t}` : "paquete";
  }
  if (el.closest("#quien")) return "quien";
  if (el.closest("#preguntas")) return "preguntas";
  return undefined;
}

// Botón que abre el modal global del formulario de contacto.
// `tipo` preselecciona el servicio en el formulario (p. ej. desde "Cotizar sitio").
// `motivo="whatsapp"` abre la ventana con los textos de «te escribo yo por WhatsApp».
export default function AgendaButton({
  className,
  children,
  tipo,
  motivo,
}: {
  className?: string;
  children: ReactNode;
  tipo?: string;
  motivo?: "whatsapp";
}) {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    // En el cierre el formulario ya está al lado: lleva a él en vez de abrir otra ventana.
    if (motivo === "whatsapp" && el.closest(".es-final")) {
      const card = document.querySelector<HTMLElement>(".es-form-card");
      const input = card?.querySelector<HTMLInputElement>("input[name=whatsapp]");
      if (card && input) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        input.focus({ preventScroll: true });
        return;
      }
    }
    window.dispatchEvent(
      new CustomEvent("open-contact", { detail: { tipo, motivo, cta: origenDe(el, tipo) } }),
    );
  };
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
