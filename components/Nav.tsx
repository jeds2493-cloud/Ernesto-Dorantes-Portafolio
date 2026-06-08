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
        href="mailto:jeds2493@gmail.com?subject=Proyecto%20—%20quiero%20trabajar%20contigo"
        aria-label="Disponible para proyectos — enviar correo"
      >
        <span className="led" />
        Disponible para proyectos
      </a>
    </nav>
  );
}
