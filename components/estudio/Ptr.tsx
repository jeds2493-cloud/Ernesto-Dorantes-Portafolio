// Puntero con etiqueta: el lenguaje visual de todo el home. Cada oficio tiene
// su color; el verde es Ernesto y el hueso es el cliente.

export type Craft = "arte" | "copy" | "seo" | "datos" | "yo" | "tu";

export const CRAFT_LABEL: Record<Craft, string> = {
  arte: "Dirección de arte",
  copy: "Creativo",
  seo: "SEO",
  datos: "Datos",
  yo: "Ernesto",
  tu: "Tú",
};

// Flecha clásica de cursor, con cola: la punta queda en (2.5, 2).
const ARROW = "M2.5 2v15.2l3.9-3.7 2.6 6.1 2.9-1.2-2.5-6h5.5L2.5 2Z";

export function PtrIcon({ className = "fx-ptr" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 22" aria-hidden="true">
      {/* sombra propia (más barata que un filtro) y la flecha con su cola */}
      <path className="p-sh" d={ARROW} transform="translate(0.8 1.5)" />
      <path className="p-fg" d={ARROW} />
    </svg>
  );
}

export function Ptr({
  c,
  label,
  flip = false,
  className = "",
}: {
  c: Craft;
  /** Texto de la etiqueta; por defecto, el nombre del oficio. `false` = sin etiqueta. */
  label?: string | false;
  /** Etiqueta hacia la izquierda del puntero. */
  flip?: boolean;
  className?: string;
}) {
  const text = label === false ? null : label ?? CRAFT_LABEL[c];
  return (
    <span className={`fx-cur sf-c-${c}${flip ? " fx-cur--l" : ""}${className ? " " + className : ""}`} aria-hidden="true">
      {/* fuera se mueve en X y dentro en Y: con ritmos distintos, la
          trayectoria sale curva, como una mano y no como una regla */}
      <span className="fx-cur-in">
        <PtrIcon />
        {text && <b className="fx-tag">{text}</b>}
      </span>
    </span>
  );
}
