import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import LavaBg from "@/components/LavaBg";
import GyroEnabler from "@/components/GyroEnabler";

export default function Home() {
  return (
    <>
      <GyroEnabler />
      <Nav />
      <Hero />
      <Brands />
      <About />
      {/* Trabajo + Experiencia comparten un fondo continuo con una sola lava */}
      <div className="work-exp">
        <LavaBg />
        <Work />
        <Experience />
      </div>
      <Contact />
      <ScrollReveal />
    </>
  );
}
