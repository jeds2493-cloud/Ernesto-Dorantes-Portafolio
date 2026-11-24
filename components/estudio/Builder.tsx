"use client";

// Armador «A la medida»: el cliente marca lo que necesita y el formulario se
// abre ya con esa lista. Solo suma los «desde» que tienen precio definido.
// React Bits: ClickSpark (chispas al marcar, se carga al primer toque) y Magnet.

import { useState } from "react";
import dynamic from "next/dynamic";
import Magnet from "@/components/reactbits/Magnet";
import { PRECIOS } from "@/lib/estudio";

type Opt = { id: string; label: string; from?: number; mensual?: boolean };

const OPTS: Opt[] = [
  { id: "landing", label: "Landing page", from: PRECIOS.landing },
  { id: "sitio", label: "Sitio web completo", from: PRECIOS.sitio },
  { id: "tienda", label: "Tienda en línea" },
  { id: "redes", label: "Contenido mensual para redes", from: PRECIOS.contenido, mensual: true },
  { id: "ads", label: "Anuncios en Meta y Google" },
  { id: "maps", label: "Perfil de Google Maps" },
  { id: "mant", label: "Mantenimiento del sitio" },
];

const ClickSpark = dynamic(() => import("@/components/reactbits/ClickSpark"), { ssr: false });

const mxn = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function Builder() {
  const [picked, setPicked] = useState<string[]>([]);
  // En celular el armador llega plegado (en escritorio siempre está abierto).
  const [unfold, setUnfold] = useState(false);
  // Las chispas se descargan al primer toque o al abrir el armador.
  const [spark, setSpark] = useState(false);
  const chosen = OPTS.filter((o) => picked.includes(o.id));

  const once = chosen.filter((o) => o.from && !o.mensual).reduce((a, o) => a + (o.from ?? 0), 0);
  const monthly = chosen.filter((o) => o.from && o.mensual).reduce((a, o) => a + (o.from ?? 0), 0);
  const pending = chosen.filter((o) => !o.from).length;
  // El total de pago único se oculta si solo hay conceptos mensuales o por cotizar.
  const showOnce = once > 0;

  const toggle = (id: string) => {
    let next = picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id];
    // Landing y sitio completo son excluyentes: el sitio ya incluye la landing.
    if (!picked.includes(id)) {
      if (id === "landing") next = next.filter((x) => x !== "sitio");
      if (id === "sitio") next = next.filter((x) => x !== "landing");
    }
    setPicked(next);
    const nota = OPTS.filter((o) => next.includes(o.id)).map((o) => o.label).join(" + ");
    window.dispatchEvent(new CustomEvent("builder-picks", { detail: { nota } }));
  };

  const open = () =>
    window.dispatchEvent(
      new CustomEvent("open-contact", {
        detail: {
          tipo: "A la medida",
          cta: "armador",
          nota: chosen.length ? chosen.map((o) => o.label).join(" + ") : undefined,
        },
      }),
    );

  // Lo mismo que se ve, en una sola frase para lectores de pantalla.
  const spoken =
    chosen.length === 0
      ? "Todavía no marcas nada."
      : [
          `${chosen.length} ${chosen.length === 1 ? "servicio" : "servicios"}`,
          once ? `desde ${mxn(once)} pesos` : "",
          monthly ? `más ${mxn(monthly)} pesos al mes` : "",
          pending ? `${pending} por cotizar` : "",
        ]
          .filter(Boolean)
          .join(", ");

  return (
    <div className={`es-builder${chosen.length ? " has-picks" : ""}${unfold ? " is-open" : ""}`}>
      <div className="es-builder-head">
        <h3>¿No encaja ninguno? Ármalo a tu medida.</h3>
        <p>
          Marca lo que necesitas. Me llega tu lista y te escribo con una
          cotización cerrada.
        </p>
        <button
          type="button"
          className="es-builder-toggle"
          aria-expanded={unfold}
          aria-controls="es-builder-body"
          onClick={() => {
            setSpark(true);
            setUnfold((o) => !o);
          }}
        >
          {unfold ? "Cerrar" : "Armar mi combinación"}
          <i aria-hidden="true" />
        </button>
      </div>

      <div className="es-builder-body" id="es-builder-body">
        {(() => {
          const list = (
            <ul className="es-chips" aria-label="Elige lo que necesitas">
              {OPTS.map((o) => {
                const on = picked.includes(o.id);
                return (
                  <li key={o.id}>
                    <button type="button" className="es-chip" aria-pressed={on} onClick={() => toggle(o.id)}>
                      <span className="es-chip-box" aria-hidden="true" />
                      <span className="es-chip-l">{o.label}</span>
                      <span className="es-chip-p">
                        {o.id === "sitio" ? `desde ${mxn(o.from ?? 0)} · incluye la landing` : o.from ? `desde ${mxn(o.from)}${o.mensual ? " al mes" : ""}` : "se cotiza"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          );
          return spark ? (
            <ClickSpark sparkColor="#c6ff2e" sparkSize={9} sparkRadius={22} sparkCount={8} duration={420} className="es-chips-spark">
              {list}
            </ClickSpark>
          ) : (
            <div className="es-chips-spark" onPointerEnter={() => setSpark(true)} onFocus={() => setSpark(true)}>
              {list}
            </div>
          );
        })()}

        <div className="es-builder-foot">
          <div className="es-builder-sum">
            <p className="es-sr" aria-live="polite">
              {spoken}
            </p>
            <div aria-hidden="true">
              <span className="es-builder-k">
                {chosen.length === 0
                  ? "Tu combinación"
                  : `${chosen.length} ${chosen.length === 1 ? "servicio" : "servicios"}${once || monthly ? " · desde" : ""}`}
              </span>
              {chosen.length === 0 ? (
                <p className="es-builder-empty">Marca uno o varios servicios</p>
              ) : (
                <p className="es-builder-total">
                  <span className={showOnce ? undefined : "es-off"}>
                    <b>{mxn(once)}</b>
                    <small>MXN</small>
                  </span>
                  {monthly > 0 && (
                    <span className="es-builder-plus">
                      {showOnce ? "+ " : ""}
                      <b>{mxn(monthly)}</b> al mes
                    </span>
                  )}
                  {pending > 0 && (
                    <span className="es-builder-plus">
                      {showOnce || monthly > 0 ? "+ " : ""}
                      {pending} por cotizar
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          <Magnet padding={50} magnetStrength={5} maxOffset={10} wrapperClassName="es-magnet">
            <button type="button" className="es-btn es-btn--signal es-btn--lg" onClick={open}>
              {chosen.length ? "Cotizar mi combinación" : "Cotizar a la medida"}
            </button>
          </Magnet>
        </div>
      </div>
    </div>
  );
}
