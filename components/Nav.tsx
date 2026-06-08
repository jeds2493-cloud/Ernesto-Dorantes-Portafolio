export default function Nav() {
  return (
    <nav>
      <a href="#top" className="brand">
        Ernesto Dorantes
      </a>
      <div className="links">
        <a href="#sobre">Sobre mí</a>
        <a href="#trabajo">Trabajo</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#contacto">Contacto</a>
      </div>
      <a
        className="avail"
        href="https://www.linkedin.com/in/ernestodorantes2493"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Disponible para proyectos — ver LinkedIn"
      >
        <span className="led" />
        Disponible para proyectos
      </a>
    </nav>
  );
}
