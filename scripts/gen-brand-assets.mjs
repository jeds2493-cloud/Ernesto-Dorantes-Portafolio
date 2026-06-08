import sharp from "sharp";

const ACCENT = "#ff601c";
const BG = "#0a0a0b";

// --- Open Graph / Twitter image: 1200x630 ---
const og = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="78%" cy="22%" r="70%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.55"/>
      <stop offset="42%" stop-color="${ACCENT}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="90" y="232" fill="${ACCENT}" font-size="26" font-weight="700" letter-spacing="6">PORTAFOLIO 2026</text>
    <text x="86" y="356" fill="#ffffff" font-size="118" font-weight="800" letter-spacing="-3">Ernesto</text>
    <text x="86" y="476" fill="${ACCENT}" font-size="118" font-weight="800" letter-spacing="-3">Dorantes</text>
    <text x="90" y="556" fill="#cfcfd4" font-size="30" font-weight="500">Director Creativo · Dirección de arte · IA aplicada al diseño</text>
  </g>
  <rect x="90" y="180" width="46" height="6" rx="3" fill="${ACCENT}"/>
</svg>`;

// --- Favicon / app icon: 512x512 monogram ---
const icon = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff7a3c"/>
      <stop offset="100%" stop-color="#e8470a"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-size="300" font-weight="800"
        fill="#0a0a0b">E</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile("app/opengraph-image.png");
await sharp(Buffer.from(og)).png().toFile("app/twitter-image.png");
await sharp(Buffer.from(icon)).resize(512, 512).png().toFile("app/icon.png");
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile("app/apple-icon.png");

console.log("brand assets generated");
