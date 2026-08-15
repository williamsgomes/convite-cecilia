import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 420, height: 1800 },
  deviceScaleFactor: 2,
});

await page.goto("http://localhost:3001/#encerramento", {
  waitUntil: "networkidle",
});
await page.evaluate(() => {
  document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
  document
    .querySelectorAll("button[aria-label='Tocar música'], button[aria-label='Pausar música']")
    .forEach((el) => el.remove());
});
await page.locator("#encerramento").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.locator("#encerramento").screenshot({ path: "tmp-encerramento-420.png" });
await browser.close();
console.log("saved tmp-encerramento-420.png");
