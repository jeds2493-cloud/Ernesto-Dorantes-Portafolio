"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";

type Step = { name: string; desc: string; ai?: boolean };

const steps: Step[] = [
  { name: "Estrategia", desc: "Objetivo de negocio y audiencia" },
  { name: "Concepto", desc: "Insight e idea rectora" },
  { name: "Diseño", desc: "Dirección de arte y sistema visual" },
  { name: "Motion", desc: "Animación y pieza audiovisual" },
  { name: "IA", desc: "Producción y validación acelerada", ai: true },
  { name: "Optimización", desc: "Iteración y A/B testing" },
];

type Kpi = { label: string; value: string; tip: string };

const proof: Kpi[] = [
  {
    label: "Impresiones",
    value: "671,966",
    tip: "Las veces que los anuncios aparecieron en pantalla: el alcance total de la campaña.",
  },
  {
    label: "Clics",
    value: "8,802",
    tip: "Personas que tocaron un anuncio para conocer más. El primer paso del embudo.",
  },
  {
    label: "Leads",
    value: "710+",
    tip: "El objetivo era generar oportunidades de venta: más de 700 personas dejaron sus datos para ser contactadas.",
  },
  {
    label: "Clic → Lead",
    value: "8.07%",
    tip: "De cada 100 personas que hicieron clic, ~8 dejaron sus datos. Para campañas de generación de leads es una tasa bastante sólida.",
  },
  {
    label: "CPL promedio",
    value: "$84.50",
    tip: "Conseguir un prospecto costó alrededor de $84. Mientras más bajo sea —manteniendo la calidad del lead— mejor rinde la campaña.",
  },
  {
    label: "CPC promedio",
    value: "$6.82",
    tip: "Costo promedio por cada clic: ayuda a medir qué tan eficiente fue la inversión en pauta.",
  },
];

type AdItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
};

const ads: AdItem[] = [
  {
    type: "image",
    src: "/assets/ads/ad-feed.jpg",
    alt: "Anuncio: ¿Quieres vender tu casa? Empieza con un diagnóstico gratis",
  },
  {
    type: "video",
    src: "/assets/ads/ad-vid1.mp4",
    poster: "/assets/ads/ad-vid1-poster.jpg",
    alt: "Spot de video: cierra el ciclo y vende tu casa",
  },
  {
    type: "image",
    src: "/assets/ads/ad-square.jpg",
    alt: "Anuncio: Vende tu casa de interés social, compra directa sin intermediarios",
  },
  {
    type: "image",
    src: "/assets/ads/ad-square2.jpg",
    alt: "Anuncio: Compramos tu casa de interés social, sin intermediarios ni publicar",
  },
  {
    type: "video",
    src: "/assets/ads/ad-vid2.mp4",
    poster: "/assets/ads/ad-vid2-poster.jpg",
    alt: "Spot de video: solución a tu deuda vendiendo tu casa",
  },
  {
    type: "image",
    src: "/assets/ads/ad-story1.jpg",
    alt: "Anuncio: Recibe una oferta por tu casa",
  },
  {
    type: "image",
    src: "/assets/ads/ad-story2.jpg",
    alt: "Anuncio: Compramos casas de interés social",
  },
  {
    type: "video",
    src: "/assets/ads/ad-cierreciclo1.mp4",
    poster: "/assets/ads/ad-cierreciclo1-poster.jpg",
    alt: "Spot de video: cierra el ciclo y vende tu casa de interés social",
  },
  {
    type: "video",
    src: "/assets/ads/ad-cierreciclo2.mp4",
    poster: "/assets/ads/ad-cierreciclo2-poster.jpg",
    alt: "Spot de video: cierra el ciclo y vende tu casa — versión 2",
  },
  {
    type: "video",
    src: "/assets/ads/ad-soluciondeuda1.mp4",
    poster: "/assets/ads/ad-soluciondeuda1-poster.jpg",
    alt: "Spot de video: solución a tu deuda vendiendo tu casa",
  },
  {
    type: "video",
    src: "/assets/ads/ad-soluciondeuda2.mp4",
    poster: "/assets/ads/ad-soluciondeuda2-poster.jpg",
    alt: "Spot de video: solución a tu deuda vendiendo tu casa — versión 2",
  },
  {
    type: "image",
    src: "/assets/ads/ad-transparencia1.png",
    alt: "Anuncio: transparencia y seguridad en la compra de tu casa",
  },
  {
    type: "image",
    src: "/assets/ads/ad-transparencia2.png",
    alt: "Anuncio: transparencia y seguridad — proceso claro y sin intermediarios",
  },
  {
    type: "image",
    src: "/assets/ads/ad-transparencia2b.png",
    alt: "Anuncio: transparencia y seguridad — formato cuadrado",
  },
  {
    type: "image",
    src: "/assets/ads/ad-transparencia3.png",
    alt: "Anuncio: transparencia y seguridad — vende con confianza",
  },
  {
    type: "image",
    src: "/assets/ads/ad-transparencia3b.png",
    alt: "Anuncio: transparencia y seguridad — versión alterna",
  },
  {
    type: "image",
    src: "/assets/ads/ad-transparencia4.png",
    alt: "Anuncio: transparencia y seguridad — compra directa y segura",
  },
  {
    type: "image",
    src: "/assets/ads/ad-transparencia4b.png",
    alt: "Anuncio: transparencia y seguridad — versión alterna",
  },
  {
    type: "image",
    src: "/assets/ads/ad-transparencia5.png",
    alt: "Anuncio: transparencia y seguridad — oferta justa por tu casa",
  },
];

export default function Process() {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);
  const [autoKey, setAutoKey] = useState(0);
  const [inView, setInView] = useState(false);
  const [zoom, setZoom] = useState<number | null>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const n = steps.length;

  // el cover flow del pipeline solo aplica en móvil
  useEffect(() => {
    const mq = window.matchMedia("(max-width:760px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // el cover flow arranca (desde el paso 1) recién cuando entra en pantalla,
  // para que el usuario no llegue y ya vaya por el paso 3 o 4
  useEffect(() => {
    if (!isMobile) return;
    const el = flowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(0);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isMobile]);

  // auto-avance continuo del cover flow (solo cuando está visible; se reinicia al interactuar)
  useEffect(() => {
    if (!isMobile || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const id = setInterval(() => setActive((p) => (p + 1) % n), 3200);
    return () => clearInterval(id);
  }, [isMobile, inView, autoKey, n]);

  // fija una card y reinicia el temporizador
  const select = (idx: number) => {
    setActive(idx);
    setAutoKey((k) => k + 1);
  };

  // swipe del cover flow
  const startX = useRef(0);
  const moved = useRef(false);
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    moved.current = false;
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) {
      moved.current = true;
      select(Math.min(n - 1, Math.max(0, active + (dx < 0 ? 1 : -1))));
    }
  };

  const cardStyle = (idx: number): CSSProperties => {
    const off = idx - active;
    const a = Math.abs(off);
    const sign = Math.sign(off);
    if (off === 0) {
      return {
        transform: "translate(-50%,-50%) translateZ(50px) scale(1)",
        zIndex: 60,
        opacity: 1,
      };
    }
    return {
      transform: `translate(-50%,-50%) translateX(${
        sign * (52 + (a - 1) * 14)
      }%) translateZ(${-(60 + a * 60)}px) rotateY(${
        -sign * 40
      }deg) scale(${Math.max(0.72, 1 - a * 0.1)})`,
      zIndex: 50 - a,
      opacity: a > 2 ? 0 : 1 - (a - 1) * 0.4,
      pointerEvents: a > 2 ? "none" : "auto",
    };
  };

  // lightbox de anuncios: teclado + bloqueo de scroll
  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      else if (e.key === "ArrowRight")
        setZoom((p) => (p === null ? p : (p + 1) % ads.length));
      else if (e.key === "ArrowLeft")
        setZoom((p) => (p === null ? p : (p - 1 + ads.length) % ads.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return (
    <section className="process" id="proceso">
      <div className="wrap">
        <div className="eyebrow reveal">Pipeline creativo</div>
        <h2 className="process-title reveal">
          Un proceso de punta a punta, <span className="o">no solo diseño</span>.
        </h2>

        {isMobile ? (
          <div
            className="pipe-flow reveal"
            ref={flowRef}
            onPointerDown={onDown}
            onPointerUp={onUp}
          >
            <div className="pipe-stage">
              {steps.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  className={`pipe-card${s.ai ? " ai" : ""}${
                    idx === active ? " is-active" : ""
                  }`}
                  style={cardStyle(idx)}
                  onClick={() => {
                    if (moved.current) {
                      moved.current = false;
                      return;
                    }
                    select(idx);
                  }}
                >
                  <span className="pstep-i">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="pstep-name">{s.name}</span>
                  <span className="pstep-desc">{s.desc}</span>
                </button>
              ))}
            </div>
            <div className="pipe-dots">
              {steps.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  className={idx === active ? "on" : ""}
                  onClick={() => select(idx)}
                  aria-label={`Ir a ${s.name}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="pipeline reveal">
            {steps.map((s, i) => (
              <Fragment key={s.name}>
                <div className={`pstep${s.ai ? " ai" : ""}`}>
                  <span className="pstep-i">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pstep-name">{s.name}</span>
                  <span className="pstep-desc">{s.desc}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className="pchevron" aria-hidden="true">
                    →
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        )}

        <p className="process-note reveal">
          Integro herramientas de <b>IA</b> en flujos creativos para{" "}
          <b>acelerar la producción</b>, validar conceptos y optimizar recursos{" "}
          <b>sin comprometer la calidad visual</b>.
        </p>

        {/* Respaldo con datos reales de un ecosistema de campañas */}
        <div className="proof reveal">
          <div className="proof-head">El proceso, en resultados de negocio</div>
          <div className="proof-grid">
            {proof.map((p) => (
              <button type="button" className="proof-kpi" key={p.label}>
                <span className="proof-v">{p.value}</span>
                <span className="proof-l">{p.label}</span>
                <span className="proof-tip" role="tooltip">
                  {p.tip}
                </span>
              </button>
            ))}
          </div>
          <div className="proof-highlight">
            <span className="ph-value">39.37%</span>
            <span className="ph-text">
              de conversión en el <b>mejor segmento</b> —campañas de adquisición
              en Meta Ads, con CPL de ~$32 MXN—: <b>casi 5× el promedio</b>{" "}
              (8.07%). Ahí concentré las creatividades centradas en personas.
            </span>
          </div>
          <p className="proof-note">
            Mi trabajo creativo ayudó a{" "}
            <b>identificar y escalar los mensajes de mejor desempeño</b> dentro
            de un ecosistema de campañas multicanal (Meta, Google y TikTok) para{" "}
            <b>Compramos Tu Casa.mx</b> que generó <b>700+ leads</b>.
          </p>
          <p className="proof-learning">
            <b>Aprendizaje.</b> La emoción le gana al dato: las piezas con rostro
            humano y beneficios reales convirtieron por encima de las genéricas,
            y regionalizar el mensaje por mercado afinó cada campaña.
          </p>

          {/* Creativas reales que respaldan los datos */}
          <div className="proof-ads">
            <div className="proof-ads-head">
              Creativas de la campaña — clic para ampliar
            </div>
            <div className="proof-ads-strip">
              {ads.map((ad, i) => (
                <button
                  key={ad.src}
                  type="button"
                  className={`proof-ad${ad.type === "video" ? " is-video" : ""}`}
                  onClick={() => setZoom(i)}
                  aria-label={`Ampliar: ${ad.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ad.type === "video" ? ad.poster : ad.src}
                    alt={ad.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  {ad.type === "video" && (
                    <span className="proof-ad-play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox de anuncios */}
      {zoom !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="img-modal"
            role="dialog"
          aria-modal="true"
          aria-label="Creativa de la campaña"
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            className="im-close"
            onClick={() => setZoom(null)}
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <button
            type="button"
            className="im-nav im-prev"
            onClick={(e) => {
              e.stopPropagation();
              setZoom((p) => (p === null ? p : (p - 1 + ads.length) % ads.length));
            }}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          {ads[zoom].type === "video" ? (
            <video
              className="im-img"
              src={ads[zoom].src}
              poster={ads[zoom].poster}
              controls
              autoPlay
              loop
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="im-img"
              src={ads[zoom].src}
              alt={ads[zoom].alt}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <button
            type="button"
            className="im-nav im-next"
            onClick={(e) => {
              e.stopPropagation();
              setZoom((p) => (p === null ? p : (p + 1) % ads.length));
            }}
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="im-count">
            {zoom + 1} / {ads.length}
          </div>
        </div>,
          document.body
        )}
    </section>
  );
}
