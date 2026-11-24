// Mini escenas de la sección de problemas: en cada una, el puntero de un oficio
// hace su trabajo cuando la fila entra a la pantalla. Todo es HTML y CSS
// (las animaciones viven en app/estudio-fx.css, bajo `.is-in`).

import { Ptr } from "./Ptr";

export type FixId = "arte" | "copy" | "seo" | "datos";

export function FixScene({ id }: { id: FixId }) {
  return (
    <div className={`fx-stage fx-${id}`} aria-hidden="true">
      <div className="fx-art">
        {id === "arte" && (
          <>
            <div className="fx-page">
              <span className="fa-bar" />
              <span className="fa-img" />
              <span className="fa-l fa-l1" />
              <span className="fa-l fa-l2" />
              <span className="fa-l fa-l3" />
              <span className="fa-btn" />
            </div>
            <span className="fa-guide" />
          </>
        )}

        {id === "copy" && (
          <div className="fx-page">
            <p className="fc-h">
              <span className="fc-old">Bienvenidos a nuestra página web</span>
              <span className="fc-new">Agenda tu cita hoy mismo</span>
            </p>
            <p className="fc-p">
              <span className="fc-old">Somos líderes con amplia experiencia.</span>
              <span className="fc-new">Te atendemos el mismo día.</span>
            </p>
            <span className="fc-btn">
              <span className="fc-old">Enviar</span>
              <span className="fc-new">Escríbeme por WhatsApp</span>
            </span>
          </div>
        )}

        {id === "seo" && (
          <>
            <div className="fs-bar">
              <i />
              dentista cerca de mí
            </div>
            <div className="fs-row fs-r1">
              <i />
              <b />
              <span />
            </div>
            <div className="fs-row fs-r2">
              <i />
              <b />
              <span />
            </div>
            <div className="fs-row fs-r3">
              <i />
              <b />
              <span />
            </div>
            <div className="fs-row fs-me">
              <p>
                <b>Tu negocio</b>
                <span>4.9 ★★★★★ · Abierto ahora</span>
              </p>
              <em>
                <span>
                  <i>4.º</i>
                  <i>1.º</i>
                </span>
              </em>
            </div>
          </>
        )}

        {id === "datos" && (
          <>
            <p className="fd-head">Mensajes este mes</p>
            <p className="fd-num">
              <span>
                <i>0</i>
                <i>12</i>
                <i>25</i>
                <i>37</i>
              </span>
            </p>
            <div className="fd-bars">
              <span className="fd-b fd-b1">
                <i />
                <em>Anuncio A</em>
              </span>
              <span className="fd-b fd-b2">
                <i />
                <em>Anuncio B</em>
              </span>
              <span className="fd-b fd-b3">
                <i />
                <em>Anuncio C</em>
              </span>
            </div>
            <span className="fd-flag">Este sí trae clientes</span>
          </>
        )}

        <Ptr c={id} label={id === "arte" ? "Arte" : undefined} />
      </div>
    </div>
  );
}
