import TubeMan from "@/components/TubeMan";
import Skills from "@/components/Skills";

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="wrap">
        <TubeMan />
        <div className="eyebrow reveal">Sobre mí</div>
        <h2 className="lead reveal">
          Creo <span className="o">narrativas visuales</span> que hacen a las
          marcas ser <em>inolvidables</em>.
        </h2>
        <Skills />
      </div>
    </section>
  );
}
