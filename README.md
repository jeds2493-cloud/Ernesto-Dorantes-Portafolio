# Portafolio — Ernesto Dorantes

Sitio web de portafolio personal de **Ernesto Dorantes**, Director Creativo con más de 7 años de experiencia en dirección de arte, UI/UX, branding e IA aplicada al diseño.

Construido con **Next.js (App Router)** y **TypeScript**. Una sola página con modo oscuro, tipografía editorial (Sora + Inter vía `next/font`), efecto de parallax con el mouse en el hero y animaciones de entrada con IntersectionObserver.

## Estructura

```
.
├── app/
│   ├── layout.tsx          # Layout raíz, fuentes y metadatos
│   ├── page.tsx            # Composición de la página
│   └── globals.css        # Estilos globales
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx           # Client component (parallax del mouse)
│   ├── Metrics.tsx
│   ├── About.tsx
│   ├── Work.tsx           # Casos de trabajo (datos + markup)
│   ├── Experience.tsx
│   ├── Contact.tsx
│   └── ScrollReveal.tsx   # Client component (animaciones .reveal)
├── public/
│   └── assets/
│       └── ernesto-poster.jpg   # Retrato del hero
├── legacy/                # Versión estática original (referencia)
│   ├── index.html
│   └── ernesto-poster.jpg
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Producción

```bash
npm run build
npm start
```

## Personalización

- **Casos de trabajo:** las imágenes de los proyectos (Poison, Lancelot, Compramos Tu Casa, dogi-dogi) son temporales (Unsplash). Reemplázalas por las piezas reales del portafolio en `components/Work.tsx`.
- **Colores y tipografía:** se definen como variables CSS al inicio de `app/globals.css`.

## Despliegue

El proyecto se despliega sin configuración en **Vercel** (`vercel`), o como sitio estático con `next build`.

## Contacto

- Correo: jeds2493@gmail.com
- LinkedIn: [ernestodorantes2493](https://linkedin.com/in/ernestodorantes2493)
- Ubicación: Toluca de Lerdo, México
