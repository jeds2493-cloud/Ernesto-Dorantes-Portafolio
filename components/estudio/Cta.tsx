import type { ReactNode } from "react";
import AgendaButton from "@/components/AgendaButton";
import { AGENDA_URL, waLink } from "@/lib/estudio";

// CTA principal: con agendador real abre el calendario; sin él, el formulario.
export const CTA_LABEL = AGENDA_URL ? "Agenda una llamada" : "Cotiza tu proyecto";

export function AgendaCta({
  className = "es-btn es-btn--signal",
  children = CTA_LABEL,
  tipo,
}: {
  className?: string;
  children?: ReactNode;
  /** Preselecciona el servicio en el formulario (solo sin agendador). */
  tipo?: string;
}) {
  if (AGENDA_URL) {
    return (
      <a className={className} href={AGENDA_URL} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <AgendaButton className={className} tipo={tipo}>
      {children}
    </AgendaButton>
  );
}

// CTA de WhatsApp. Con número abre el chat; mientras no haya número en
// lib/estudio.ts abre el formulario, donde la persona deja su WhatsApp.
export function WhatsCta({
  className = "es-btn es-btn--ghost",
}: {
  className?: string;
}) {
  const wa = waLink();
  if (wa) {
    return (
      <a className={className} href={wa} target="_blank" rel="noopener">
        <WaIcon />
        <span className="es-wa-l">Escríbeme por WhatsApp</span>
      </a>
    );
  }
  return (
    <AgendaButton className={className} motivo="whatsapp">
      <WaIcon />
      <span className="es-wa-l">Déjame tu WhatsApp</span>
    </AgendaButton>
  );
}

export function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="es-wa-ic">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.76 4.88-1.28A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.9.76.78-2.83-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48a.92.92 0 0 0-.66.31 2.78 2.78 0 0 0-.87 2.07 4.83 4.83 0 0 0 1.01 2.56c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.17-.47-.29Z"
      />
    </svg>
  );
}
