import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import About from "@/components/About";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import LavaBg from "@/components/LavaBg";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Brands />
      {/* Fondo cálido continuo desde Sobre mí hasta Carrera (sin costuras) */}
      <div className="ambient">
        <About />
        <div className="work-exp">
          <LavaBg />
          <Work />
          <Process />
          <Experience />
        </div>
      </div>
      <Contact />
      <ScrollReveal />
    </>
  );
}
