import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("design");
const OUT = path.resolve("tmp-extract");

const SHEETS = [
  "suporte_elementos_header.png",
  "suporte_elementos_historia.png",
  "suporte_elementos_confirmacao.png",
  "suporte_elementos_recadinho.png",
  "suporte_elementos_fotos.png",
  "suporte_elementos_localizacao.png",
  "suporte_elementos_extras.png",
];

const ALPHA = 18;
const DILATE = 3;
const MIN_AREA = 280;
const PADDING = 10;

function dilate(mask, width, height, radius) {
  const tmp = new Uint8Array(mask.length);
  const out = new Uint8Array(mask.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (!mask[i]) continue;
      const x0 = Math.max(0, x - radius);
      const x1 = Math.min(width - 1, x + radius);
      for (let xx = x0; xx <= x1; xx++) tmp[y * width + xx] = 1;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (!tmp[i]) continue;
      const y0 = Math.max(0, y - radius);
      const y1 = Math.min(height - 1, y + radius);
      for (let yy = y0; yy <= y1; yy++) out[yy * width + x] = 1;
    }
  }

  return out;
}

function find(parent, i) {
  while (parent[i] !== i) {
    parent[i] = parent[parent[i]];
    i = parent[i];
  }
  return i;
}

function components(mask, width, height) {
  const n = width * height;
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;

  const unite = (a, b) => {
    const pa = find(parent, a);
    const pb = find(parent, b);
    if (pa !== pb) parent[pb] = pa;
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (!mask[i]) continue;
      if (x + 1 < width && mask[i + 1]) unite(i, i + 1);
      if (y + 1 < height && mask[i + width]) unite(i, i + width);
      if (x + 1 < width && y + 1 < height && mask[i + width + 1]) {
        unite(i, i + width + 1);
      }
      if (x > 0 && y + 1 < height && mask[i + width - 1]) {
        unite(i, i + width - 1);
      }
    }
  }

  const boxes = new Map();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (!mask[i]) continue;
      const root = find(parent, i);
      let box = boxes.get(root);
      if (!box) {
        box = { minX: x, minY: y, maxX: x, maxY: y, area: 0 };
        boxes.set(root, box);
      }
      box.area += 1;
      box.minX = Math.min(box.minX, x);
      box.minY = Math.min(box.minY, y);
      box.maxX = Math.max(box.maxX, x);
      box.maxY = Math.max(box.maxY, y);
    }
  }

  return [...boxes.values()]
    .filter((b) => b.area >= MIN_AREA)
    .sort((a, b) => a.minY - b.minY || a.minX - b.minX);
}

async function extractSheet(file) {
  const input = path.join(ROOT, file);
  const image = sharp(input);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const mask = new Uint8Array(width * height);
  for (let i = 0; i < mask.length; i++) {
    mask[i] = data[i * 4 + 3] > ALPHA ? 1 : 0;
  }

  const dilated = dilate(mask, width, height, DILATE);
  const boxes = components(dilated, width, height);

  const sheetName = file.replace(".png", "");
  const dir = path.join(OUT, sheetName);
  await mkdir(dir, { recursive: true });

  const manifest = [];
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    const left = Math.max(0, box.minX - PADDING);
    const top = Math.max(0, box.minY - PADDING);
    const right = Math.min(width, box.maxX + 1 + PADDING);
    const bottom = Math.min(height, box.maxY + 1 + PADDING);
    const extract = {
      left,
      top,
      width: right - left,
      height: bottom - top,
    };

    const dest = path.join(dir, `${String(i).padStart(2, "0")}.webp`);
    await sharp(input)
      .extract(extract)
      .webp({ quality: 88, alphaQuality: 90, effort: 4 })
      .toFile(dest);

    manifest.push({
      index: i,
      file: path.basename(dest),
      ...extract,
      area: box.area,
    });
  }

  await writeFile(
    path.join(dir, "manifest.json"),
    JSON.stringify({ sheet: file, width, height, count: manifest.length, items: manifest }, null, 2),
  );

  return { file, count: manifest.length };
}

const results = [];
for (const sheet of SHEETS) {
  results.push(await extractSheet(sheet));
  console.log(`extracted ${results.at(-1).count} from ${sheet}`);
}

await writeFile(path.join(OUT, "summary.json"), JSON.stringify(results, null, 2));
console.log("done", OUT);
