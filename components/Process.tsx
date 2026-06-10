"use client";

import { Fragment } from "react";

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

export default function Process() {
  return (
    <section className="process" id="proceso">
      <div className="wrap">
        <div className="eyebrow reveal">Pipeline creativo</div>
        <h2 className="process-title reveal">
          Un proceso de punta a punta, <span className="o">no solo diseño</span>.
        </h2>

        <div className="pipeline reveal">
          {steps.map((s, i) => (
            <Fragment key={s.name}>
              <div className={`pstep${s.ai ? " ai" : ""}`}>
                <span className="pstep-i">{String(i + 1).padStart(2, "0")}</span>
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
            Mi trabajo creativo ayudó a <b>identificar y escalar los mensajes
            de mejor desempeño</b> dentro de un ecosistema de campañas multicanal
            (Meta, Google y TikTok) para <b>Compramos Tu Casa.mx</b> que generó{" "}
            <b>700+ leads</b>.
          </p>
          <p className="proof-learning">
            <b>Aprendizaje.</b> La emoción le gana al dato: las piezas con
            rostro humano y beneficios reales convirtieron por encima de las
            genéricas, y regionalizar el mensaje por mercado afinó cada campaña.
          </p>
        </div>
      </div>
    </section>
  );
}
