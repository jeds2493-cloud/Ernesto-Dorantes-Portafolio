"use client";

// Navegación del home: enlaces simples en escritorio y un menú desplegable en
// celular. Todo llega pintado desde el servidor; el JS solo marca la sección
// visible y abre o cierra el menú.

import { useEffect, useRef, useState } from "react";

type Item = { label: string; href: string };

export default function EsNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  // Marca la sección que cruza el centro de la pantalla; ninguna en el inicio.
  useEffect(() => {
    const els = items
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => !!el);
    let raf = 0;
    const spy = () => {
      raf = 0;
      const mid = window.innerHeight * 0.4;
      const hit = els.find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      });
      setActive(hit ? "#" + hit.id : "");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(spy);
    };
    raf = requestAnimationFrame(spy);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // El menú de celular se cierra con Escape o al tocar fuera.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      btn.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const links = (cls: string) =>
    items.map((i) => (
      <li key={i.href}>
        <a
          href={i.href}
          className={`${cls}${active === i.href ? " is-on" : ""}`}
          aria-current={active === i.href ? "true" : undefined}
          onClick={() => setOpen(false)}
        >
          {i.label}
        </a>
      </li>
    ));

  return (
    <div
      className="es-nav"
      role="navigation"
      aria-label="Principal"
      ref={root}
      onBlur={(e) => {
        const to = e.relatedTarget as Node | null;
        if (open && to && !e.currentTarget.contains(to)) setOpen(false);
      }}
    >
      <ul className="es-nav-list">{links("es-nav-a")}</ul>

      <button
        ref={btn}
        type="button"
        className={`es-nav-btn${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="es-nav-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="es-sr">{open ? "Cerrar menú" : "Abrir menú"}</span>
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </button>
      <ul id="es-nav-panel" className="es-nav-panel" hidden={!open}>
        {links("es-nav-row")}
      </ul>
    </div>
  );
}
