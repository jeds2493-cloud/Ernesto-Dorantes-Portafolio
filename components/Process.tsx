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

export default function Process() {
  return (
    <section className="process" id="proceso">
      <div className="wrap">
        <div className="eyebrow reveal">Cómo trabajo</div>
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
      </div>
    </section>
  );
}
