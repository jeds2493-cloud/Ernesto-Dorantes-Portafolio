"use client";

// Piezas animadas del home (React Bits adaptado a la paleta del estudio).
// Todas respetan prefers-reduced-motion desde el propio componente.

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import BlurText from "@/components/reactbits/BlurText";
import RotatingText from "@/components/reactbits/RotatingText";
import CountUp from "@/components/reactbits/CountUp";
import { LogoLoop } from "@/components/reactbits/LogoLoop";
import Magnet from "@/components/reactbits/Magnet";
import PillNav from "@/components/reactbits/PillNav";
import ScrollStack, { ScrollStackItem } from "@/components/reactbits/ScrollStack";

function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/* ---------- H1: entra palabra por palabra; el remate va subrayado en Señal ---------- */
export function HeroTitle({ lead, punch }: { lead: string; punch: string }) {
  return (
    <h1 className="es-h1">
      <BlurText as="span" className="es-h1-lead" text={lead} delay={40} stepDuration={0.3} blur={8} distance={14} trigger="load" />
      <BlurText as="span" className="es-h1-punch" text={punch} delay={40} stepDuration={0.3} blur={8} distance={14} trigger="load" />
    </h1>
  );
}

/* ---------- Nicho que rota (solo una palabra, sin fondo que compita) ---------- */
export function NicheRotator({ items }: { items: string[] }) {
  return (
    <RotatingText
      texts={items}
      effect="slide"
      direction="up"
      rotationInterval={2800}
      staggerDuration={0.01}
      staggerFrom="first"
      mainClassName="es-rot"
      splitLevelClassName="es-rot-split"
      transition={{ type: "spring", damping: 34, stiffness: 380 }}
      aria-live="off"
    />
  );
}

/* ---------- Cifras que cuentan una vez al aparecer ---------- */
export function Count({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}) {
  // El valor real va en texto para lectores de pantalla y buscadores;
  // el contador animado es solo visual (sin JS nunca se lee "0").
  const real = `${prefix}${to.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  return (
    <>
      <span className="es-sr">{real}</span>
      <span aria-hidden="true">
        <CountUp
          to={to}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          duration={1.8}
          trigger="view"
          className="es-count"
        />
      </span>
    </>
  );
}

/* ---------- Cinta de beneficios ---------- */
export function BenefitTicker({ items }: { items: string[] }) {
  const logos = items.map((t) => ({
    node: (
      <span className="es-tick-item">
        <span className="es-tick-mark" aria-hidden="true" />
        {t}
      </span>
    ),
    title: t,
  }));
  return (
    <LogoLoop
      logos={logos}
      speed={48}
      direction="left"
      logoHeight={64}
      gap={48}
      pauseOnHover
      fadeOut
      fadeOutColor="#111111"
      ariaLabel="Lo que gana tu negocio"
      className="es-tick"
    />
  );
}

/* ---------- Imán sutil para los CTA principales ---------- */
export function MagnetWrap({ children }: { children: ReactNode }) {
  return (
    <Magnet padding={70} magnetStrength={4} maxOffset={14} wrapperClassName="es-magnet">
      {children}
    </Magnet>
  );
}

/* ---------- Navegación en píldora (menú desplegable en celular) ---------- */
const NAV_VARS = {
  "--pn-surface": "#ffffff",
  "--pn-solid": "#ffffff",
  "--pn-edge": "rgba(17,17,17,.16)",
  "--pn-rim": "transparent",
  "--pn-shadow": "0 10px 30px -18px rgba(17,17,17,.45)",
  "--pn-text": "#4d4a45",
  "--pn-strong": "#111111",
  "--pn-pill": "#111111",
  "--pn-pill-ink": "#f3f1ec",
  "--pn-pill-shadow": "none",
  "--pn-dot": "#ff5a1f",
  "--pn-ring": "#111111",
  "--pn-row-hover": "rgba(17,17,17,.05)",
  "--pn-blur": "none",
  "--pn-tile": "#f3f1ec",
  "--pn-tile-rim": "inset 0 0 0 1px rgba(17,17,17,.12)",
} as CSSProperties;

export function EsNav({ items }: { items: { label: string; href: string }[] }) {
  const mobile = useMedia("(max-width: 760px)");
  // Indicador que sigue a la sección visible; ninguno activo en el hero.
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = items
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => !!el);
    let raf = 0;
    const spy = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      const hit = els.find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      });
      setActive(hit ? "#" + hit.id : "");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(spy);
    };
    spy();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <PillNav
      key={mobile ? "m" : "d"}
      items={items}
      activeHref={active}
      layout="joined"
      size="md"
      surface="solid"
      itemStyle="plain"
      hoverEffect="fill"
      indicator="dot"
      theme="light"
      collapse={mobile ? "always" : "never"}
      ariaLabel="Principal"
      className="es-pillnav"
      style={NAV_VARS}
    />
  );
}

/* ---------- Proceso apilado (escritorio) / lista (celular) ---------- */
export function StepStack({ children }: { children: ReactNode[] }) {
  const stack = useMedia("(min-width: 900px) and (min-height: 700px)");
  if (!stack) return <ol className="es-steps-list">{children.map((c, i) => <li key={i}>{c}</li>)}</ol>;
  return (
    <ScrollStack
      useWindowScroll
      smoothScroll={false}
      snap={false}
      stackPosition="112px"
      itemDistance={48}
      itemStackDistance={22}
      itemScale={0.035}
      baseScale={0.9}
      dimAmount={0.1}
      holdDistance={80}
      className="es-stack"
    >
      {children.map((c, i) => (
        <ScrollStackItem key={i} itemClassName="es-stack-card">
          {c}
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
