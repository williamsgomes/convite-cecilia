import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3001/#localizacao";
const out = process.argv[3] ?? "tmp-closing-420.png";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 420, height: 2200 },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
  document
    .querySelectorAll("button[aria-label='Tocar música'], button[aria-label='Pausar música']")
    .forEach((el) => el.remove());
});

const location = page.locator("#localizacao");
const closing = page.locator("#encerramento");
await location.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);

await closing.locator("img").last().waitFor({ state: "visible" });

const locBox = await location.boundingBox();
const closeBox = await closing.boundingBox();

if (!locBox || !closeBox) {
  throw new Error("Could not find #localizacao or #encerramento");
}

const y = Math.max(0, locBox.y);
const height = Math.min(
  closeBox.y + closeBox.height - y,
  2200 - y,
);

await page.screenshot({
  path: out,
  clip: {
    x: 0,
    y,
    width: 420,
    height,
  },
});

await browser.close();
console.log(`saved ${out}`);
