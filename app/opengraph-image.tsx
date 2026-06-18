import { ImageResponse } from "next/og";

export const alt = "Ernesto Dorantes — Director Creativo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [fraunces, inter] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/fraunces/files/fraunces-latin-900-normal.woff"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-600-normal.woff"
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
          justifyContent: "center",
          backgroundColor: "#0a0a0c",
          padding: "0 90px",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -40,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,92,26,0.45), rgba(255,92,26,0) 62%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", width: 52, height: 4, backgroundColor: "#ff5c1a", marginBottom: 20 }} />
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 7,
            color: "#ff7a42",
            fontWeight: 600,
          }}
        >
          PORTAFOLIO 2026
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Fraunces",
            fontWeight: 900,
            lineHeight: 0.9,
            marginTop: 14,
          }}
        >
          <div style={{ display: "flex", fontSize: 140, color: "#f5f4f2" }}>
            Ernesto
          </div>
          <div style={{ display: "flex", fontSize: 140, color: "#ff5c1a" }}>
            Dorantes
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#9a9a9f",
            marginTop: 34,
          }}
        >
          Director Creativo · Dirección de arte · IA aplicada al diseño
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 900, style: "normal" },
        { name: "Inter", data: inter, weight: 600, style: "normal" },
      ],
    }
  );
}
