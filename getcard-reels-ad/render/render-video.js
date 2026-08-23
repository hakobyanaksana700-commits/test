// Deterministic frame-by-frame render: calls window.__renderFrame(t) for
// each output frame and screenshots the result, so timing is exact by
// construction (no real-time screen-recording pacing to re-align later).
'use strict';
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const globalRoot = execSync('npm root -g').toString().trim();
const { chromium } = require(path.join(globalRoot, 'playwright'));

const WIDTH = 1080, HEIGHT = 1920;
const FPS = 30;
const DURATION = 35.3; // small tail past 35s so exit fades fully render
const TOTAL_FRAMES = Math.ceil(DURATION * FPS);
const HTML_PATH = path.resolve(__dirname, '..', 'getcard-reels-animatic.html');
const FRAMES_DIR = path.resolve(__dirname, 'frames');

(async () => {
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  await page.goto('file://' + HTML_PATH + '?capture=1');
  await page.waitForFunction(() => window.__captureReady === true, { timeout: 20000 });

  const t0 = Date.now();
  for (let i = 0; i < TOTAL_FRAMES; i++){
    const t = i / FPS;
    await page.evaluate((tSec) => window.__renderFrame(tSec), t);
    const file = path.join(FRAMES_DIR, 'f_' + String(i).padStart(5, '0') + '.jpg');
    await page.screenshot({ path: file, type: 'jpeg', quality: 92 });
    if (i % 150 === 0) console.log('frame', i, '/', TOTAL_FRAMES);
  }
  console.log('captured', TOTAL_FRAMES, 'frames in', ((Date.now() - t0) / 1000).toFixed(1), 's');

  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
