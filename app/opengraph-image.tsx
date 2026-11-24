import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagen que aparece al compartir el enlace (WhatsApp, Facebook, X).
// Misma identidad del home: noche, hueso y lima.
export const alt =
  "Ernesto Dorantes — Diseño web y contenido para negocios que venden por citas y mensajes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NOCHE = "#0b0c0e";
const HUESO = "#f2f2ec";
const LIMA = "#c6ff2e";
const GRIS = "#a4a6ad";

export default async function Image() {
  const logo = `data:image/png;base64,${(
    await readFile(join(process.cwd(), "public/assets/ed-logo.png"))
  ).toString("base64")}`;
  const [tight, inter] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter-tight@5.1.0/files/inter-tight-latin-700-normal.woff"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.1.0/files/inter-latin-600-normal.woff"
    ).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: NOCHE,
          padding: "64px 72px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={54} height={64} alt="" />
          <div
            style={{
              display: "flex",
              marginLeft: 18,
              fontFamily: "Inter Tight",
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: -1,
              color: HUESO,
            }}
          >
            Ernesto Dorantes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Inter Tight",
            fontWeight: 700,
            fontSize: 88,
            lineHeight: 0.96,
            letterSpacing: -4,
          }}
        >
          <div style={{ display: "flex", color: HUESO }}>Tu sitio y tus redes</div>
          <div style={{ display: "flex", color: HUESO }}>deberían traerte clientes,</div>
          <div style={{ display: "flex", color: LIMA }}>no solo verse bien.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid rgba(242,242,236,0.22)",
            paddingTop: 26,
            fontSize: 28,
            color: GRIS,
          }}
        >
          <div style={{ display: "flex" }}>Sitios web, tiendas en línea y contenido para redes</div>
          <div style={{ display: "flex", color: HUESO }}>Atiendo todo México</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: tight, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 600, style: "normal" },
      ],
    }
  );
}
