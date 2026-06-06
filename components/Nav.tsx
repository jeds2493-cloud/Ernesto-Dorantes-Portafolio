export default function Nav() {
  return (
    <nav>
      <a href="#top" className="brand">
        <span className="dot" />
        Ernesto Dorantes
      </a>
      <div className="links">
        <a href="#sobre">Sobre mí</a>
        <a href="#trabajo">Trabajo</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#contacto">Contacto</a>
      </div>
      <div className="avail">
        <span className="led" />
        Disponible para proyectos
      </div>
    </nav>
  );
}
