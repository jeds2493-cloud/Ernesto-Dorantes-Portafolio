import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import LavaBg from "@/components/LavaBg";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ernestodorantes.com";

export const metadata: Metadata = {
  title: "Servicios creativos",
  description:
    "Branding, dirección de arte, performance creative, producto digital, producción con IA y creative partner. Soluciones creativas para marcas que quieren crecer.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios creativos · Ernesto Dorantes",
    description:
      "Soluciones creativas para marcas que quieren crecer: branding, campañas, performance, producto digital e IA.",
    url: `${siteUrl}/servicios`,
  },
};

const MAIL = "jeds2493@gmail.com";
const mailto = (servicio: string) =>
  `mailto:${MAIL}?subject=${encodeURIComponent(
    "Sesión estratégica — " + servicio
  )}&body=${encodeURIComponent(
    `Hola Ernesto, me interesa el servicio de ${servicio}. Me gustaría agendar una sesión estratégica para platicar sobre mi proyecto.`
  )}`;

type Service = {
  n: string;
  title: string;
  tagline: string;
  desc: string;
  includes: string[];
  idealFor: string;
  featured?: boolean;
  badge?: string;
};

const services: Service[] = [
  {
    n: "01",
    title: "Branding e Identidad de Marca",
    tagline: "Construye una marca imposible de ignorar",
    desc: "Una marca fuerte no es solo un logotipo: es un sistema coherente que transmite confianza, personalidad y valor en cada punto de contacto.",
    includes: [
      "Estrategia de marca",
      "Posicionamiento",
      "Identidad visual",
      "Diseño de logotipo",
      "Sistema gráfico",
      "Paleta de color y tipografía",
      "Manual de marca",
      "Aplicaciones digitales e impresas",
    ],
    idealFor:
      "Startups, empresas en crecimiento y organizaciones que necesitan fortalecer su percepción de marca.",
  },
  {
    n: "02",
    title: "Dirección de Arte para Campañas",
    tagline: "Una idea poderosa. Todos los puntos de contacto.",
    desc: "Conceptos creativos capaces de vivir de forma consistente a través de campañas digitales, contenido audiovisual, medios exteriores, redes y experiencias de marca.",
    includes: [
      "Concepto creativo",
      "Dirección de arte",
      "Key Visual",
      "Storytelling",
      "Campañas 360°",
      "Desarrollo de mensajes",
      "Adaptaciones multiformato",
      "Supervisión creativa",
    ],
    idealFor:
      "Lanzamientos de producto, campañas de posicionamiento, promociones y comunicación de marca.",
  },
  {
    n: "03",
    title: "Performance Creative",
    tagline: "Creatividades diseñadas para convertir",
    desc: "Anuncios y contenidos optimizados para plataformas digitales, combinando estrategia, análisis y creatividad para mejorar el rendimiento de las campañas.",
    includes: [
      "Creativos para Meta Ads",
      "Creativos para Google Ads",
      "Creativos para TikTok Ads",
      "Motion Graphics",
      "Conceptos UGC",
      "Testing creativo",
      "Adaptaciones para pauta digital",
    ],
    idealFor:
      "Empresas que buscan mejorar sus resultados en adquisición, generación de leads o ventas.",
  },
  {
    n: "04",
    title: "Diseño de Producto Digital",
    tagline: "Experiencias digitales que convierten",
    desc: "Interfaces y experiencias digitales enfocadas en facilitar decisiones, mejorar la experiencia del usuario y aumentar conversiones. De una landing a un sistema completo.",
    includes: [
      "UX Audit",
      "Investigación y análisis",
      "Arquitectura de información",
      "Wireframes",
      "Diseño UI",
      "Sistemas de diseño",
      "Landing Pages",
      "Optimización de conversión",
    ],
    idealFor:
      "SaaS, fintech, proptech, ecommerce y empresas que dependen de canales digitales.",
  },
  {
    n: "05",
    title: "Producción Creativa Acelerada con IA",
    tagline: "Más exploración. Menos desperdicio.",
    desc: "Integro IA dentro del proceso creativo para acelerar la producción, ampliar la exploración de ideas y reducir tiempos sin sacrificar calidad. Potencia estrategia y creatividad.",
    includes: [
      "Generación de imágenes",
      "Producción de video con IA",
      "Motion Graphics asistidos por IA",
      "Voice Over con IA",
      "Concept development",
      "Prototipado rápido",
      "Automatización creativa",
    ],
    idealFor:
      "Marcas que necesitan producir más contenido, validar ideas más rápido y optimizar presupuestos.",
  },
  {
    n: "06",
    title: "Creative Partner",
    tagline: "Tu director creativo externo",
    desc: "Acompañamiento continuo sin construir un departamento creativo interno. Me integro como socio estratégico: visión, dirección y ejecución en múltiples disciplinas.",
    includes: [
      "Director Creativo Externo",
      "Director de Arte",
      "Diseñador Senior",
      "Consultor de Marca",
      "Apoyo a equipos de marketing",
      "Apoyo a equipos de producto",
    ],
    idealFor:
      "Empresas que requieren soporte creativo constante, liderazgo visual y acompañamiento estratégico.",
    featured: true,
    badge: "Acompañamiento continuo",
  },
];

const proceso = [
  {
    n: "01",
    title: "Descubrir",
    desc: "Analizamos el negocio, la audiencia, el mercado y los objetivos para identificar oportunidades de crecimiento.",
  },
  {
    n: "02",
    title: "Definir",
    desc: "Construimos una estrategia clara que alinea creatividad y objetivos comerciales.",
  },
  {
    n: "03",
    title: "Diseñar",
    desc: "Desarrollo conceptos, sistemas visuales, campañas y experiencias digitales con enfoque estratégico.",
  },
  {
    n: "04",
    title: "Optimizar",
    desc: "Iteramos con datos, retroalimentación y aprendizaje continuo para maximizar resultados.",
  },
];

const faqs = [
  {
    q: "¿Trabajas con clientes internacionales?",
    a: "Sí. He colaborado de forma remota con equipos multidisciplinarios y proyectos en distintos mercados, adaptando procesos y entregables según las necesidades de cada cliente.",
  },
  {
    q: "¿Ofreces paquetes o proyectos personalizados?",
    a: "Sí. Cada proyecto tiene objetivos, alcances y desafíos distintos, por eso las propuestas se construyen a medida para garantizar que la solución responda a las necesidades reales del negocio.",
  },
  {
    q: "¿Puedes integrarte a equipos internos?",
    a: "Sí. Puedo colaborar directamente con equipos de marketing, producto, desarrollo, ventas o liderazgo ejecutivo, funcionando como una extensión del equipo existente.",
  },
  {
    q: "¿Utilizas inteligencia artificial en tus proyectos?",
    a: "Sí, para acelerar procesos de exploración, producción y prototipado. La estrategia, la dirección creativa y la toma de decisiones siguen guiadas por criterio humano.",
  },
  {
    q: "¿Cuánto dura un proyecto?",
    a: "Depende del alcance. Algunos proyectos se completan en pocas semanas; iniciativas de branding, campañas o producto digital pueden desarrollarse durante varios meses.",
  },
  {
    q: "¿Trabajas por proyecto o por iguala mensual?",
    a: "Ambos modelos son posibles. Según las necesidades del cliente, colaboro mediante proyectos específicos o como Creative Partner bajo un esquema de acompañamiento continuo.",
  },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Servicios() {
  return (
    <main className="svc">
      <header className="svc-nav">
        <Link href="/" className="brand">
          Ernesto Dorantes
        </Link>
        <Link href="/" className="svc-back">
          ← Portafolio
        </Link>
        <a className="svc-nav-cta" href={mailto("Sesión estratégica")}>
          Agenda una sesión
        </a>
      </header>

      <section className="svc-hero">
        <LavaBg />
        <div className="wrap">
          <div className="eyebrow">Servicios creativos</div>
          <h1>
            Soluciones creativas para marcas que{" "}
            <span className="o">quieren crecer</span>.
          </h1>
          <p className="svc-hero-sub">
            Ayudo a empresas, startups y equipos de marketing a construir marcas
            más sólidas, lanzar campañas más efectivas y crear experiencias
            digitales que generen <b>resultados reales</b> — combinando dirección
            de arte, diseño estratégico, performance e IA.
          </p>
        </div>
      </section>

      <section className="svc-grid-sec">
        <div className="wrap">
          <div className="svc-grid">
            {services.map((s) => (
              <article
                key={s.n}
                className={`svc-card${s.featured ? " featured" : ""}`}
              >
                {s.badge && <span className="svc-badge">{s.badge}</span>}
                <div className="svc-card-head">
                  <span className="svc-n">{s.n}</span>
                  <h2>{s.title}</h2>
                  <p className="svc-tag">{s.tagline}</p>
                  <p className="svc-desc">{s.desc}</p>
                </div>
                <div className="svc-price">
                  <span className="svc-price-v">A medida</span>
                  <span className="svc-price-l">Cotización personalizada</span>
                </div>
                <a className="svc-cta" href={mailto(s.title)}>
                  Agenda una sesión
                </a>
                <ul className="svc-includes">
                  {s.includes.map((it) => (
                    <li key={it}>
                      <span className="svc-check">
                        <Check />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="svc-ideal">
                  <b>Ideal para.</b> {s.idealFor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-proceso">
        <div className="wrap">
          <div className="eyebrow">Mi proceso</div>
          <h2 className="svc-h2">
            De la idea al <span className="o">resultado</span>.
          </h2>
          <div className="svc-proceso-grid">
            {proceso.map((p) => (
              <div className="svc-step" key={p.n}>
                <span className="svc-step-n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-faq-sec">
        <div className="wrap">
          <div className="eyebrow">Preguntas frecuentes</div>
          <h2 className="svc-h2">Antes de empezar.</h2>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="svc-final" id="hablemos">
        <div className="rings" aria-hidden="true" />
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <h2>
            Hablemos<span className="o">.</span>
          </h2>
          <p className="svc-final-sub">
            ¿Necesitas un director creativo, un diseñador estratégico o un socio
            creativo para impulsar tu marca? Construyamos una solución a la
            medida de tus objetivos.
          </p>
          <div className="svc-final-cta">
            <a className="primary" href={mailto("Sesión estratégica")}>
              Agenda una sesión estratégica
            </a>
            <Link href="/">Ver portafolio ↗</Link>
          </div>
          <p className="foot">
            Ernesto Dorantes · Director Creativo
            <span className="loc">Toluca de Lerdo, México</span>
          </p>
        </div>
      </section>
    </main>
  );
}
