const items: [string, string, string][] = [
  ["01", "Branding e Identidad", "Estrategia e identidad visual de marca."],
  ["02", "Dirección de Arte", "Conceptos y campañas 360°."],
  ["03", "Performance Creative", "Creatividades diseñadas para convertir."],
  ["04", "Producto Digital", "UX/UI, sistemas de diseño y landing pages."],
  ["05", "Producción con IA", "Más contenido, en menos tiempo."],
  ["06", "Creative Partner", "Tu director creativo externo."],
];

export default function ServicesTeaser() {
  return (
    <section className="svc-teaser" id="servicios-home">
      <div className="wrap">
        <div className="svc-teaser-head">
          <div>
            <div className="eyebrow reveal">Servicios</div>
            <h2 className="svc-teaser-title reveal">
              Soluciones creativas que{" "}
              <span className="o">venden</span>.
            </h2>
          </div>
          <a className="svc-teaser-cta reveal" href="/servicios">
            <span className="led" />
            Trabajemos juntos
          </a>
        </div>

        <div className="svc-teaser-grid reveal">
          {items.map(([n, title, tag]) => (
            <a key={n} href="/servicios" className="svc-teaser-item">
              <span className="n">{n}</span>
              <h3>{title}</h3>
              <p>{tag}</p>
              <span className="svc-teaser-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
