import type { Metadata } from "next";
import Image from "next/image";
import { AgendaCta, WhatsCta, WaIcon } from "@/components/estudio/Cta";
import {
  BenefitTicker,
  Count,
  EsNav,
  HeroTitle,
  MagnetWrap,
  NicheRotator,
  StepStack,
} from "@/components/estudio/Motion";
import { CUPOS, MAIL, waLink } from "@/lib/estudio";
import "./estudio.css";

export const metadata: Metadata = {
  title: {
    absolute:
      "Ernesto Dorantes — Diseño web y contenido para negocios que venden por citas y mensajes",
  },
  description:
    "Diseño páginas web y contenido para redes con estrategia y datos, para que más personas te escriban, agenden o te visiten. Atiendo todo México, trato directo.",
  alternates: { canonical: "/" },
};

const navItems = [
  { label: "Resultados", href: "#resultados" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Preguntas", href: "#preguntas" },
];

const niches = ["consultorios", "dentistas", "inmobiliarias", "despachos", "marcas locales"];

const benefits = [
  "Más mensajes por WhatsApp",
  "Más citas en tu agenda",
  "Te encuentran en tu zona",
  "Se ve bien en cualquier celular",
  "Sabes qué anuncio funciona",
];

const problems = [
  {
    t: "Tu web se ve vieja o no carga en celular",
    d: "La mayoría de tus clientes te busca desde el teléfono. Si la página tarda o se ve rota, se van con el de al lado.",
  },
  {
    t: "Publicas en redes pero nadie te escribe",
    d: "Publicar seguido no basta: cada pieza necesita un mensaje claro y una invitación concreta a escribirte.",
  },
  {
    t: "Pagas anuncios y no sabes qué funciona",
    d: "Sin medición no hay forma de saber qué anuncio trae clientes y cuál solo gasta presupuesto.",
  },
];

type Pack = {
  name: string;
  tipo: string;
  cta: string;
  price: string;
  unit: string;
  pitch: string;
  badge?: string;
  items: string[];
  tone: "paper" | "forest" | "ink";
};

const packages: Pack[] = [
  {
    name: "Landing que convierte",
    tipo: "Landing page",
    cta: "Cotizar landing",
    price: "9,900",
    unit: "MXN",
    pitch: "Una página enfocada en una sola acción: que te escriban o agenden.",
    items: [
      "Estructura y textos pensados para convertir",
      "Diseño adaptado a celular",
      "Botón de WhatsApp y formulario",
      "Medición de clics y mensajes",
    ],
    tone: "paper",
  },
  {
    name: "Sitio web completo",
    tipo: "Sitio web completo",
    cta: "Cotizar sitio",
    price: "24,900",
    unit: "MXN",
    pitch: "Tu negocio completo en línea, listo para que te encuentren en Google.",
    badge: "El más completo",
    items: [
      "Todo lo de la landing",
      "5 a 7 secciones",
      "SEO local para aparecer en tu zona",
      "WhatsApp y formularios conectados",
    ],
    tone: "forest",
  },
  {
    name: "Contenido mensual para redes",
    tipo: "Contenido mensual para redes",
    cta: "Cotizar contenido",
    price: "7,900",
    unit: "MXN / mes",
    pitch: "Redes constantes, con estrategia y un diseño que se reconoce.",
    items: [
      "12 publicaciones al mes",
      "Calendario de contenido",
      "Diseño de cada pieza",
      "Revisión mensual de resultados",
    ],
    tone: "ink",
  },
];

const showcase = [
  { t: "Carga rápido en celular", d: "Imágenes ligeras y código limpio: tu cliente no espera." },
  { t: "WhatsApp a un toque", d: "El botón que tu cliente busca, siempre a la mano." },
  { t: "Formulario corto", d: "Pide lo justo para contactarte, sin formularios eternos." },
  { t: "Medición desde el día uno", d: "Sabes cuántos te escriben y desde dónde llegaron." },
];

const steps = [
  { t: "Diagnóstico", d: "En 20 minutos reviso tu sitio, tus redes y tus anuncios y te digo qué está frenando los mensajes." },
  { t: "Estrategia", d: "Definimos a quién le hablas, qué acción buscamos y cómo la vamos a medir." },
  { t: "Diseño", d: "Diseño y escribo cada pieza. Tú apruebas por etapas, sin sorpresas." },
  { t: "Lanzamiento", d: "Publicamos con WhatsApp, formularios y medición conectados desde el primer día." },
  { t: "Optimización", d: "Revisamos los datos y ajustamos lo que no está trayendo clientes." },
];

// Solo testimonios reales, con permiso del cliente. Vacío = la sección no se muestra.
const testimonials: { quote: string; name: string; role: string }[] = [];

const faqs = [
  {
    q: "¿Cuánto tarda?",
    a: "Una landing, de 2 a 3 semanas. Un sitio completo, de 4 a 6 semanas. Con el contenido mensual, el primer calendario está listo en una semana. Los tiempos corren desde que tengo tus fotos y datos.",
  },
  {
    q: "¿Qué necesito darte?",
    a: "Tu logo, fotos de tu negocio si las tienes, tus datos de contacto y 30 minutos para la llamada de arranque. La estructura, los textos y el diseño los preparo yo; tú revisas y apruebas.",
  },
  {
    q: "¿Incluye hosting y dominio?",
    a: "El dominio y el hosting se contratan a tu nombre, para que siempre sean tuyos. Te ayudo a elegirlos y a configurarlos; su costo anual va aparte del diseño.",
  },
  {
    q: "¿Puedo pagar en partes?",
    a: "Sí. Los proyectos web se pagan 50% al arrancar y 50% al entregar. El contenido mensual se paga mes a mes.",
  },
  {
    q: "¿Trabajas fuera de Toluca?",
    a: "Sí. Trabajo con negocios de todo México por videollamada y WhatsApp. Si estás en Toluca o cerca, también podemos vernos en persona.",
  },
];

export default function Home() {
  const wa = waLink();

  return (
    <div className="es">
      {/* Barra superior */}
      <div className="es-topbar">
        <div className="es-wrap es-topbar-in">
          <span>Atendiendo todo México</span>
          <span className="es-topbar-sep" aria-hidden="true" />
          {CUPOS !== null && (
            <>
              <span>{CUPOS} cupos este mes</span>
              <span className="es-topbar-sep" aria-hidden="true" />
            </>
          )}
          <span>Respuesta en menos de 24 h</span>
        </div>
      </div>

      <header className="es-header">
        <div className="es-wrap es-header-in">
          <a href="#top" className="es-brand" aria-label="Ernesto Dorantes, inicio">
            <span className="es-brand-mark" aria-hidden="true">ED</span>
            <span className="es-brand-name">Ernesto Dorantes</span>
          </a>
          <div className="es-header-nav">
            <EsNav items={navItems} />
          </div>
          <AgendaCta className="es-btn es-btn--signal es-btn--sm es-header-cta">
            <span className="es-hide-sm">Pide tu diagnóstico</span>
            <span className="es-show-sm">Diagnóstico</span>
          </AgendaCta>
        </div>
      </header>

      <main id="top" tabIndex={-1}>
        {/* ===== Hero: la promesa + la prueba (este mismo sitio) ===== */}
        <section className="es-hero">
          <div className="es-wrap es-hero-grid">
            <div className="es-hero-copy">
              <HeroTitle lead="Tu sitio y tus redes deberían traerte clientes," punch="no solo verse bien." />
              <p className="es-hero-niche">
                Diseño web y contenido para <NicheRotator items={niches} /> que venden por citas y mensajes.
              </p>
              <p className="es-lead">
                Diseño páginas web y contenido para redes con estrategia y datos,
                para que más personas te escriban, agenden o te visiten.
              </p>
              <div className="es-ctas">
                <MagnetWrap>
                  <AgendaCta className="es-btn es-btn--signal es-btn--lg" />
                </MagnetWrap>
                <WhatsCta className="es-btn es-btn--ghost es-btn--lg" />
              </div>
              <div className="es-who">
                <Image
                  src="/assets/ernesto-poster.jpg"
                  alt=""
                  width={685}
                  height={1200}
                  sizes="56px"
                  className="es-who-img"
                />
                <p>
                  <b>Trabajas directo conmigo.</b>
                  <span>Ernesto Dorantes · Toluca, Edo. Méx. · 8+ años en diseño y campañas</span>
                </p>
              </div>
            </div>

            <figure className="es-hero-proof">
              <div className="es-phone-frame">
                <div className="es-phone-screen">
                  <Image
                    className="es-phone-shot"
                    src="/assets/estudio/sitio-celular.webp"
                    alt="Este mismo sitio visto en un celular, desplazándose de arriba abajo"
                    width={374}
                    height={2310}
                    sizes="(max-width: 900px) 240px, 300px"
                    priority
                  />
                </div>
              </div>
              <figcaption>
                <b>Este sitio es mi muestra.</b> Diseño, textos y código hechos
                por mí, como el que haría para tu negocio.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ===== Cinta de beneficios ===== */}
        <div className="es-ticker">
          <BenefitTicker items={benefits} />
        </div>

        {/* ===== Resultados: solo cifras reales de CTC, a sangre ===== */}
        <section className="es-results" id="resultados" aria-labelledby="resultados-t">
          <div className="es-wrap">
            <p className="es-results-tag">Caso real · Compramos Tu Casa · inmobiliaria</p>
            <h2 className="es-results-t" id="resultados-t">
              Anuncios y contenido que hicieron que la gente pidiera que la contactaran.
            </h2>
            <dl className="es-big">
              <div>
                <dt className="es-bigfig"><Count to={710} suffix="+" /></dt>
                <dd>personas dejaron sus datos para que las contactaran</dd>
              </div>
              <div>
                <dt className="es-bigfig"><Count to={84.5} decimals={2} prefix="$" /></dt>
                <dd>pesos costó, en promedio, cada una de esas personas</dd>
              </div>
            </dl>
            <dl className="es-small">
              <div><dt>671,966</dt><dd>veces se vieron los anuncios</dd></div>
              <div><dt>8,802</dt><dd>clics</dd></div>
              <div><dt>8.07%</dt><dd>de quienes dieron clic dejaron sus datos</dd></div>
              <div><dt>$6.82</dt><dd>pesos por clic</dd></div>
            </dl>
          </div>
        </section>

        {/* ===== El problema ===== */}
        <section className="es-sec es-problem" aria-labelledby="problema-t">
          <div className="es-wrap">
            <h2 className="es-problem-t" id="problema-t">
              ¿Tu sitio recibe visitas pero no clientes?
            </h2>
            <ol className="es-problems">
              {problems.map((p) => (
                <li key={p.t}>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </li>
              ))}
            </ol>
            <p className="es-bridge">
              No es falta de un diseño bonito. Es falta de un sitio y unas redes
              pensados para que la gente <mark>dé el siguiente paso.</mark>
            </p>
          </div>
        </section>

        {/* ===== Servicios ===== */}
        <section className="es-sec es-sec--white" id="servicios" aria-labelledby="servicios-t">
          <div className="es-wrap">
            <div className="es-split-head">
              <h2 className="es-h2" id="servicios-t">Elige por dónde empezar.</h2>
              <p>
                Precios de referencia en pesos. Después del diagnóstico te doy una
                cotización cerrada, sin costos escondidos.
              </p>
            </div>
            <div className="es-packs">
              {packages.map((p) => (
                <article className={`es-pack es-pack--${p.tone}`} key={p.name}>
                  {p.badge && <span className="es-pack-badge">{p.badge}</span>}
                  <h3>{p.name}</h3>
                  <p className="es-pack-pitch">{p.pitch}</p>
                  <p className="es-pack-price">
                    <span className="es-pack-from">desde</span>
                    <span className="es-pack-num">${p.price}</span>
                    <span className="es-pack-unit">{p.unit}</span>
                  </p>
                  <ul>
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <AgendaCta
                    tipo={p.tipo}
                    className={`es-btn ${p.tone === "paper" ? "es-btn--ink" : "es-btn--signal"} es-btn--block`}
                  >
                    {p.cta}
                  </AgendaCta>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Este sitio es la muestra ===== */}
        <section className="es-sec es-sec--ink es-show" aria-labelledby="muestra-t">
          <div className="es-wrap">
            <h2 className="es-show-t" id="muestra-t">
              Lo que ves aquí es <span>lo que te entrego.</span>
            </h2>
            <ul className="es-show-list">
              {showcase.map((s) => (
                <li key={s.t}>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Proceso (apilado) ===== */}
        <section className="es-sec es-sec--forest" id="proceso" aria-labelledby="proceso-t">
          <div className="es-wrap">
            <div className="es-split-head es-split-head--light">
              <h2 className="es-h2" id="proceso-t">Cinco pasos, un solo responsable.</h2>
              <p>
                Sin juniors ni intermediarios: cada proyecto lo llevo yo de principio
                a fin. Por eso tomo pocos proyectos al mes.
              </p>
            </div>
            <StepStack>
              {steps.map((s, i) => (
                <div className="es-step" key={s.t}>
                  <span className="es-step-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </StepStack>
          </div>
        </section>

        {/* ===== Testimonios (solo si hay reales) ===== */}
        {testimonials.length > 0 && (
          <section className="es-sec es-sec--white" aria-labelledby="testimonios-t">
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
            <h2 className="es-h2" id="preguntas-t">Lo que más me preguntan.</h2>
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

        {/* ===== CTA final ===== */}
        <section className="es-final" aria-labelledby="final-t">
          <div className="es-wrap">
            <h2 className="es-final-t" id="final-t">
              Platiquemos de tu <span>proyecto.</span>
            </h2>
            <div className="es-final-row">
              <p className="es-final-sub">
                En 20 minutos te digo qué está frenando tu sitio o tus redes, sin
                compromiso. Te respondo en menos de 24 h.
              </p>
              <div className="es-ctas">
                <MagnetWrap>
                  <AgendaCta className="es-btn es-btn--signal es-btn--lg" />
                </MagnetWrap>
                <WhatsCta className="es-btn es-btn--ghost-light es-btn--lg" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="es-footer">
        <div className="es-wrap es-footer-in">
          <div>
            <b>Ernesto Dorantes</b>
            <span>Diseño web y contenido · Toluca, Edo. Méx. · Atiendo todo México</span>
          </div>
          <div className="es-footer-links">
            <a href={`mailto:${MAIL}`}>{MAIL}</a>
            <a href="https://linkedin.com/in/ernestodorantes2493" target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
          </div>
          <p className="es-legal">
            Las cifras de Compramos Tu Casa provienen de sus campañas en Meta,
            Google y TikTok. La marca es propiedad de su empresa.
          </p>
        </div>
      </footer>

      {wa && (
        <a className="es-wa-float" href={wa} target="_blank" rel="noopener" aria-label="Escríbeme por WhatsApp">
          <WaIcon />
        </a>
      )}
    </div>
  );
}
