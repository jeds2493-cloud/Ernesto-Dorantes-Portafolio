const metrics = [
  { num: "7+", lab: "Años de experiencia creativa" },
  { num: "+5", lab: "Grandes historias para marcas" },
  { num: "360°", lab: "Arte publicitario para campañas ATL, BTL y digital" },
];

export default function Metrics() {
  return (
    <section className="metrics">
      <div className="grid">
        {metrics.map((m) => (
          <div className="metric" key={m.lab}>
            <div className="num">{m.num}</div>
            <div className="lab">{m.lab}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
