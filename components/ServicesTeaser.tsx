const items: [string, string, string][] = [
  ["01", "Branding e Identidad", "Estrategia, identidad visual y sistema de marca."],
  ["02", "Campañas y Dirección de Arte", "Conceptos y campañas 360° en todos los formatos."],
  ["03", "Producto y Experiencias Digitales", "Webs, landing pages e interfaces que convierten."],
  ["04", "Creative Partner", "Tu director creativo externo, de forma continua."],
];

export default function ServicesTeaser() {
  return (
    <section className="svc-teaser" id="servicios-home">
      <div className="wrap">
        <div className="svc-teaser-head">
          <div className="eyebrow reveal">Servicios</div>
          <h2 className="svc-teaser-title reveal">
            Soluciones creativas que <span className="o">venden</span>.
          </h2>
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
