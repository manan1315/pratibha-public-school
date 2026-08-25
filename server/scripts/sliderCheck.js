/**
 * Regression guard for the hero slider.
 *
 * The arrows silently "did nothing" because Swiper's EffectFade module was
 * enabled while its stylesheet (swiper/css/effect-fade) was never imported.
 * Without `.swiper-fade` rules every slide stays at opacity 1 stacked on top
 * of each other, so changing the active index has no visible effect.
 *
 * Run: node scripts/sliderCheck.js
 */
const fs = require('fs');
const path = require('path');

const CLIENT = path.join(__dirname, '..', '..', 'client');
const fail = [];
const pass = [];

function check(label, ok, hint) {
  (ok ? pass : fail).push(ok ? label : `${label} — ${hint}`);
}

// 1. effect-fade CSS imported in the entry file
const main = fs.readFileSync(path.join(CLIENT, 'src', 'main.jsx'), 'utf8');
check(
  "main.jsx imports 'swiper/css/effect-fade'",
  main.includes('swiper/css/effect-fade'),
  'EffectFade is used but its CSS is missing -> slides never visually change'
);

// 2. every Swiper module in use has its CSS counterpart imported
const slider = fs.readFileSync(
  path.join(CLIENT, 'src', 'components', 'HeroSlider', 'index.jsx'), 'utf8'
);
const moduleCss = {
  Navigation: 'swiper/css/navigation',
  Pagination: 'swiper/css/pagination',
  Autoplay: 'swiper/css/autoplay',
  EffectFade: 'swiper/css/effect-fade',
};
const used = Object.keys(moduleCss).filter((m) =>
  new RegExp(`modules'[\\s\\S]*?\\b${m}\\b|\\b${m}\\b[^\\n]*from 'swiper/modules'`).test(slider)
  || new RegExp(`\\{[^}]*\\b${m}\\b[^}]*\\}\\s*from\\s*'swiper/modules'`).test(slider)
);
used.forEach((m) => {
  check(`${m} module has its CSS imported`, main.includes(moduleCss[m]),
    `add: import '${moduleCss[m]}';`);
});

// 3. crossFade avoids slides bleeding through one another
check('fadeEffect crossFade enabled', /crossFade:\s*true/.test(slider),
  'without crossFade two slides can show at once');

// 4. the dark overlay must not swallow arrow clicks
const overlayLines = slider.split('\n').filter((l) => l.includes('absolute inset-0'));
check('slide overlays are click-through',
  overlayLines.length > 0 && overlayLines.every((l) => l.includes('pointer-events-none')),
  'an absolute overlay without pointer-events-none sits over the arrows');

// 5. arrows must be styled above the overlay
const css = fs.readFileSync(path.join(CLIENT, 'src', 'styles', 'index.css'), 'utf8');
check('arrows have a z-index', /\.swiper-button-(next|prev)[\s\S]{0,400}z-index/.test(css),
  'arrows can end up under the slide overlay');

// 6. built stylesheet actually contains the fade rules
const distAssets = path.join(CLIENT, 'dist', 'assets');
if (fs.existsSync(distAssets)) {
  const cssFiles = fs.readdirSync(distAssets).filter((f) => f.endsWith('.css'));
  const hasFade = cssFiles.some((f) =>
    fs.readFileSync(path.join(distAssets, f), 'utf8').includes('swiper-fade')
  );
  check('built CSS contains .swiper-fade rules', hasFade,
    'run: npm run build (in /client) after adding the import');
}

console.log('HERO SLIDER CHECK\n' + '-'.repeat(52));
pass.forEach((p) => console.log('  PASS  ' + p));
fail.forEach((f) => console.log('  FAIL  ' + f));
console.log('-'.repeat(52));
console.log(`${pass.length} passed, ${fail.length} failed`);
process.exit(fail.length ? 1 : 0);
