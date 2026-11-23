// Datos del estudio que cambian seguido. Llena los vacíos y el sitio se ajusta solo.

/** Número de WhatsApp con lada de país, solo dígitos (ej. "5217221234567").
 *  Vacío = no se muestra el botón flotante y el CTA secundario manda a correo. */
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "";

/** Mensaje prellenado al abrir WhatsApp. */
export const WHATSAPP_MSG =
  "Hola Ernesto, vi tu sitio y quiero platicar de mi proyecto.";

/** Cupos disponibles este mes. null = se muestra "Cupos limitados este mes". */
export const CUPOS: number | null = null;

/** URL del agendador (Calendly, Cal.com…). Vacío = abre el formulario en modal. */
export const AGENDA_URL = process.env.NEXT_PUBLIC_AGENDA_URL ?? "";

export const MAIL = "hello@ernestodorantes.com";

export const waLink = (msg = WHATSAPP_MSG) =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}` : "";
