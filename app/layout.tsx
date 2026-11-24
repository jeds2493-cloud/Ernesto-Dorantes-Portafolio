import type { Metadata, Viewport } from "next";
import { Sora, Inter, Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ContactModal from "@/components/ContactModal";
import { PRECIOS } from "@/lib/estudio";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
};

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const description =
  "Diseño web y contenido para redes para negocios que venden por citas y mensajes: consultorios, inmobiliarias, despachos y marcas locales. Atiendo todo México.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ernesto Dorantes — Diseño web y contenido",
    template: "%s · Ernesto Dorantes",
  },
  description,
  keywords: [
    "diseño web",
    "diseño de páginas web",
    "landing page",
    "contenido para redes sociales",
    "diseño web para consultorios",
    "diseño web para dentistas",
    "marketing para inmobiliarias",
    "tienda en línea",
    "Ernesto Dorantes",
    "México",
  ],
  authors: [{ name: "Ernesto Dorantes" }],
  creator: "Ernesto Dorantes",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Ernesto Dorantes",
    title: "Ernesto Dorantes — Diseño web y contenido",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ernesto Dorantes — Diseño web y contenido",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${sora.variable} ${inter.variable} ${fraunces.variable} ${interTight.variable} ${mono.variable}`}>
      <body>
        <a href="#top" className="skip-link">
          Saltar al contenido
        </a>
        {children}
        <ContactModal />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": `${siteUrl}/#estudio`,
              name: "Ernesto Dorantes",
              slogan: "Diseño web y contenido para redes",
              description,
              url: siteUrl,
              logo: `${siteUrl}/icon.png`,
              image: `${siteUrl}/opengraph-image`,
              priceRange: `Desde $${PRECIOS.contenido.toLocaleString("en-US")} MXN`,
              email: "hello@ernestodorantes.com",
              address: { "@type": "PostalAddress", addressCountry: "MX" },
              areaServed: { "@type": "Country", name: "México" },
              founder: {
                "@type": "Person",
                name: "Ernesto Dorantes",
                jobTitle: "Creative Partner · diseñador web y director de arte",
                sameAs: ["https://linkedin.com/in/ernestodorantes2493"],
              },
              sameAs: ["https://linkedin.com/in/ernestodorantes2493"],
              knowsAbout: [
                "Diseño web",
                "Landing pages",
                "Contenido para redes sociales",
                "SEO local",
                "Publicidad en Meta y Google",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
