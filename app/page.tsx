import { Suspense, type CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { AgendaCta, CTA_LABEL, WhatsCta, WaIcon } from "@/components/estudio/Cta";
import { Count, MagnetWrap } from "@/components/estudio/Motion";
import { CopyMail, LiveStatus, StickyCta } from "@/components/estudio/Bits";
import EsNav from "@/components/estudio/Nav";
import { InView } from "@/components/estudio/Fx";
import Dots from "@/components/estudio/Dots";
import { Ptr } from "@/components/estudio/Ptr";
import SiteFix from "@/components/estudio/SiteFix";
import Builder from "@/components/estudio/Builder";
import { FixScene, type FixId } from "@/components/estudio/Scenes";
import Smooth from "@/components/estudio/Smooth";
import { AGENDA_URL, CASO, CUPOS, MAIL, PRECIOS, waLink } from "@/lib/estudio";
import "./estudio.css";
import "./estudio-demo.css";
import "./estudio-fx.css";

const DESC =
  "Páginas web, tiendas en línea y contenido para redes con estrategia y datos, para que más gente te escriba, agende o compre. Trato directo, en todo México.";
const TITULO = "Diseño web y contenido para redes · Ernesto Dorantes";

export const metadata: Metadata = {
  title: { absolute: "Diseño web y contenido para redes en México · Ernesto Dorantes" },
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: TITULO, description: DESC },
  twitter: { card: "summary_large_image", title: TITULO, description: DESC },
};

const navItems = [
  { label: "Resultados", href: "#resultados" },
  { label: "Servicios", href: "#servicios" },
  { label: "Quién soy", href: "#quien" },
  { label: "Preguntas", href: "#preguntas" },
];

const niches = ["consultorios", "dentistas", "inmobiliarias", "despachos", "marcas locales"];

// Cada problema va junto al oficio que lo arregla (los cuatro punteros del inicio).
const fixes: { id: FixId; problem: string; tag: string; fix: string; fd: string }[] = [
  {
    id: "arte",
    problem: "Tu web se ve vieja o no carga en celular",
    tag: "Dirección de arte",
    fix: "Que se vea serio",
    fd: "Ordeno la página: jerarquía, tipografía y fotos para que tu negocio dé confianza desde el primer segundo.",
  },
  {
    id: "copy",
    problem: "Publicas en redes pero nadie te escribe",
    tag: "Creativo",
    fix: "Que se entienda",
    fd: "Reescribo los textos: qué haces, para quién y qué sigue. Sin frases de relleno.",
  },
  {
    id: "seo",
    problem: "Te buscan en Google y aparece otro",
    tag: "SEO",
    fix: "Que te encuentren",
    fd: "Armo la estructura del sitio y tu ficha de Google para que aparezcas cuando alguien busca lo que vendes.",
  },
  {
    id: "datos",
    problem: "Pagas anuncios y no sabes qué funciona",
    tag: "Datos",
    fix: "Que se pueda medir",
    fd: "Conecto la medición de clics, mensajes y anuncios para saber qué sí te trae clientes y qué hay que apagar.",
  },
];

const mxn = (n: number) => n.toLocaleString("en-US");

type Pack = {
  name: string;
  tipo: string;
  cta: string;
  /** Sin precio = se cotiza con el cliente. */
  price?: string;
  unit: string;
  pitch: string;
  badge?: string;
  items: string[];
  pago: string;
  featured?: boolean;
};

const packages: Pack[] = [
  {
    name: "Landing que convierte",
    tipo: "Landing page",
    cta: "Cotizar landing",
    price: mxn(PRECIOS.landing),
    unit: "MXN",
    pitch: "Una página enfocada en una sola acción: que te escriban o agenden.",
    items: [
      "Estructura y textos pensados para convertir",
      "Diseño adaptado a celular",
      "Botón de WhatsApp y formulario",
      "Medición de clics y mensajes",
    ],
    pago: "50% al iniciar, 50% al entregar",
  },
  {
    name: "Sitio web completo",
    tipo: "Sitio web completo",
    cta: "Cotizar sitio",
    price: mxn(PRECIOS.sitio),
    unit: "MXN",
    pitch: "Tu negocio completo en línea, listo para que te encuentren en Google.",
    badge: "El más completo",
    items: [
      "Todo lo de la landing",
      "5 a 7 secciones",
      "SEO para aparecer cuando te buscan",
      "WhatsApp y formularios conectados",
    ],
    pago: "50% al iniciar, 50% al entregar",
    featured: true,
  },
  {
    name: "Tienda en línea",
    tipo: "Tienda en línea",
    cta: "Cotizar tienda",
    unit: "según tu catálogo",
    pitch: "Vende en línea con la plataforma que sí le queda a tu negocio.",
    items: [
      "Elegimos juntos la plataforma correcta",
      "Catálogo, carrito y pagos en línea",
      "Diseño adaptado a celular",
      "Medición de visitas y ventas",
    ],
    pago: "Se define en la propuesta",
  },
  {
    name: "Contenido mensual para redes",
    tipo: "Contenido mensual para redes",
    cta: "Cotizar contenido",
    price: mxn(PRECIOS.contenido),
    unit: "MXN / mes",
    pitch: "Redes constantes, con estrategia y un diseño que se reconoce.",
    items: [
      "12 publicaciones al mes",
      "Calendario de contenido",
      "Diseño de cada pieza",
      "Revisión mensual de resultados",
    ],
    pago: "Mes a mes",
  },
];

// Solo testimonios reales, con permiso del cliente. Vacío = la sección no se muestra.
const testimonials: { quote: string; name: string; role: string }[] = [];

const faqs = [
  {
    q: "¿Cuánto cuesta y cómo se paga?",
    a: `Los precios de arriba son puntos de partida: una landing desde $${mxn(PRECIOS.landing)}, un sitio completo desde $${mxn(PRECIOS.sitio)} y el contenido para redes desde $${mxn(PRECIOS.contenido)} al mes. El precio final depende del alcance y te lo doy cerrado, por escrito, antes de empezar. Los proyectos web se pagan 50% al iniciar y 50% al entregar; el contenido, mes a mes.`,
  },
  {
    q: "¿Cuánto tarda mi proyecto?",
    a: "Depende del tamaño del proyecto y de qué tan pronto tengamos tus fotos, tus datos y tus accesos. Por eso no doy un plazo genérico: en la propuesta te pongo una fecha de entrega concreta y las etapas para llegar a ella.",
  },
  {
    q: "¿Qué necesito tener listo para empezar?",
    a: "Tu logo, fotos de tu negocio si las tienes y tus datos de contacto. Si te faltan fotos o textos, no pasa nada: la estructura, los textos y el diseño los preparo yo; tú revisas y apruebas.",
  },
  {
    q: "Ya tengo sitio o redes. ¿Hay que empezar de cero?",
    a: "No siempre. Primero reviso lo que ya tienes: a veces basta con reordenar, reescribir y conectar bien el WhatsApp y la medición. Si conviene rehacerlo, te explico por qué antes de cotizar.",
  },
  {
    q: "¿El sitio y el dominio quedan a mi nombre?",
    a: "Sí. El dominio y el hosting se contratan a tu nombre, para que siempre sean tuyos. Te ayudo a elegirlos y a configurarlos; su costo anual va aparte del diseño.",
  },
  {
    q: "¿Haces tiendas en línea?",
    a: "Sí. Antes de cotizar revisamos tu catálogo, cómo cobras y cómo entregas, y con eso elegimos la plataforma que te conviene. No todas las tiendas necesitan lo mismo; por eso la tienda se cotiza aparte.",
  },
  {
    q: "¿Trabajas con negocios de cualquier parte de México?",
    a: "Sí. Trabajo con negocios de todo México por videollamada y WhatsApp. No hace falta vernos en persona para que el proyecto avance.",
  },
  {
    q: "¿Me garantizas que voy a vender más?",
    a: "No, y desconfía de quien te lo prometa: las ventas también dependen de tu oferta, tus precios y tu atención. Lo que sí hago es dejar todo medido (cuántas personas llegan, cuántas te escriben y de dónde vienen) para ajustar con datos y no con corazonadas.",
  },
];

// Titular que entra palabra por palabra solo con CSS: se lee aunque el JS tarde.
function Words({ text, from = 0 }: { text: string; from?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="es-w" style={{ "--i": from + i } as CSSProperties}>
            {w}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

// Titular de sección: cada palabra sube desde su propia máscara al entrar
// con el scroll (solo CSS; sin soporte, el texto se ve normal).
function Rise({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="es-rw">
            <span style={{ "--i": i } as CSSProperties}>{w}</span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

// En celular cada renglón del titular es fijo: así no cambia de alto cuando
// la fuente web sustituye a la de respaldo (evita el salto de diseño al cargar).
const H1_LINES = ["Tu sitio y tus", "redes deberían", "traerte clientes,"];
const H1_PUNCH = "no solo verse bien.";
const wordsBefore = (n: number) =>
  H1_LINES.slice(0, n).reduce((a, l) => a + l.split(" ").length, 0);

// Disponibilidad: sin número salvo que haya uno real en lib/estudio.ts.
const AVAILABILITY =
  CUPOS !== null ? (
    <>
      Quedan {CUPOS} {CUPOS === 1 ? "lugar" : "lugares"} este mes
    </>
  ) : (
    <>Pocos proyectos este mes</>
  );

export default function Home() {
  const wa = waLink();

  return (
    <div className="es">
      <Smooth />
      {/* Preguntas frecuentes como datos estructurados (las mismas que se ven abajo) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <header className="es-header">
        <div className="es-wrap es-header-in">
          <a href="#top" className="es-brand">
            <Image
              src="/assets/ed-logo.png"
              alt=""
              width={269}
              height={320}
              sizes="32px"
              className="es-brand-logo"
              priority
            />
            <span className="es-brand-name">Ernesto Dorantes</span>
            <span className="es-sr">, ir al inicio</span>
          </a>
          <div className="es-header-nav">
            <EsNav items={navItems} />
          </div>
          <AgendaCta className="es-btn es-btn--signal es-btn--sm es-header-cta">
            <span className="es-hide-sm">{CTA_LABEL}</span>
            <span className="es-show-sm">Cotizar</span>
          </AgendaCta>
        </div>
        <span className="es-progress" aria-hidden="true" />
      </header>

      <main id="top" tabIndex={-1}>
        {/* ===== Hero: la promesa + la demostración (sitio viejo → sitio que vende) ===== */}
        <section className="es-hero es-grid">
          <div className="es-wrap es-hero-grid">
            <div className="es-hero-copy">
              <h1 className="es-h1">
                <span className="es-h1-lead">
                  {H1_LINES.map((l, n) => (
                    <span className="es-h1-l" key={l}>
                      <Words text={l} from={wordsBefore(n)} />
                    </span>
                  ))}
                </span>
                <span className="es-h1-punch es-h1-l">
                  <Words text={H1_PUNCH} from={wordsBefore(H1_LINES.length)} />
                </span>
              </h1>
              <p className="es-hero-niche">
                <span className="es-niche-l">Diseño web y contenido para</span>{" "}
                <span className="es-niche-l">negocios que venden por citas</span>{" "}
                <span className="es-niche-l">
                  y mensajes, como{" "}
                  {/* todas las palabras ocupan la misma casilla (la más ancha):
                      cambian sin mover nada del texto */}
                  <span className="es-rot" aria-hidden="true">
                    {niches.map((n, i) => (
                      <span key={n} style={{ "--i": i } as CSSProperties}>
                        {n}.
                      </span>
                    ))}
                  </span>
                  <span className="es-sr">
                    {niches.slice(0, -1).join(", ")} y {niches[niches.length - 1]}.
                  </span>
                </span>
              </p>
              <div className="es-ctas">
                <MagnetWrap>
                  <AgendaCta className="es-btn es-btn--signal es-btn--lg" />
                </MagnetWrap>
                <WhatsCta className="es-btn es-btn--wa es-btn--lg" />
              </div>
              <p className="es-cta-note">Te respondo en menos de 24&nbsp;h, sin compromiso.</p>
              <div className="es-who">
                <Image
                  src="/assets/ernesto-poster.jpg"
                  alt=""
                  width={685}
                  height={1200}
                  sizes="56px"
                  loading="eager"
                  className="es-who-img"
                />
                <p>
                  <b>
                    Trabajas directo conmigo
                    <i className="es-who-sep" aria-hidden="true" />
                    <em lang="en">Creative Partner</em>
                  </b>
                  <span>
                    <span className="es-show-sm"><span lang="en">Creative Partner</span> · </span>
                    <span className="es-hide-sm">Ernesto Dorantes · </span>
                    8+ años<span className="es-hide-sm"> · respuesta en menos de 24&nbsp;h</span>
                  </span>
                  <LiveStatus label={AVAILABILITY} />
                </p>
              </div>
            </div>

            <div className="es-hero-demo">
              <SiteFix />
            </div>
          </div>
        </section>

        {/* ===== Resultados: un caso real, en una banda compacta ===== */}
        <section className="es-results" id="resultados" aria-labelledby="resultados-t">
          <div className="es-wrap es-case">
            <div className="es-case-main">
              <p className="es-results-tag">
                Caso real · {CASO.cliente || CASO.giro}
              </p>
              <h2 className="es-case-t" id="resultados-t">
                <span className="es-bigfig">
                  <Count to={710} />
                </span>
                <span className="es-case-tl">personas pidieron que las contactaran.</span>
              </h2>
            </div>

            <div className="es-case-side">
              {/* El recorrido completo, de anuncio a contacto */}
              <InView className="es-funnel" at={0.35}>
                <ol className="es-funnel-steps">
                  <li>
                    <b>671,966</b>
                    <span>veces se vieron los anuncios en Meta, Google y TikTok</span>
                  </li>
                  <li>
                    <em>1.31% dio clic</em>
                    <b>8,802</b>
                    <span>clics</span>
                  </li>
                  <li>
                    <em>8.07% dejó sus datos</em>
                    <b>710</b>
                    <span>contactos</span>
                  </li>
                </ol>
              </InView>
              <dl className="es-case-facts">
                <div>
                  <dt>$84.50</dt>
                  <dd>pesos por contacto, en promedio</dd>
                </div>
                <div>
                  <dt>Casi 12</dt>
                  <dd>contactos por cada $1,000 en anuncios</dd>
                </div>
              </dl>
              <p className="es-case-note">
                Cada negocio es distinto y no te prometo estas cifras; sí te
                prometo medir las tuyas con la misma claridad.
              </p>
            </div>
          </div>
        </section>

        {/* ===== El problema y quién lo arregla ===== */}
        <section className="es-sec es-problem" aria-labelledby="problema-t">
          <div className="es-wrap">
            <div className="es-split-head">
              <h2 className="es-h2 es-fill" id="problema-t">
              {"¿Tu sitio recibe visitas pero no clientes?".split(" ").map((w, i) => (
                <span key={i}>
                  <span className="es-fw" style={{ "--i": i } as CSSProperties}>
                    {w}
                  </span>{" "}
                </span>
              ))}
              </h2>
              <p>
                Casi siempre falla una de estas cuatro cosas. Las cuatro las
                arreglo yo.
              </p>
            </div>
            <ul className="es-bento" id="es-bento" aria-label="Los cuatro problemas">
              {fixes.map((f, i) => (
                <InView as="li" key={f.id} className={`es-bn sf-c-${f.id}`} at={0.45} wideDelay={(i % 2) * 500} replay>
                  <FixScene id={f.id} />
                  <div className="es-bn-txt">
                    <p className="es-bn-craft">{f.tag}</p>
                    <h3>{f.problem}</h3>
                    <p className="es-bn-fix">
                      <b>{f.fix}.</b> {f.fd}
                    </p>
                  </div>
                </InView>
              ))}
            </ul>
            <Dots target="es-bento" count={fixes.length} label="Problema" />
          </div>
        </section>

        {/* ===== Servicios ===== */}
        <section className="es-sec es-sec--paper" id="servicios" aria-labelledby="servicios-t">
          <div className="es-wrap">
            <div className="es-split-head">
              <h2 className="es-h2 es-rise" id="servicios-t">
                <Rise text="Elige por dónde empezar." />
              </h2>
              <p>
                Precios de referencia en pesos. El alcance y los tiempos los
                definimos juntos en la primera llamada; después te doy una
                cotización cerrada, sin costos escondidos.
              </p>
            </div>
            <Dots
              target="es-packs"
              count={packages.length}
              label="Paquete"
              labels={["Landing", "Sitio", "Tienda", "Contenido"]}
            />
            <div className="es-packs" id="es-packs">
              {packages.map((p, i) => (
                <article
                  className={`es-pack${p.featured ? " es-pack--featured" : ""}`}
                  key={p.name}
                  data-rv={Math.min(i + 1, 4)}
                >
                  <div className="es-pack-body">
                    {p.badge && <span className="es-pack-badge">{p.badge}</span>}
                    <h3>{p.name}</h3>
                    <p className="es-pack-pitch">{p.pitch}</p>
                    <ul>
                      {p.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                    <p className="es-pack-meta">
                      <b>Pago</b>
                      {p.pago}
                    </p>
                  </div>
                  <div className="es-pack-stub">
                    <p className="es-pack-price">
                      {p.price ? (
                        <>
                          <span className="es-pack-from">desde</span>
                          <span className="es-pack-num">${p.price}</span>
                        </>
                      ) : (
                        <>
                          <span className="es-pack-from">a tu medida</span>
                          <span className="es-pack-num es-pack-num--txt">Se cotiza</span>
                        </>
                      )}
                      <span className="es-pack-unit">{p.unit}</span>
                    </p>
                    <AgendaCta
                      tipo={p.tipo}
                      className={`es-btn ${p.featured ? "es-btn--signal" : "es-btn--ink"} es-btn--block`}
                    >
                      {p.cta}
                    </AgendaCta>
                  </div>
                </article>
              ))}
            </div>
            {/* Suspense: estas piezas se hidratan aparte y no frenan la carga */}
            <div data-rv>
              <Suspense>
                <Builder />
              </Suspense>
            </div>
          </div>
        </section>

        {/* ===== Quién está detrás: los cuatro oficios son una sola persona ===== */}
        <section className="es-sec es-sec--alt es-grid es-about" id="quien" aria-labelledby="quien-t">
          <div className="es-wrap es-about-grid">
            {/* Aquí irá el avatar 3D; mientras, la foto de estudio. */}
            <InView as="figure" className="es-about-photo" at={0.5}>
              <Image
                src="/assets/ernesto-poster.jpg"
                alt="Ernesto Dorantes, diseñador web y director de arte"
                width={685}
                height={1200}
                sizes="(max-width: 900px) 92vw, 440px"
              />
              <figcaption className="es-sr">
                Dirección de arte, creativo, SEO y datos: los cuatro oficios los hace Ernesto.
              </figcaption>
              <div className="fu" aria-hidden="true">
                <Ptr c="arte" className="fu-c fu-c--1" />
                <Ptr c="copy" className="fu-c fu-c--2" flip />
                <Ptr c="seo" className="fu-c fu-c--3" />
                <Ptr c="datos" className="fu-c fu-c--4" flip />
                <span className="fu-ring" />
                <Ptr c="yo" label="Ernesto · los cuatro oficios" className="fu-yo" />
              </div>
            </InView>
            <div className="es-about-copy">
              <h2 className="es-h2" id="quien-t">
                Detrás de todo esto hay <mark className="es-hl">una sola persona.</mark>
              </h2>
              <p className="es-about-lead">
                Soy Ernesto Dorantes. Diseño, escribo y mido cada proyecto yo
                mismo, para negocios de todo México. Sin juniors, sin
                intermediarios y sin que tu proyecto pase de mano en mano.
              </p>
              <dl className="es-about-facts">
                <div>
                  <dt>8+ años</dt>
                  <dd>en diseño y campañas</dd>
                </div>
                <div>
                  <dt>1 persona</dt>
                  <dd>de la primera llamada a la entrega</dd>
                </div>
                <div>
                  <dt>24 h</dt>
                  <dd>como máximo para responderte</dd>
                </div>
              </dl>
              <div className="es-ctas">
                <AgendaCta className="es-btn es-btn--signal es-btn--lg" />
                <a
                  className="es-btn es-btn--ghost es-btn--lg"
                  href="https://linkedin.com/in/ernestodorantes2493"
                  target="_blank"
                  rel="noopener"
                >
                  Ver mi LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Testimonios (solo si hay reales) ===== */}
        {testimonials.length > 0 && (
          <section className="es-sec es-sec--paper" aria-labelledby="testimonios-t">
            <div className="es-wrap">
              <h2 className="es-h2" id="testimonios-t">Lo que dicen mis clientes.</h2>
              <div className="es-quotes">
                {testimonials.map((t) => (
                  <figure className="es-quote" key={t.name}>
                    <blockquote>“{t.quote}”</blockquote>
                    <figcaption>
                      <b>{t.name}</b> · {t.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== FAQ ===== */}
        <section className="es-sec" id="preguntas" aria-labelledby="preguntas-t">
          <div className="es-wrap es-faq-grid">
            <div className="es-faq-head">
              <h2 className="es-h2 es-rise" id="preguntas-t">
                <Rise text="Lo que más me preguntan." />
              </h2>
              <p>¿Tu duda no está aquí? Pregúntame directo, sin compromiso.</p>
              <WhatsCta className="es-btn es-btn--ghost" />
            </div>
            <div className="es-faq">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    {f.q}
                    <span className="es-faq-ic" aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Cierre: el formulario a la vista ===== */}
        <section className="es-final" id="contacto" aria-labelledby="final-t">
          <div className="es-wrap es-final-grid">
            <div className="es-final-copy">
              <h2 className="es-final-t es-rise" id="final-t">
                <Rise text="Platiquemos de tu proyecto." />
              </h2>
              <p className="es-final-sub">
                En 20 minutos te digo qué está frenando tu sitio o tus redes, sin
                compromiso.
              </p>
              <ol className="es-next">
                <li>
                  <b>Hoy</b>
                  <span>Me dejas tus datos. Te respondo en menos de 24&nbsp;h.</span>
                </li>
                <li>
                  <b>Esta semana</b>
                  <span>Platicamos 20 minutos por videollamada o WhatsApp.</span>
                </li>
                <li>
                  <b>Después</b>
                  <span>Recibes una propuesta por escrito, con precio cerrado.</span>
                </li>
              </ol>
              <div className="es-ctas">
                {AGENDA_URL && <AgendaCta className="es-btn es-btn--night es-btn--lg" />}
                <WhatsCta className="es-btn es-btn--night es-btn--lg" />
              </div>
            </div>
            <div className="es-form-card">
              <Ptr c="yo" label="Ernesto · te respondo yo" className="es-form-cur" flip />
              <h3>Cuéntame de tu proyecto</h3>
              <p>
                Déjame tu WhatsApp y te propongo una llamada de 20 minutos.
              </p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="es-footer">
        <div className="es-wrap">
          <div className="es-footer-top">
            <div className="es-footer-brand">
              <b>Ernesto Dorantes</b>
              <p>
                Diseño web y contenido para negocios que venden por citas y
                mensajes.
              </p>
            </div>
            <div className="es-footer-col" role="navigation" aria-label="Secciones">
              <b>Secciones</b>
              <ul>
                {navItems.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="es-footer-col">
              <b>Contacto</b>
              <ul>
                <li>
                  <CopyMail mail={MAIL} />
                </li>
                <li>
                  <a href="https://linkedin.com/in/ernestodorantes2493" target="_blank" rel="noopener">
                    LinkedIn ↗
                  </a>
                </li>
                <li className="es-footer-place">
                  Atiendo todo México · respuesta en menos de 24&nbsp;h
                </li>
              </ul>
            </div>
          </div>
          <p className="es-legal">
            Las cifras del caso real provienen de campañas en Meta, Google y
            TikTok{CASO.cliente ? ` de ${CASO.cliente}; la marca es propiedad de su empresa` : ""}.
            La clínica de la demostración del inicio es ficticia.
          </p>
        </div>
      </footer>

      <StickyCta label={CTA_LABEL} wa={wa} />

      {wa && (
        <a className="es-wa-float" href={wa} target="_blank" rel="noopener" aria-label="Escríbeme por WhatsApp">
          <WaIcon />
        </a>
      )}
    </div>
  );
}
