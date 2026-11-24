// Dirección pública del sitio, sin barra final.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ernestodorantes.com"
).replace(/\/+$/, "");
