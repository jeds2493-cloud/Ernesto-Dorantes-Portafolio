"use client";

// Demostración del hero: el sitio viejo de un consultorio se arregla en cuatro
// pasos (dirección de arte, creativo, SEO y datos), se compara el antes con el
// después y al final le llegan mensajes y citas. Todo es HTML y CSS: no hay
// imágenes ni video. El negocio es ficticio.

import { useEffect, useRef, useState } from "react";
import { PtrIcon } from "./Ptr";

// Duración de cada paso: antes, cuatro arreglos, comparación, después y un
// desvanecido corto para reiniciar.
const STEPS = [1800, 2400, 2400, 2400, 2400, 2200, 6400, 700];
const LAST = 6; // último paso «con contenido»; el 7 solo desvanece para reiniciar

// `size`: la medida que muestra el marco al terminar de seleccionar.
const CRAFTS = [
  { id: "arte", label: "Dirección de arte", size: "280 × 296" },
  { id: "copy", label: "Creativo", size: "262 × 108" },
  { id: "seo", label: "SEO", size: "280 × 62" },
  { id: "datos", label: "Datos", size: "260 × 58" },
];

/* — bloques del sitio viejo: se usan en la página y en la comparación final — */
const OldHead = () => (
  <div className="sf-old">
    <div className="sf-o-banner">CLÍNICA DENTAL SONRISA</div>
    <div className="sf-o-nav">
      <u>Inicio</u>|<u>Quiénes somos</u>|<u>Servicios</u>|<u>Contacto</u>
    </div>
  </div>
);
const OldHero = () => (
  <div className="sf-old">
    <div className="sf-o-box">
      <p className="sf-o-title">¡¡Bienvenidos a nuestra página web!!</p>
      <p className="sf-o-promo">*** PROMOCIÓN: LIMPIEZA DENTAL *** LLÁMENOS ***</p>
      <div className="sf-o-cols">
        <div className="sf-o-img">
          <span>foto1.jpg</span>
        </div>
        <p>
          Somos una empresa líder con más de 20 años de experiencia,
          comprometidos con la excelencia, la calidad y la satisfacción total de
          nuestros pacientes, brindando soluciones integrales de salud bucal.
        </p>
      </div>
      <p className="sf-o-more">
        <u>Haga clic aquí para ver más información</u>
      </p>
    </div>
  </div>
);
const OldSeo = () => (
  <div className="sf-old">
    <p>
      Usted es el visitante No. <b>001284</b>
    </p>
    <p>Sitio optimizado para Internet Explorer 6</p>
  </div>
);
const OldCta = () => (
  <div className="sf-old">
    <div className="sf-o-box">
      <p className="sf-o-h">CONTACTO</p>
      <p>Tel: (55) 0000-0000 · Fax: (55) 0000-0001</p>
      <p>
        Escríbanos a: <u>clinica_sonrisa@hotmail.com</u>
      </p>
      <div className="sf-o-wip">SITIO EN CONSTRUCCIÓN</div>
      <p className="sf-o-copy">© 2009 Todos los derechos reservados</p>
    </div>
  </div>
);

const WaGlyph = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.76 4.88-1.28A10 10 0 1 0 12 2Zm4.5 12.06c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5l.37-.43c.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43l-.76-1.84c-.2-.48-.4-.42-.56-.42h-.48a.92.92 0 0 0-.66.31 2.78 2.78 0 0 0-.87 2.07 4.83 4.83 0 0 0 1.01 2.56c.12.17 1.75 2.67 4.24 3.74 1.5.65 2.1.7 2.97.58.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.17-.47-.29Z"
    />
  </svg>
);

export default function SiteFix() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [live, setLive] = useState(false); // en pantalla y con la pestaña visible
  const [still, setStill] = useState(false); // «reducir movimiento»
  const [paused, setPaused] = useState(false); // pausa manual (WCAG 2.2.2)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setStill(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const hero = ref.current?.closest(".es-hero") ?? null;
    const ioHero = new IntersectionObserver(([e]) => hero?.classList.toggle("is-off", !e.isIntersecting));
    if (hero) ioHero.observe(hero);

    const mobile = window.matchMedia("(max-width: 640px)");
    let ratio = 0;
    let seen = false;
    let shown = !document.hidden;
    const sync = () => setLive(seen && shown);
    // Corre solo con más de la mitad del teléfono a la vista: en celular, donde
    // al cargar apenas asoma, arranca cuando la persona baja hasta él (así ve
    // el ciclo desde el principio y la carga inicial no compite con la animación).
    // En celular exige 80 % de la tarjeta a la vista y que la persona ya haya
    // bajado (scroll > 0); en escritorio basta con 55 %.
    const evalSeen = () => {
      seen = mobile.matches ? ratio >= 0.8 && window.scrollY > 8 : ratio >= 0.55;
      sync();
    };
    const onScroll = () => {
      if (mobile.matches && !seen) evalSeen();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      ([e]) => {
        ratio = e.intersectionRatio;
        evalSeen();
      },
      { threshold: [0, 0.55, 0.8] },
    );
    if (ref.current) io.observe(ref.current);
    const onVis = () => {
      shown = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
      io.disconnect();
      ioHero.disconnect();
      hero?.classList.remove("is-off");
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (!live || still || paused) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step]);
    return () => window.clearTimeout(t);
  }, [step, live, still, paused]);

  // Con «reducir movimiento» se muestra el resultado final, quieto.
  const at = still ? LAST : step;
  const cls = ["sf", `at-${at}`];
  for (let n = 1; n <= Math.min(at, LAST); n++) cls.push(`is-s${n}`);
  if (at > LAST) cls.push("is-out");
  if (still) cls.push("is-still");
  // Fuera de pantalla (o con la pestaña oculta) todas las animaciones se pausan.
  if (live) cls.push("is-live");
  if (paused && !still) cls.push("is-paused");
  const phase = at === 0 || at > LAST ? 0 : at < 5 ? 1 : 2; // antes · en arreglo · después

  return (
    <div ref={ref} className={cls.join(" ")}>
      <p className="es-sr">
        Demostración animada con un negocio ficticio: el sitio viejo de un
        consultorio dental no recibe mensajes; se rediseña en cuatro pasos
        (dirección de arte, creativo, SEO y datos) y al terminar empieza a
        recibir mensajes de WhatsApp, citas y solicitudes de cotización.
      </p>

      {!still && (
        <button
          type="button"
          className="sf-pause"
          aria-pressed={paused}
          onClick={() => setPaused((v) => !v)}
        >
          {paused ? "Reanudar animación" : "Pausar animación"}
        </button>
      )}

      <div className="sf-fit" aria-hidden="true">
        <div className="sf-stage">
          {/* indicador de estado, separado del teléfono */}
          <ol className="sf-steps">
            {["Antes", "En arreglo", "Después"].map((t, i) => (
              <li key={t} className={i === phase ? "is-on" : i < phase ? "is-done" : undefined}>
                {t}
              </li>
            ))}
          </ol>
          {/* sombra en el piso, fuera del giro */}
          <span className="sf-ground" />
          <div className="sf-rig">
            <div className="sf-phone">
              <div className="sf-screen">
                <span className="sf-island" />
                <div className="sf-bar">
                  <span>9:41</span>
                  <span className="sf-bar-ic">
                    <i />
                    <i />
                    <i />
                    <b />
                  </span>
                </div>
                <div className="sf-url">
                  <span className="sf-old">
                    <i>No seguro</i> clinicasonrisa.com.mx/index.htm
                  </span>
                  <span className="sf-new">
                    <svg viewBox="0 0 12 14" width="9" height="11">
                      <path
                        d="M3 6V4a3 3 0 0 1 6 0v2h1v7H2V6h1Zm1.6 0h2.8V4a1.4 1.4 0 0 0-2.8 0v2Z"
                        fill="currentColor"
                      />
                    </svg>
                    sonrisa.mx
                  </span>
                </div>

                <div className="sf-site">
                  <div className="sf-slot sf-head sf-c-arte">
                    <OldHead />
                    <div className="sf-new">
                      <span className="sf-n-logo">
                        <i />
                        Sonrisa
                        <small>Clínica dental</small>
                      </span>
                      <span className="sf-n-pill">Agendar cita</span>
                    </div>
                  </div>

                  <div className="sf-slot sf-hero sf-c-arte">
                    <OldHero />
                    <div className="sf-new">
                      <span className="sf-n-eye">
                        <i />
                        Abierto hoy · 9 a 19 h
                      </span>
                      <div className="sf-n-h">
                        <span className="sf-n-a">Bienvenidos a nuestra página web</span>
                        <span className="sf-n-b">Tu sonrisa, sin dolor y sin esperas.</span>
                      </div>
                      <div className="sf-n-p">
                        <span className="sf-n-a">
                          Somos una empresa líder con más de 20 años de experiencia.
                        </span>
                        <span className="sf-n-b">
                          Limpieza, ortodoncia e implantes. Citas el mismo día.
                        </span>
                      </div>
                      <div className="sf-n-art">
                        <span className="sf-n-smile" />
                        <span className="sf-n-card">
                          <i />
                          <b>Hoy quedan 3 lugares</b>
                          <small>Agenda en un minuto</small>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="sf-slot sf-seo sf-c-seo">
                    <OldSeo />
                    <div className="sf-new">
                      <span className="sf-n-g">G</span>
                      <span className="sf-n-rate">
                        <b>4.9</b> <em>★★★★★</em>
                        <small>212 reseñas en Google</small>
                      </span>
                      <span className="sf-n-open">Cómo llegar</span>
                    </div>
                  </div>

                  <div className="sf-slot sf-cta sf-c-datos">
                    <OldCta />
                    <div className="sf-new">
                      <span className="sf-n-wa">
                        <WaGlyph />
                        Agendar por WhatsApp
                      </span>
                      <div className="sf-n-serv">
                        <span>
                          <i />
                          <b>Limpieza</b>
                          <small>desde $600</small>
                        </span>
                        <span>
                          <i />
                          <b>Ortodoncia</b>
                          <small>plan a meses</small>
                        </span>
                        <span>
                          <i />
                          <b>Implantes</b>
                          <small>valoración</small>
                        </span>
                      </div>
                      <span className="sf-n-trust">
                        <i />
                        Respondemos en menos de 5 minutos
                      </span>
                    </div>
                  </div>

                  {/* Comparación: el sitio viejo vuelve por la izquierda un momento */}
                  <div className="sf-cmp">
                    <div className="sf-slot sf-head">
                      <OldHead />
                    </div>
                    <div className="sf-slot sf-hero">
                      <OldHero />
                    </div>
                    <div className="sf-slot sf-seo">
                      <OldSeo />
                    </div>
                    <div className="sf-slot sf-cta">
                      <OldCta />
                    </div>
                  </div>
                  <span className="sf-cmp-h">
                    <i />
                  </span>
                  <span className="sf-cmp-l sf-cmp-l--a">Antes</span>
                  <span className="sf-cmp-l sf-cmp-l--b">Después</span>
                </div>
              </div>
            </div>

            {/* Marco de selección del bloque que se está arreglando */}
            {CRAFTS.map((c, i) => (
              <span key={c.id} className={`sf-sel sf-sel--${i + 1} sf-c-${c.id}`} data-size={c.size} />
            ))}

            {/* Punteros con su oficio */}
            {CRAFTS.map((c, i) => (
              <span key={c.id} className={`sf-cur sf-cur--${i + 1} sf-c-${c.id}`}>
                {/* fuera se mueve en X, dentro en Y (trayectoria curva) y el
                    cuerpo flota un poco cuando el puntero ya terminó */}
                <span className="sf-cur-in">
                  <span className="sf-cur-b">
                    <PtrIcon className="sf-ptr" />
                    <b className="sf-tag">{c.label}</b>
                  </span>
                </span>
              </span>
            ))}

            {/* Lo que le llega al negocio: de cero mensajes a tres clientes */}
            <div className="sf-inbox">
              <p className="sf-inbox-h">
                {/* campanita: se sacude con cada mensaje que llega */}
                <span className="sf-bell">
                  <svg viewBox="0 0 24 24" width="15" height="15">
                    <path
                      fill="currentColor"
                      d="M12 2.5a1.4 1.4 0 0 0-1.4 1.4v.5A6 6 0 0 0 6 10.2v3.1l-1.7 3a1 1 0 0 0 .87 1.5h13.66a1 1 0 0 0 .87-1.5l-1.7-3v-3.1a6 6 0 0 0-4.6-5.8v-.5A1.4 1.4 0 0 0 12 2.5Zm-2.4 16.6a2.5 2.5 0 0 0 4.8 0H9.6Z"
                    />
                  </svg>
                  <i />
                  <i />
                </span>
                <span>Mensajes de clientes</span>
                <b>
                  <span>
                    <i>0</i>
                    <i>1</i>
                    <i>2</i>
                    <i>3</i>
                  </span>
                </b>
              </p>
              <div className="sf-toast sf-toast--1">
                <i className="sf-t-wa">
                  <WaGlyph size={18} />
                </i>
                <p>
                  <b>WhatsApp · desde el sitio</b>
                  <span>Hola, ¿tienen cita mañana?</span>
                </p>
              </div>
              <div className="sf-toast sf-toast--2">
                <i className="sf-t-cal" />
                <p>
                  <b>Cita agendada · desde el sitio</b>
                  <span>Jueves 10:30 · Limpieza</span>
                </p>
              </div>
              <div className="sf-toast sf-toast--3">
                <i className="sf-t-form" />
                <p>
                  <b>Formulario · cotización</b>
                  <span>Ortodoncia para mi hija</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
