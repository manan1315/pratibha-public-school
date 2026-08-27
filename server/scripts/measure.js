const BASE = process.argv[2] || 'http://localhost:5440';
const W = +process.argv[3] || 1440;
const H = +process.argv[4] || 900;
const ROUTES = ['/','/about','/academics','/admissions','/achievements','/student-life','/facilities','/gallery','/news-events','/downloads','/contact'];
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H }, isMobile: W<500, hasTouch: W<500 });
  let total = 0;
  console.log(`viewport ${W}x${H}\nROUTE            HEIGHT   SCREENS\n`.padEnd(40,'-'));
  for (const r of ROUTES) {
    try {
      await p.goto(BASE+r, { waitUntil: 'load', timeout: 30000 });
      await p.waitForTimeout(1800);
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      total += h;
      console.log(`${r.padEnd(16)} ${String(h).padStart(6)}   ${(h/H).toFixed(1)}x`);
    } catch { console.log(r.padEnd(16)+'  ERR'); }
  }
  console.log('-'.repeat(40));
  console.log(`total ${total}px  avg ${Math.round(total/ROUTES.length)}px  ${(total/ROUTES.length/H).toFixed(1)} screens`);
  await b.close();
})();
