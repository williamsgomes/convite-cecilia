import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, "..", "tmp", "qa");
const url = process.argv[2] ?? "http://localhost:3001/";

const sections = [
  "historia",
  "contagem",
  "confirmacao",
  "recadinhos",
  "momentos",
  "localizacao",
  "encerramento",
];

const overflowWidths = [320, 360, 390, 414, 420, 768, 1024, 1280, 1440];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 420, height: 1600 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
});

await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
  document
    .querySelectorAll(
      "button[aria-label='Tocar música'], button[aria-label='Pausar música']",
    )
    .forEach((el) => el.remove());
});

await page.evaluate(async () => {
  const step = 500;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((resolve) => window.setTimeout(resolve, 120));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(600);

for (const id of sections) {
  const locator = page.locator(`#${id}`);
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const file = join(outDir, `420-${id}.png`);
  await locator.screenshot({ path: file });
  console.log(`saved ${file}`);
}

await page.locator("#momentos").scrollIntoViewIfNeeded();
await page.getByRole("button", { name: "Ver mais fotos" }).click();
await page.waitForTimeout(500);
const extraFile = join(outDir, "420-galeria-extra.png");
await page.locator('[role="dialog"]').screenshot({ path: extraFile });
console.log(`saved ${extraFile}`);
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

const overflowReport = [];

for (const width of overflowWidths) {
  await page.setViewportSize({ width, height: 1400 });
  await page.waitForTimeout(200);
  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      overflowing: doc.scrollWidth > doc.clientWidth + 1,
    };
  });
  overflowReport.push({ width, ...result });
  console.log(
    `overflow ${width}px: ${result.overflowing ? "YES" : "ok"} (scroll ${result.scrollWidth} / client ${result.clientWidth})`,
  );
}

await browser.close();

const failing = overflowReport.filter((item) => item.overflowing);
if (failing.length > 0) {
  console.error("horizontal overflow detected", failing);
  process.exit(1);
}

console.log("qa screenshots complete");
