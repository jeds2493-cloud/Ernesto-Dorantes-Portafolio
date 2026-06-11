"use client";

import type { ReactNode } from "react";

// Botón que abre el modal global del formulario de contacto.
export default function AgendaButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("open-contact"))}
    >
      {children}
    </button>
  );
}
