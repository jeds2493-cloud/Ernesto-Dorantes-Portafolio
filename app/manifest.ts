import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ernesto Dorantes · Diseño web y contenido para redes",
    short_name: "Ernesto Dorantes",
    lang: "es-MX",
    start_url: "/",
    display: "browser",
    background_color: "#0b0c0e",
    theme_color: "#0b0c0e",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
