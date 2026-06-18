"use client";

import { useEffect, useRef, useState } from "react";
import NeonBulb, { type NeonVariant } from "@/components/NeonBulb";
import Dust from "@/components/Dust";

const CYCLE: NeonVariant[] = ["arte", "story", "campanas"];

// Medios del hero por modo: imagen (póster) y, si existe, video animado.
const MEDIA: Record<NeonVariant, { img: string; video?: string }> = {
  arte: { img: "/assets/hero-arte-poster.jpg", video: "/assets/hero-arte.mp4" },
  story: {
    img: "/assets/hero-story-poster.jpg",
    video: "/assets/hero-story.mp4",
  },
  campanas: {
    img: "/assets/hero-campanas-poster.jpg",
    video: "/assets/hero-campanas.mp4",
  },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [icon, setIcon] = useState<NeonVariant>("arte");
  const [cycleKey, setCycleKey] = useState(0);
  const [allowVideo, setAllowVideo] = useState(false);
  // el layout de tarjeta vertical es solo para móvil
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:760px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // alterna automáticamente entre los chips cada 7s (se respeta reduce-motion)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setIcon((prev) => CYCLE[(CYCLE.indexOf(prev) + 1) % CYCLE.length]);
    }, 7000);
    return () => clearInterval(id);
  }, [cycleKey]);

  const pick = (v: NeonVariant) => {
    setIcon(v);
    setCycleKey((k) => k + 1);
  };

  // los videos se reproducen en desktop y móvil; solo se respeta reduce-motion
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion:reduce)");
    const update = () => setAllowVideo(!motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  const media = MEDIA[icon];
  const useVideo = allowVideo && !!media.video;

  // fuerza el autoplay en móvil: React no siempre aplica `muted` al DOM
  // (necesario para que iOS/Android reproduzcan sin tap) y algunos navegadores
  // requieren una llamada explícita a play()
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [useVideo, icon]);

  // parallax con el mouse (solo desktop)
  useEffect(() => {
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const hero = heroRef.current;
    if (!hero) return;
    const diffuser = hero.querySelector<HTMLElement>(".diffuser");
    const portrait = hero.querySelector<HTMLElement>(".portrait");
    const inner = hero.querySelector<HTMLElement>(".hero-inner");
    const poster = hero.querySelector<HTMLElement>(".poster");
    const sheen = hero.querySelector<HTMLElement>(".sheen");
    if (!diffuser || !portrait || !inner) return;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      active = false,
      raf: number | null = null;

    function onMove(e: MouseEvent) {
      const r = hero!.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      active = true;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function loop() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      diffuser!.style.transform =
        "translate(" + cx * 48 + "px," + cy * 30 + "px)";
      diffuser!.style.setProperty("--gx", 50 + cx * 26 + "%");
      portrait!.style.transform = "translate(" + cx * 22 + "px,0)";
      if (poster)
        poster.style.transform =
          "rotate(-1.2deg) rotateY(" + cx * -5 + "deg) rotateX(" + cy * 3 + "deg)";
      inner!.style.transform =
        "translate(" + cx * -14 + "px," + cy * -8 + "px)";
      if (sheen)
        sheen.style.backgroundPosition =
          50 + cx * 34 + "% " + (50 + cy * 20) + "%";
      if (active || Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }

    function onLeave() {
      tx = 0;
      ty = 0;
      active = false;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    hero.style.perspective = "1200px";

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  // ruleta de chips: centra el chip activo (solo móvil, dentro del video)
  const chipsTrackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isMobile) return;
    const center = () => {
      const track = chipsTrackRef.current;
      const container = track?.parentElement;
      const active = track?.querySelector<HTMLElement>(".chip.fill");
      if (!track || !container || !active) return;
      const offset =
        container.clientWidth / 2 - (active.offsetLeft + active.offsetWidth / 2);
      track.style.transform = `translateX(${offset}px)`;
    };
    center();
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
  }, [icon, isMobile]);

  const chipButtons = (
    <>
      <button
        type="button"
        className={`chip${icon === "arte" ? " fill" : ""}`}
        onClick={() => pick("arte")}
      >
        Dirección de arte
      </button>
      <button
        type="button"
        className={`chip${icon === "story" ? " fill" : ""}`}
        onClick={() => pick("story")}
      >
        Storytelling visual
      </button>
      <button
        type="button"
        className={`chip${icon === "campanas" ? " fill" : ""}`}
        onClick={() => pick("campanas")}
      >
        Campañas 360°
      </button>
    </>
  );

  const media_el = useVideo ? (
    <video
      key={media.video}
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={media.img}
      aria-hidden="true"
      onCanPlay={(e) => {
        const v = e.currentTarget;
        v.muted = true;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }}
    >
      <source src={media.video} type="video/mp4" />
    </video>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={media.img}
      src={media.img}
      alt="Ernesto Dorantes, Director Creativo"
    />
  );

  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="diffuser" aria-hidden="true" />
      <Dust />

      {isMobile ? (
        // ===== Móvil: tarjeta de video vertical =====
        <div className="hero-inner hero-inner-mobile">
          <div className="hero-video">
            {media_el}
            <span className="hero-tag">
              <span className="sq" />
              Portafolio 2026
            </span>
            <div className="hero-chips">
              <div className="role-row" ref={chipsTrackRef}>
                {chipButtons}
              </div>
            </div>
          </div>
          <h1 className="hero-name">
            <span className="hero-name-top">
              <span className="ln1">Ernesto</span>
              <NeonBulb variant={icon} />
            </span>
            <span className="ln2 accent">Dorantes</span>
          </h1>
          <div className="hero-bottom">
            <p className="sup">
              Diseño <b>campañas, marcas y experiencias visuales</b> que
              convierten ideas en <b>sistemas memorables</b>.
            </p>
          </div>
        </div>
      ) : (
        // ===== Desktop: layout original =====
        <>
          <div className="portrait">
            <div className="poster">
              {media_el}
              <span className="sheen" />
              <span className="tape tape-tl" />
              <span className="tape tape-br" />
            </div>
          </div>
          <div className="hero-inner">
            <span className="tag">
              <span className="sq" />
              Portafolio 2026
            </span>
            <div className="hero-lead">
              <NeonBulb variant={icon} />
              <p className="sup">
                Diseño <b>campañas, marcas y experiencias visuales</b> que
                convierten ideas en <b>sistemas memorables</b>.
              </p>
            </div>
            <h1>
              <span className="ln1">Ernesto</span>
              <span className="ln2 accent">Dorantes</span>
            </h1>
            <div className="role-row">{chipButtons}</div>
          </div>
        </>
      )}
      <span className="scroll-cue" aria-hidden="true">
        <span />
      </span>
    </header>
  );
}
