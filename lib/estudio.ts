// Datos del estudio que cambian seguido. Llena los vacíos y el sitio se ajusta solo.

/** Número de WhatsApp con lada de país, solo dígitos (ej. "5215512345678").
 *  Vacío = no hay botón flotante y el CTA de WhatsApp abre el formulario. */
export const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP ?? "").replace(/\D/g, "");

/** Mensaje prellenado al abrir WhatsApp. */
export const WHATSAPP_MSG =
  "Hola, Ernesto. Vi tu sitio y quiero platicar de mi proyecto.";

/** Lugares que quedan este mes. null = «Pocos proyectos este mes» (sin número).
 *  Pon un número solo si es real: el sitio dirá «Quedan N lugares este mes». */
export const CUPOS: number | null = null;

/** URL del agendador (Calendly, Cal.com…). Vacío = abre el formulario en modal. */
export const AGENDA_URL = process.env.NEXT_PUBLIC_AGENDA_URL ?? "";

export const MAIL = "hello@ernestodorantes.com";

/** Precios «desde» en pesos (por validar con cotizaciones reales).
 *  Los usan las tarjetas de paquetes y el armador «A la medida». */
export const PRECIOS = { landing: 9900, sitio: 24900, contenido: 7900 } as const;

/** Caso real de la sección «Resultados». `cliente` vacío = no se nombra a la
 *  empresa (solo el giro). Con nombre, aparece en la etiqueta y en el pie. */
export const CASO: { cliente: string; giro: string } = {
  cliente: "",
  giro: "Empresa inmobiliaria",
};

export const waLink = (msg = WHATSAPP_MSG) =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}` : "";
