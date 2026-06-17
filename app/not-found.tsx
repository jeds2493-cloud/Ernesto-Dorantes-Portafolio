import Link from "next/link";
import LavaBg from "@/components/LavaBg";

export default function NotFound() {
  return (
    <main className="nf">
      <LavaBg />
      <div className="nf-inner">
        <span className="nf-eyebrow">Error 404</span>
        <h1 className="nf-title">
          Esta página se salió del <em>cuadro</em>.
        </h1>
        <p className="nf-sub">
          El enlace que buscas no existe o se movió de lugar. Volvamos a lo que
          importa.
        </p>
        <div className="nf-cta">
          <Link href="/" className="nf-primary">
            Volver al inicio
          </Link>
          <Link href="/servicios" className="nf-link">
            Ver servicios ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
