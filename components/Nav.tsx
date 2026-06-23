"use client";

import { useEffect, useState, type MouseEvent } from "react";
import LavaBg from "@/components/LavaBg";

const MAIL = "hello@ernestodorantes.com";

const LINKS: [string, string][] = [
  ["/servicios", "Servicios"],
  ["#sobre", "Sobre mí"],
  ["#trabajo", "Casos"],
  ["#resultados", "Resultados"],
  ["#contacto", "Contacto"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // resalta en el nav la sección visible (scrollspy)
  useEffect(() => {
    const sections = LINKS.map(([h]) => h)
      .filter((h) => h.startsWith("#"))
      .map((h) => document.getElementById(h.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-ed.png" alt="" className="brand-logo" />
          Ernesto Dorantes
        </a>
        <div className="links">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={goTo(href)}
              className={active === href ? "active" : undefined}
              aria-current={active === href ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <a
          className="avail"
          href="/servicios"
          aria-label="Trabajemos juntos — ver servicios"
        >
          <span className="led" />
          Trabajemos juntos
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
        {open && <LavaBg />}
        <div className="nav-overlay-inner" onClick={(e) => e.stopPropagation()}>
          <div className="nav-overlay-top">
            <a href="#top" className="brand" onClick={goTo("#top")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo-ed.png" alt="" className="brand-logo" />
              Ernesto Dorantes
            </a>
            <button
              type="button"
              className="nav-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <span />
              <span />
            </button>
          </div>

          <div className="nav-links" role="navigation" aria-label="Menú principal">
            {LINKS.map(([href, label], i) => (
              <a key={href} href={href} onClick={goTo(href)}>
                <span className="nav-link-i">0{i + 1}</span>
                {label}
              </a>
            ))}
          </div>

          <div className="nav-foot">
            <a className="nav-avail-cta" href="/servicios" onClick={closeMenu}>
              <span className="led" />
              Trabajemos juntos
            </a>
            <div className="nav-foot-grid">
              <div className="nav-foot-col">
                <span className="nav-foot-label">Ubicación</span>
                <p>
                  Toluca de Lerdo,
                  <br />
                  México
                </p>
              </div>
              <div className="nav-foot-col">
                <span className="nav-foot-label">Contacto</span>
                <a
                  className="nav-mail"
                  href={`mailto:${MAIL}`}
                  onClick={closeMenu}
                >
                  Escríbeme ↗
                </a>
              </div>
            </div>
            <div className="nav-foot-legal">
              <span>© 2026 Ernesto Dorantes</span>
              <span>Director Creativo</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
