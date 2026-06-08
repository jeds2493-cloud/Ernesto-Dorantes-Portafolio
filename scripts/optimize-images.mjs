import sharp from "sharp";
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";

const CASOS = "public/assets/casos";
const ROOT = "public/assets";
const MAXW = 1600;
const Q = 82;

const toJpgNames = new Set(["compramos6.png", "compramos8.png"]);

function fmt(b) {
  return (b / 1024).toFixed(0) + " KB";
}

async function optimizeJpg(file) {
  const before = (await stat(file)).size;
  const tmp = file + ".tmp";
  await sharp(file)
    .rotate()
    .resize({ width: MAXW, withoutEnlargement: true })
    .jpeg({ quality: Q, mozjpeg: true })
    .toFile(tmp);
  await rename(tmp, file);
  const after = (await stat(file)).size;
  console.log(`jpg  ${path.basename(file)}  ${fmt(before)} -> ${fmt(after)}`);
}

async function optimizePng(file) {
  const before = (await stat(file)).size;
  const tmp = file + ".tmp";
  await sharp(file)
    .resize({ width: 1400, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 80, palette: true })
    .toFile(tmp);
  await rename(tmp, file);
  const after = (await stat(file)).size;
  console.log(`png  ${path.basename(file)}  ${fmt(before)} -> ${fmt(after)}`);
}

async function pngToJpg(file) {
  const before = (await stat(file)).size;
  const out = file.replace(/\.png$/i, ".jpg");
  await sharp(file)
    .resize({ width: MAXW, withoutEnlargement: true })
    .flatten({ background: "#000000" })
    .jpeg({ quality: Q, mozjpeg: true })
    .toFile(out);
  await unlink(file);
  const after = (await stat(out)).size;
  console.log(`png>jpg ${path.basename(file)} -> ${path.basename(out)}  ${fmt(before)} -> ${fmt(after)}`);
}

async function run() {
  const casos = await readdir(CASOS);
  for (const name of casos) {
    const file = path.join(CASOS, name);
    if (toJpgNames.has(name)) await pngToJpg(file);
    else if (/\.png$/i.test(name)) await optimizePng(file);
    else if (/\.jpe?g$/i.test(name)) await optimizeJpg(file);
  }
  for (const name of ["ernesto-poster.jpg", "ernesto-noir.jpg", "ernesto-billboard.jpg"]) {
    await optimizeJpg(path.join(ROOT, name));
  }
  console.log("done");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
