/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // La página vieja de servicios y el CV en PDF se retiraron (24-nov-2026):
  // los enlaces guardados llegan a los paquetes o al inicio.
  async redirects() {
    return [
      { source: "/servicios", destination: "/#servicios", permanent: true },
      { source: "/servicios/:path*", destination: "/#servicios", permanent: true },
      { source: "/Curriculum_Ernesto_Dorantes.pdf", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // Sin script-src/connect-src a propósito: no estorba al fetch a
          // /api/contacto ni al desarrollo local.
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
          },
        ],
      },
      {
        // cachea los assets estáticos (imágenes, video, posters) en el navegador
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
