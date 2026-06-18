import type { Metadata, Viewport } from "next";
import { Sora, Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ContactModal from "@/components/ContactModal";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
};

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
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
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ernestodorantes.com";

const description =
  "Portafolio de Ernesto Dorantes, Director Creativo con más de 7 años de experiencia en campañas 360°, dirección de arte, UI/UX e IA aplicada al diseño.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ernesto Dorantes — Director Creativo",
    template: "%s · Ernesto Dorantes",
  },
  description,
  keywords: [
    "Ernesto Dorantes",
    "director creativo",
    "dirección de arte",
    "publicidad",
    "campañas 360",
    "branding",
    "UI/UX",
    "IA aplicada al diseño",
    "portafolio",
    "México",
  ],
  authors: [{ name: "Ernesto Dorantes" }],
  creator: "Ernesto Dorantes",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Ernesto Dorantes",
    title: "Ernesto Dorantes — Director Creativo",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ernesto Dorantes — Director Creativo",
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
    <html lang="es" className={`${sora.variable} ${inter.variable} ${fraunces.variable}`}>
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
              "@type": "Person",
              name: "Ernesto Dorantes",
              jobTitle: "Director Creativo",
              url: siteUrl,
              email: "hello@ernestodorantes.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Toluca de Lerdo",
                addressRegion: "Estado de México",
                addressCountry: "MX",
              },
              sameAs: ["https://linkedin.com/in/ernestodorantes2493"],
              knowsAbout: [
                "Dirección de arte",
                "Branding",
                "Campañas 360°",
                "UI/UX",
                "IA aplicada al diseño",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
