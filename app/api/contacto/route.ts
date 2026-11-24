// Recibe el formulario y lo reenvía al Apps Script que escribe en la hoja.
// El endpoint vive en el servidor: el navegador solo habla con /api/contacto,
// así se puede leer la respuesta y confirmar el envío solo si llegó de verdad.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzSb1Ytz9pM47eDS5grx9AG65S7KozZBzqUgd4QLol9ZFeH0oT16XcXnxr-UNFo3nUD/exec";

const json = (body: Record<string, unknown>, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  const endpoint =
    process.env.FORM_ENDPOINT || process.env.NEXT_PUBLIC_FORM_ENDPOINT || DEFAULT_ENDPOINT;

  let params: URLSearchParams;
  try {
    const raw = await req.text();
    if (raw.length > 20000) return json({ ok: false }, 413);
    params = new URLSearchParams(raw);
  } catch {
    return json({ ok: false }, 400);
  }

  // Campo trampa: un bot lo llena; respondemos 200 sin reenviar nada.
  if (params.get("website")) return json({ ok: true }, 200);
  params.delete("website");

  for (const k of ["nombre", "whatsapp", "mensaje"]) {
    if (!params.get(k)?.trim()) return json({ ok: false, campo: k }, 400);
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return json({ ok: false }, 502);
    // El script publicado contesta JSON {ok:true|false}; un cuerpo que no sea JSON cuenta como éxito.
    const text = await res.text();
    try {
      const parsed = JSON.parse(text);
      if (parsed && parsed.ok === false) return json({ ok: false }, 502);
    } catch {
      /* no es JSON: éxito con 2xx */
    }
    return json({ ok: true }, 200);
  } catch {
    return json({ ok: false }, 502);
  }
}
