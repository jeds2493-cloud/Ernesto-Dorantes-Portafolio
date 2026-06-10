const jobs = [
  {
    yr: "2024 — 2026",
    title: "Lead Content, Graphics & Product Designer",
    org: "Compramos Tu Casa.mx",
    place: "Lomas Verdes, México",
  },
  {
    yr: "2020 — 2024",
    title: "Director de Arte / Coord. de Publicidad y Contenidos",
    org: "What Now? Creative Studio",
    place: "Toluca de Lerdo, México",
  },
  {
    yr: "2018 — 2020",
    title: "Coordinador de Publicidad",
    org: "Avante Textil",
    place: "Toluca de Lerdo, México",
  },
  {
    yr: "2016 — 2018",
    title: "Coordinador de Marketing",
    org: "Baby Creysi",
    place: "Toluca de Lerdo, México",
  },
];

export default function Experience() {
  return (
    <section className="exp" id="experiencia">
      <div className="wrap">
        <div className="eyebrow reveal">Carrera profesional</div>
        <div className="timeline reveal">
          {jobs.map((j) => (
            <div className="job" key={j.yr}>
              <div className="yr">{j.yr}</div>
              <div>
                <div className="title">{j.title}</div>
                <div className="org">{j.org}</div>
              </div>
              <div className="place">{j.place}</div>
            </div>
          ))}
        </div>
        <p className="edu reveal">
          <b>Educación.</b> Licenciatura en Mercadotecnia — Universidad de
          Ixtlahuaca CUI · 2012—2016
        </p>
      </div>
    </section>
  );
}
