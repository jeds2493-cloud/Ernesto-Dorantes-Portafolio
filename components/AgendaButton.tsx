"use client";

import type { ReactNode } from "react";

// Botón que abre el modal global del formulario de contacto.
// `tipo` preselecciona el servicio en el formulario (p. ej. desde "Cotizar sitio").
export default function AgendaButton({
  className,
  children,
  tipo,
}: {
  className?: string;
  children: ReactNode;
  tipo?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent("open-contact", { detail: { tipo } }))
      }
    >
      {children}
    </button>
  );
}
