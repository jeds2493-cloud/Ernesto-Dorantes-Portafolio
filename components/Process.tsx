"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

type Step = { name: string; desc: string; ai?: boolean };

const steps: Step[] = [
  { name: "Estrategia", desc: "Objetivo de negocio y audiencia" },
  { name: "Concepto", desc: "Insight e idea rectora" },
  { name: "Diseño", desc: "Dirección de arte y sistema visual" },
  { name: "Motion", desc: "Animación y pieza audiovisual" },
  { name: "IA", desc: "Producción y validación acelerada", ai: true },
  { name: "Optimización", desc: "Iteración y A/B testing" },
];

const proof = [
  { label: "Impresiones", value: "671,966" },
  { label: "Clics", value: "8,802" },
  { label: "Leads", value: "710+" },
  { label: "Clic → Lead", value: "8.07%" },
  { label: "CPL promedio", value: "$84.50" },
  { label: "CPC promedio", value: "$6.82" },
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
];

export default function Process() {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);
  const [autoKey, setAutoKey] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const n = steps.length;

  // el cover flow del pipeline solo aplica en móvil
  useEffect(() => {
    const mq = window.matchMedia("(max-width:760px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // auto-avance continuo del cover flow (se reinicia al interactuar)
  useEffect(() => {
    if (!isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const id = setInterval(() => setActive((p) => (p + 1) % n), 3200);
    return () => clearInterval(id);
  }, [isMobile, autoKey, n]);

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
              <div className="proof-kpi" key={p.label}>
                <span className="proof-v">{p.value}</span>
                <span className="proof-l">{p.label}</span>
              </div>
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
                      ▶
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox de anuncios */}
      {zoom !== null && (
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
            ✕
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
            ‹
          </button>
          {ads[zoom].type === "video" ? (
            <video
              className="im-img contain"
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
              className="im-img contain"
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
            ›
          </button>
          <div className="im-count">
            {zoom + 1} / {ads.length}
          </div>
        </div>
      )}
    </section>
  );
}
