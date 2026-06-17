"use client";

// Next re-monta este template en cada navegación de ruta (/, /servicios),
// así el fade de entrada corre en cada cambio de página.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-tx">{children}</div>;
}
