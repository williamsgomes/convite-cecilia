import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DESIGN = path.resolve("design");
const EXPORTS = path.resolve("novas_exportacoes");
const PUBLIC = path.resolve("public/images");

function find(parent, i) {
  while (parent[i] !== i) {
    parent[i] = parent[parent[i]];
    i = parent[i];
  }
  return i;
}

function keepLargest(data, width, height, alphaMin = 16) {
  const n = width * height;
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;

  const unite = (a, b) => {
    const pa = find(parent, a);
    const pb = find(parent, b);
    if (pa !== pb) parent[pb] = pa;
  };

  const opaque = (i) => data[i * 4 + 3] > alphaMin;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (!opaque(i)) continue;
      if (x + 1 < width && opaque(i + 1)) unite(i, i + 1);
      if (y + 1 < height && opaque(i + width)) unite(i, i + width);
    }
  }

  const sizes = new Map();
  for (let i = 0; i < n; i++) {
    if (!opaque(i)) continue;
    const root = find(parent, i);
    sizes.set(root, (sizes.get(root) ?? 0) + 1);
  }

  let best = -1;
  let bestSize = 0;
  for (const [root, size] of sizes) {
    if (size > bestSize) {
      best = root;
      bestSize = size;
    }
  }

  const out = Buffer.from(data);
  for (let i = 0; i < n; i++) {
    if (!opaque(i) || find(parent, i) !== best) {
      out[i * 4 + 3] = 0;
    }
  }
  return out;
}

async function publish({
  src,
  box,
  dest,
  maxWidth,
  quality = 86,
  isolate = true,
}) {
  const input = path.join(DESIGN, src);
  const meta = await sharp(input).metadata();
  const extract = {
    left: Math.max(0, box.left),
    top: Math.max(0, box.top),
    width: Math.min(box.width, meta.width - box.left),
    height: Math.min(box.height, meta.height - box.top),
  };

  const raw = await sharp(input)
    .extract(extract)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = isolate
    ? keepLargest(raw.data, raw.info.width, raw.info.height)
    : raw.data;

  const trimmed = await sharp(pixels, {
    raw: {
      width: raw.info.width,
      height: raw.info.height,
      channels: 4,
    },
  })
    .trim({ threshold: 6 })
    .png()
    .toBuffer();

  let pipeline = sharp(trimmed);
  const trimmedMeta = await pipeline.metadata();
  if (maxWidth && trimmedMeta.width && trimmedMeta.width > maxWidth) {
    pipeline = sharp(trimmed).resize({
      width: maxWidth,
      withoutEnlargement: true,
    });
  }

  await mkdir(path.dirname(dest), { recursive: true });
  const info = await pipeline
    .webp({ quality, alphaQuality: 92, effort: 5 })
    .toFile(dest);

  console.log(
    `${path.relative(PUBLIC, dest)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  );
}

async function publishFlatSource({ src, dest, maxWidth, quality = 86 }) {
  await mkdir(path.dirname(dest), { recursive: true });
  const meta = await sharp(src).rotate().metadata();
  let pipeline = sharp(src).rotate();
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({
      width: maxWidth,
      withoutEnlargement: true,
    });
  }

  const info = await pipeline.webp({ quality, effort: 6 }).toFile(dest);

  console.log(
    `${path.relative(PUBLIC, dest)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  );

  return info;
}

async function publishJpegSource({ src, dest, maxWidth, quality = 88 }) {
  await mkdir(path.dirname(dest), { recursive: true });
  const meta = await sharp(src).rotate().metadata();
  let pipeline = sharp(src).rotate().flatten({ background: "#fdf7f2" });
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({
      width: maxWidth,
      withoutEnlargement: true,
    });
  }

  const info = await pipeline.jpeg({ quality, mozjpeg: true }).toFile(dest);

  console.log(
    `${path.relative(PUBLIC, dest)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  );

  return info;
}

async function publishOpeningPlaque({ src, dest, box, maxWidth, quality = 88 }) {
  const raw = await sharp(src)
    .extract(box)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = raw.info;
  const pixels = Buffer.from(raw.data);

  for (let i = 0; i < width * height; i += 1) {
    const offset = i * 4;
    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];
    const a = pixels[offset + 3];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    if (max < 28 && max - min < 12) {
      pixels[offset + 3] = 0;
    } else if (max < 42 && max - min < 14) {
      pixels[offset + 3] = Math.min(a, Math.round(((max - 28) / 14) * a));
    }
  }

  const trimmed = await sharp(pixels, {
    raw: { width, height, channels: 4 },
  })
    .trim({ threshold: 8 })
    .png()
    .toBuffer();

  let pipeline = sharp(trimmed);
  const meta = await pipeline.metadata();
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = sharp(trimmed).resize({
      width: maxWidth,
      withoutEnlargement: true,
    });
  }

  await mkdir(path.dirname(dest), { recursive: true });
  const info = await pipeline
    .webp({ quality, alphaQuality: 95, effort: 6 })
    .toFile(dest);

  console.log(
    `${path.relative(PUBLIC, dest)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  );
}

async function publishSource({ src, dest, maxWidth, quality = 86 }) {
  await mkdir(path.dirname(dest), { recursive: true });
  const trimmed = await sharp(src)
    .ensureAlpha()
    .trim({ threshold: 4 })
    .png()
    .toBuffer();

  let pipeline = sharp(trimmed);
  const meta = await pipeline.metadata();
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = sharp(trimmed).resize({
      width: maxWidth,
      withoutEnlargement: true,
    });
  }

  const info = await pipeline
    .webp({ quality, alphaQuality: 95, effort: 6 })
    .toFile(dest);

  console.log(
    `${path.relative(PUBLIC, dest)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  );
}

await publishSource({
  src: path.join(EXPORTS, "cecilia-baby.png"),
  dest: path.join(PUBLIC, "baby/cecilia-baby.webp"),
  maxWidth: 720,
  quality: 90,
});

await publishSource({
  src: path.join(EXPORTS, "nuvem-1ano.png"),
  dest: path.join(PUBLIC, "decorations/nuvem-1ano.webp"),
  maxWidth: 900,
  quality: 88,
});

await publishFlatSource({
  src: path.join(EXPORTS, "header-pronto.png"),
  dest: path.join(PUBLIC, "backgrounds/header-pronto.webp"),
  maxWidth: 900,
  quality: 85,
});

await publishSource({
  src: path.join(EXPORTS, "bee.png"),
  dest: path.join(PUBLIC, "decorations/bee.webp"),
  maxWidth: 200,
  quality: 90,
});

await publishSource({
  src: path.join(EXPORTS, "balao.png"),
  dest: path.join(PUBLIC, "decorations/balao.webp"),
  maxWidth: 220,
  quality: 90,
});

await publishSource({
  src: path.join(EXPORTS, "topo-contador.png"),
  dest: path.join(PUBLIC, "countdown/topo-contador.webp"),
  maxWidth: 560,
  quality: 90,
});

await publishSource({
  src: path.join(EXPORTS, "placa-confirmacao.png"),
  dest: path.join(PUBLIC, "rsvp/placa-confirmacao.webp"),
  maxWidth: 560,
  quality: 90,
});

const jobs = [
  {
    src: "suporte_elementos_header.png",
    box: { left: 0, top: 490, width: 372, height: 402 },
    dest: path.join(PUBLIC, "animals/cow-sitting.webp"),
    maxWidth: 720,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 293, top: 29, width: 251, height: 275 },
    dest: path.join(PUBLIC, "animals/sheep-sitting.webp"),
    maxWidth: 640,
  },
  {
    src: "suporte_elementos_confirmacao.png",
    box: { left: 0, top: 277, width: 348, height: 580 },
    dest: path.join(PUBLIC, "animals/cow-peeking.webp"),
    maxWidth: 720,
  },
  {
    src: "suporte_elementos_confirmacao.png",
    box: { left: 910, top: 271, width: 319, height: 588 },
    dest: path.join(PUBLIC, "animals/sheep-peeking.webp"),
    maxWidth: 720,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 527, top: 7, width: 260, height: 290 },
    dest: path.join(PUBLIC, "animals/pig.webp"),
    maxWidth: 640,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 773, top: 0, width: 291, height: 306 },
    dest: path.join(PUBLIC, "animals/pony.webp"),
    maxWidth: 640,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 1048, top: 20, width: 202, height: 280 },
    dest: path.join(PUBLIC, "animals/chick.webp"),
    maxWidth: 560,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 1273, top: 3, width: 233, height: 295 },
    dest: path.join(PUBLIC, "animals/duck.webp"),
    maxWidth: 560,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 8, top: 288, width: 280, height: 268 },
    dest: path.join(PUBLIC, "animals/bunny.webp"),
    maxWidth: 560,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 200, top: 294, width: 244, height: 258 },
    dest: path.join(PUBLIC, "animals/puppy.webp"),
    maxWidth: 560,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 428, top: 282, width: 268, height: 248 },
    dest: path.join(PUBLIC, "animals/rooster.webp"),
    maxWidth: 560,
  },
  {
    src: "suporte_elementos_header.png",
    box: { left: 826, top: 448, width: 520, height: 420 },
    dest: path.join(PUBLIC, "farm/barn.webp"),
    maxWidth: 900,
  },
  {
    src: "suporte_elementos_header.png",
    box: { left: 1224, top: 0, width: 300, height: 382 },
    dest: path.join(PUBLIC, "farm/sign-convidado.webp"),
    maxWidth: 560,
  },
  {
    src: "suporte_elementos_confirmacao.png",
    box: { left: 296, top: 0, width: 636, height: 284 },
    dest: path.join(PUBLIC, "farm/plaque-heart.webp"),
    maxWidth: 900,
  },
  {
    src: "suporte_elementos_confirmacao.png",
    box: { left: 0, top: 960, width: 1229, height: 320 },
    dest: path.join(PUBLIC, "farm/fence-gate.webp"),
    maxWidth: 1400,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 1190, top: 430, width: 330, height: 500 },
    dest: path.join(PUBLIC, "farm/tree.webp"),
    maxWidth: 800,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 430, top: 530, width: 255, height: 230 },
    dest: path.join(PUBLIC, "farm/swing.webp"),
    maxWidth: 560,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 0, top: 740, width: 210, height: 192 },
    dest: path.join(PUBLIC, "farm/hay.webp"),
    maxWidth: 560,
  },
  {
    src: "suporte_elementos_header.png",
    box: { left: 10, top: 861, width: 463, height: 163 },
    dest: path.join(PUBLIC, "flowers/strip.webp"),
    maxWidth: 900,
  },
  {
    src: "suporte_elementos_header.png",
    box: { left: 689, top: 869, width: 417, height: 155 },
    dest: path.join(PUBLIC, "flowers/cluster.webp"),
    maxWidth: 800,
  },
  {
    src: "suporte_elementos_header.png",
    box: { left: 1369, top: 371, width: 143, height: 149 },
    dest: path.join(PUBLIC, "decorations/butterfly.webp"),
    maxWidth: 280,
  },
  {
    src: "suporte_elementos_confirmacao.png",
    box: { left: 76, top: 28, width: 187, height: 183 },
    dest: path.join(PUBLIC, "decorations/butterfly-spot.webp"),
    maxWidth: 280,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 860, top: 393, width: 99, height: 92 },
    dest: path.join(PUBLIC, "decorations/heart.webp"),
    maxWidth: 200,
  },
  {
    src: "suporte_elementos_header.png",
    box: { left: 1101, top: 884, width: 433, height: 132 },
    dest: path.join(PUBLIC, "decorations/ribbon-gingham.webp"),
    maxWidth: 900,
  },
  {
    src: "suporte_elementos_extras.png",
    box: { left: 1081, top: 286, width: 154, height: 130 },
    dest: path.join(PUBLIC, "decorations/bow-gingham.webp"),
    maxWidth: 320,
  },
];

for (const job of jobs) {
  await publish(job);
}

const fundoSrc = path.join(DESIGN, "fundo_header_se_preciso.png");
const fundoDest = path.join(PUBLIC, "backgrounds/hero.webp");
await mkdir(path.dirname(fundoDest), { recursive: true });
const fundoInfo = await sharp(fundoSrc)
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 74, effort: 5 })
  .toFile(fundoDest);
console.log(
  `backgrounds/hero.webp  ${fundoInfo.width}×${fundoInfo.height}  ${(fundoInfo.size / 1024).toFixed(0)}KB`,
);

for (let month = 0; month <= 12; month += 1) {
  await publishFlatSource({
    src: path.join(EXPORTS, "fotos-linha-do-tempo", `cecilia-${month}.jpeg`),
    dest: path.join(PUBLIC, "timeline", `cecilia-${month}.webp`),
    maxWidth: 1200,
    quality: 86,
  });
}

function gallerySortKey(name) {
  const numbered = name.match(/^galeria-(\d+)\.(jpe?g)$/i);
  if (numbered) {
    return [0, Number(numbered[1]), name];
  }

  if (/^galeria-+/i.test(name)) {
    return [1, name.length, name];
  }

  return [2, 0, name];
}

function compareGalleryFiles(left, right) {
  const a = gallerySortKey(left);
  const b = gallerySortKey(right);
  if (a[0] !== b[0]) return a[0] - b[0];
  if (a[1] !== b[1]) return a[1] - b[1];
  return String(a[2]).localeCompare(String(b[2]), "en");
}

const extraGalleryDir = path.join(EXPORTS, "mais-fotos");
const extraGalleryFiles = (await readdir(extraGalleryDir))
  .filter((name) => /\.(jpe?g)$/i.test(name))
  .sort(compareGalleryFiles);

for (const [index, fileName] of extraGalleryFiles.entries()) {
  const destName = `gallery-${String(index + 1).padStart(2, "0")}.webp`;
  await publishFlatSource({
    src: path.join(extraGalleryDir, fileName),
    dest: path.join(PUBLIC, "gallery", destName),
    maxWidth: 1200,
    quality: 86,
  });
}

await publishJpegSource({
  src: path.join(EXPORTS, "compartilhamento.png"),
  dest: path.join(PUBLIC, "share", "compartilhamento.jpg"),
  maxWidth: 1200,
  quality: 88,
});

await publishOpeningPlaque({
  src: path.join(EXPORTS, "elementos-abertura.png"),
  dest: path.join(PUBLIC, "opening", "plaque.webp"),
  box: { left: 0, top: 240, width: 853, height: 1070 },
  maxWidth: 720,
  quality: 88,
});

await publishFlatSource({
  src: path.join(EXPORTS, "fundo_abertura.png"),
  dest: path.join(PUBLIC, "opening", "background.webp"),
  maxWidth: 1080,
  quality: 82,
});

console.log("published");
