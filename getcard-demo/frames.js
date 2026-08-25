const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const dir = __dirname;
  const outDir = path.join(dir, 'frames');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const FPS = 30;
  const DURATION = 15; // seconds
  const TOTAL = DURATION * FPS;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.join(dir, 'scene.html'));
  await page.evaluate(() => {
    document.getAnimations().forEach(a => a.pause());
  });

  for (let i = 0; i < TOTAL; i++) {
    const tMs = (i / FPS) * 1000;
    await page.evaluate((t) => {
      document.getAnimations().forEach(a => { a.currentTime = t; });
    }, tMs);
    const name = 'f_' + String(i).padStart(5, '0') + '.png';
    await page.screenshot({ path: path.join(outDir, name) });
    if (i % 30 === 0) console.log('frame', i, '/', TOTAL);
  }

  await browser.close();
  console.log('DONE');
})();
