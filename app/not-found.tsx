import Link from "next/link";
import "./estudio.css";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="es es-nf">
      <main className="es-nf-inner" id="top">
        <span className="es-nf-eyebrow">Error 404</span>
        <h1 className="es-nf-title">
          Esta página se salió del <em>cuadro</em>.
        </h1>
        <p className="es-nf-sub">
          El enlace que buscas no existe o se movió de lugar. Volvamos a lo que
          importa.
        </p>
        <div className="es-nf-cta">
          <Link href="/" className="es-btn es-btn--signal">
            Volver al inicio
          </Link>
          <Link href="/#servicios" className="es-btn es-btn--ghost">
            Ver paquetes
          </Link>
        </div>
      </main>
    </div>
  );
}
