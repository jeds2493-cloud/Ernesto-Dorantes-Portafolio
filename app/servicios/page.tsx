import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import LavaBg from "@/components/LavaBg";
import AgendaButton from "@/components/AgendaButton";

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

type Service = {
  n: string;
  title: string;
  tagline: string;
  desc: string[];
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
    desc: [
      "Una marca fuerte no es solo un logotipo. Es un sistema visual y estratégico capaz de generar confianza, diferenciación y reconocimiento en cada punto de contacto.",
      "Trabajo con empresas que buscan lanzar una nueva marca o evolucionar su identidad para competir en mercados cada vez más exigentes.",
    ],
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
      "Startups, empresas en crecimiento y organizaciones que necesitan fortalecer su presencia de marca.",
  },
  {
    n: "02",
    title: "Campañas y Dirección de Arte",
    tagline: "Una idea poderosa. Todos los puntos de contacto.",
    desc: [
      "Desarrollo conceptos creativos que viven de forma consistente a través de campañas digitales, contenido audiovisual, redes sociales, pauta y medios exteriores.",
      "Cada campaña nace de una idea estratégica diseñada para captar atención, generar recordación y construir valor para el negocio.",
    ],
    includes: [
      "Concepto creativo",
      "Dirección de arte",
      "Campañas 360°",
      "Key Visual",
      "Storytelling",
      "Producción de contenido",
      "Motion Graphics",
      "Creatividades para pauta digital",
      "Producción acelerada con IA",
    ],
    idealFor:
      "Marcas que buscan lanzar productos, posicionarse en el mercado o generar resultados mediante campañas creativas.",
  },
  {
    n: "03",
    title: "Diseño de Producto y Experiencias Digitales",
    tagline: "Experiencias digitales que convierten",
    desc: [
      "Diseño sitios web, landing pages e interfaces digitales enfocadas en mejorar la experiencia de usuario y aumentar conversiones.",
      "Combino estrategia, UX, UI y pensamiento de producto para crear experiencias funcionales, intuitivas y alineadas con objetivos de negocio.",
    ],
    includes: [
      "UX Audit",
      "Arquitectura de información",
      "Wireframes",
      "Diseño UI",
      "Landing Pages",
      "Sitios web",
      "Sistemas de diseño",
      "Optimización de conversión",
    ],
    idealFor:
      "Empresas que dependen de canales digitales para generar leads, ventas o crecimiento.",
  },
  {
    n: "04",
    title: "Creative Partner",
    tagline: "Tu director creativo externo",
    desc: [
      "Acompañamiento continuo sin construir un departamento creativo interno. Me integro como socio estratégico: visión, dirección y ejecución en múltiples disciplinas.",
    ],
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-ed.png" alt="" className="brand-logo" />
          Ernesto Dorantes
        </Link>
        <Link href="/" className="svc-back">
          ← Portafolio
        </Link>
        <AgendaButton className="svc-nav-cta">Agenda una sesión</AgendaButton>
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
                  {s.desc.map((d, i) => (
                    <p className="svc-desc" key={i}>
                      {d}
                    </p>
                  ))}
                </div>
                <div className="svc-price">
                  <span className="svc-price-v">A medida</span>
                  <span className="svc-price-l">Cotización personalizada</span>
                </div>
                <AgendaButton className="svc-cta">Agenda una sesión</AgendaButton>
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
            <AgendaButton className="primary">
              Agenda una sesión estratégica
            </AgendaButton>
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
