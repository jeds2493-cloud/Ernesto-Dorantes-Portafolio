"use client";

import { useEffect, useState, type MouseEvent } from "react";

const LINKS: [string, string][] = [
  ["#sobre", "Sobre mí"],
  ["#trabajo", "Casos"],
  ["#experiencia", "Carrera"],
  ["#contacto", "Contacto"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // bloquea el scroll y cierra con Escape mientras el menú está abierto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // scroll explícito de la ventana (algunas secciones viven dentro de un
  // contenedor overflow:hidden que rompe el salto nativo a anclas)
  const goTo = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    // enlaces de ruta (p. ej. /servicios): navegación normal del navegador
    if (!href.startsWith("#")) {
      setOpen(false);
      document.body.style.overflow = "";
      return;
    }
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // la descarga del CV no debe prevenir el default; solo cierra el menú
  const closeMenu = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

  return (
    <>
      <nav>
        <a href="#top" className="brand" onClick={goTo("#top")}>
          Ernesto Dorantes
        </a>
        <div className="links">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={goTo(href)}>
              {label}
            </a>
          ))}
        </div>
        <a
          className="avail"
          href="/servicios"
          aria-label="Disponible para proyectos — ver servicios"
        >
          <span className="led" />
          Disponible para proyectos
        </a>

        {/* Botón hamburguesa — solo móvil */}
        <button
          type="button"
          className={`nav-toggle${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay de navegación móvil (fuera del nav para que cubra la pantalla) */}
      <div
        className={`nav-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      >
        <button
          type="button"
          className="nav-close"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        >
          ✕
        </button>
        <div className="nav-overlay-inner" onClick={(e) => e.stopPropagation()}>
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={goTo(href)}>
              {label}
            </a>
          ))}
          <a className="nav-avail-cta" href="/servicios" onClick={closeMenu}>
            <span className="led" />
            Disponible para proyectos
          </a>
        </div>
      </div>
    </>
  );
}
