// Marcas con las que ha trabajado Ernesto.
// Para usar logos reales, agrega `logo: "/assets/marcas/archivo.png"` a cada marca
// y coloca los PNG en `public/assets/marcas/`. Si una marca no tiene `logo`,
// se muestra su nombre como texto.
type Brand = { name: string; logo?: string };

const brands: Brand[] = [
  { name: "Compramos Tu Casa" },
  { name: "What Now? Creative Studio" },
  { name: "Avante Textil" },
  { name: "Baby Creysi" },
  { name: "dogi-dogi" },
  { name: "Skiny" },
  { name: "Tops & Bottoms" },
  { name: "Action Gear" },
  { name: "Pochokino" },
];

export default function Brands() {
  // Se duplica la lista para lograr el bucle continuo sin saltos.
  const loop = [...brands, ...brands];

  return (
    <section className="brands" aria-label="Experiencia y marcas con las que he trabajado">
      <p className="brands-line wrap">
        <b>7+</b> años creando <b>sistemas visuales, campañas y contenido</b>{" "}
        para marcas en <b>retail, proptech, moda y consumo</b>{" "}
        <span className="brands-tag">— marcas con las que he trabajado</span>
      </p>
      <div className="marquee">
        <div className="track">
          {loop.map((b, i) => (
            <div className="logo" key={`${b.name}-${i}`} aria-hidden={i >= brands.length}>
              {b.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.logo} alt={b.name} />
              ) : (
                <span className="logo-text">{b.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
