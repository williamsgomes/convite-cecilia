import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3001/#recadinhos";
const out = process.argv[3] ?? "tmp-recadinhos-420.png";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 420, height: 1600 },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
  document
    .querySelectorAll("button[aria-label='Tocar música'], button[aria-label='Pausar música']")
    .forEach((el) => el.remove());
});
await page.locator("#recadinhos").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.locator("#recadinhos").screenshot({ path: out });
await browser.close();

console.log(`saved ${out}`);
