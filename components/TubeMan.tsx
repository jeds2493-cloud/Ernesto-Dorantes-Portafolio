"use client";

import { useState } from "react";

/**
 * Inflable danzante ("tube man") + banderín de SALE, los dos íconos del
 * marketing de calle, en clave dark/naranja del sitio. 100% CSS animado.
 * Incluye un botón rojo conectado por un cable que lo prende/apaga
 * (al apagarlo se desinfla sobre su base). Se oculta en pantallas chicas.
 */
export default function TubeMan() {
  const [on, setOn] = useState(true);

  return (
    <div className={`tubeman${on ? "" : " off"}`}>
      <div className="flag" aria-hidden="true">
        <span className="pole" />
        <span className="pennant">SALE! SALE!</span>
      </div>

      <div className="guy" aria-hidden="true">
        <div className="tube">
          <div className="s s1">
            <div className="s s2">
              <div className="s s3">
                <span className="arm arm-l" />
                <span className="arm arm-r" />
                <div className="head">
                  <span className="hair">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <svg className="face" viewBox="0 0 40 42" aria-hidden="true">
                    {/* gafas de sol */}
                    <path
                      d="M6 16 L2.5 14"
                      stroke="#0a0a0c"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M34 16 L37.5 14"
                      stroke="#0a0a0c"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <rect
                      x="6.5"
                      y="13"
                      width="11"
                      height="9.5"
                      rx="3.4"
                      fill="#141418"
                      stroke="#0a0a0c"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="22.5"
                      y="13"
                      width="11"
                      height="9.5"
                      rx="3.4"
                      fill="#141418"
                      stroke="#0a0a0c"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M17.5 15 Q20 14 22.5 15"
                      stroke="#0a0a0c"
                      strokeWidth="1.6"
                      fill="none"
                    />
                    <path
                      d="M9 15.5 L12 15.5"
                      stroke="rgba(255,255,255,.55)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M25 15.5 L28 15.5"
                      stroke="rgba(255,255,255,.55)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    {/* sonrisa */}
                    <path
                      d="M14 28 Q20 33 26 28"
                      stroke="#fff"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fan" />
      </div>

      <button
        type="button"
        className={`tm-switch${on ? " on" : ""}`}
        onClick={() => setOn((v) => !v)}
        aria-label={on ? "Apagar el inflable" : "Prender el inflable"}
        aria-pressed={on}
        title={on ? "Apagar" : "Prender"}
      >
        <span className="tm-cord" aria-hidden="true" />
        <span className="tm-mount" aria-hidden="true" />
        <span className="tm-dome" aria-hidden="true" />
      </button>
    </div>
  );
}
