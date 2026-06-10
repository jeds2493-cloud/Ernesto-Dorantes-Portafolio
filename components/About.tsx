import TubeMan from "@/components/TubeMan";
import Skills from "@/components/Skills";
import LavaBg from "@/components/LavaBg";

export default function About() {
  return (
    <section className="about" id="sobre">
      <LavaBg />
      <div className="wrap">
        <TubeMan />
        <div className="eyebrow reveal">Sobre mí</div>
        <p className="lead reveal">
          Creo <span className="o">narrativas visuales</span> que hacen a las
          marcas ser inolvidables.
        </p>
        <Skills />
      </div>
    </section>
  );
}
