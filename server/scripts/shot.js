const URL = process.argv[2] || 'http://localhost:5440/';
const OUT = process.argv[3] || 'shot.png';
const W = +process.argv[4] || 1440;
const H = +process.argv[5] || 900;
const SCROLL = +process.argv[6] || 0;
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H }, isMobile: W<500, hasTouch: W<500 });
  await p.goto(URL, { waitUntil: 'load', timeout: 30000 });
  await p.waitForTimeout(1800);
  await p.evaluate(() => {
    document.querySelectorAll('div').forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed' && parseInt(cs.zIndex||'0',10) >= 40) el.remove();
    });
  });
  if (SCROLL) { await p.evaluate((y)=>window.scrollTo(0,y), SCROLL); await p.waitForTimeout(700); }
  await p.screenshot({ path: OUT });
  console.log(OUT);
  await b.close();
})();
