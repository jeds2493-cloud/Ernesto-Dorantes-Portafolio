/**
 * Letrero de neón naranja para el hero.
 * Cambia de ícono según el chip activo:
 *   "arte"     → foco (idea)
 *   "story"    → palomitas de maíz
 *   "campanas" → billboard / letrero
 * 100% SVG + glow CSS. Decorativo; se oculta en pantallas chicas.
 */
export type NeonVariant = "arte" | "story" | "campanas";

export default function NeonBulb({
  variant = "arte",
}: {
  variant?: NeonVariant;
}) {
  return (
    <div className="neon-bulb" aria-hidden="true">
      <svg viewBox="0 0 120 168" fill="none" key={variant}>
        {variant === "arte" && (
          <g>
            <path
              className="nb-glass"
              d="M60 16 C34 16 16 36 16 61 C16 80 28 94 40 105 C46 111 47 116 47 124 L73 124 C73 116 74 111 80 105 C92 94 104 80 104 61 C104 36 86 16 60 16 Z"
            />
            <path d="M46 131 C52 135 68 135 74 131" />
            <path d="M47 140 C53 144 67 144 73 140" />
            <path d="M49 149 C54 153 66 153 71 149" />
            <path d="M53 158 H67" />
            <path d="M50 100 C50 84 50 75 50 70" />
            <path d="M70 100 C70 84 70 75 70 70" />
            <path d="M45 69 C46 59 51 56 55 63 C57 52 63 52 65 63 C69 56 74 59 75 69" />
          </g>
        )}

        {variant === "story" && (
          <g>
            {/* caja */}
            <path d="M20 84 L100 84 L82 159 L38 159 Z" />
            <path d="M44 85 L50 158" />
            <path d="M60 85 L60 158" />
            <path d="M76 85 L70 158" />
            {/* palomitas */}
            <circle cx="34" cy="69" r="9" />
            <circle cx="52" cy="55" r="10" />
            <circle cx="69" cy="60" r="10" />
            <circle cx="86" cy="69" r="9" />
            <circle cx="96" cy="77" r="7" />
            <circle cx="24" cy="77" r="7" />
            <circle cx="60" cy="74" r="8" />
            <circle cx="44" cy="77" r="7" />
          </g>
        )}

        {variant === "campanas" && (
          <g>
            {/* panel del billboard (vacío) */}
            <path d="M18 40 H102 V104 H18 Z" />
            {/* reflectores */}
            <path d="M35 40 V32" />
            <circle cx="35" cy="28" r="3" />
            <path d="M60 40 V30" />
            <circle cx="60" cy="26" r="3" />
            <path d="M85 40 V32" />
            <circle cx="85" cy="28" r="3" />
            {/* patas */}
            <path d="M42 104 V134" />
            <path d="M78 104 V134" />
            {/* refuerzo en cruz */}
            <path d="M42 114 L78 126" />
            <path d="M78 114 L42 126" />
            {/* pies */}
            <path d="M35 134 H49" />
            <path d="M71 134 H85" />
          </g>
        )}
      </svg>
    </div>
  );
}
