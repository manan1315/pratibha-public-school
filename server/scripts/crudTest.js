/**
 * End-to-end CRUD smoke test against the running dev API.
 * Usage: node scripts/crudTest.js
 */
const BASE = process.env.API || 'http://localhost:5055/api';

const tests = [
  ['sliders',       { image: '/uploads/x.png', heading: 'CRUD Test Slide', order: 99 }, { heading: 'EDITED' }],
  ['news',          { title: 'CRUD Test News', content: 'body' },                        { title: 'EDITED' }],
  ['faculty',       { name: 'Test Teacher', qualification: 'M.Sc.', designation: 'Teacher' }, { designation: 'HOD' }],
  ['testimonials',  { name: 'Test Parent', relation: 'Parent', quote: 'Great', rating: 5 }, { rating: 4 }],
  ['achievements',  { title: 'CRUD Award', category: 'Sports', year: '2025' },            { year: '2026' }],
  ['facilities',    { title: 'Test Facility', description: 'desc' },                      { title: 'EDITED' }],
  ['faqs',          { question: 'Test Q?', answer: 'Test A' },                            { answer: 'EDITED' }],
  ['announcements', { text: 'CRUD ticker' },                                              { text: 'EDITED' }],
  ['bus-routes',    { routeNumber: 'T-9', routeName: 'Test Route', stops: ['A', 'B'] },   { timing: '7:00 AM' }],
  ['downloads',     { title: 'Test Doc', file: '/uploads/x.pdf' },                        { title: 'EDITED' }],
  ['popups',        { title: 'Test Popup', content: 'hello' },                            { content: 'EDITED' }],
  ['about',         { section: 'curriculum', title: 'Test Section', content: 'c' },       { title: 'EDITED' }],
  ['albums',        { albumName: 'Test Album' },                                          { albumName: 'EDITED' }],
  ['student-leaders',{ name: 'Test Leader', class: 'Class 12', position: 'Head Boy' },    { year: '2026' }],
  ['events',        { title: 'Test Event', date: '2026-03-01' },                          { venue: 'Hall' }],
  ['leadership',    { name: 'Test Chair', designation: 'Chairman', message: 'm', type: 'chairman' }, { name: 'EDITED' }],
];

(async () => {
  const login = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ppsbasna.com', password: 'PPS@admin2025' }),
  });
  const { token } = await login.json();
  if (!token) return console.error('LOGIN FAILED');
  console.log('login: OK\n');

  const H = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
  const rows = [];

  for (const [res, body, patch] of tests) {
    let status = 'PASS', note = '';
    try {
      const c = await fetch(`${BASE}/${res}`, { method: 'POST', headers: H, body: JSON.stringify(body) });
      const doc = await c.json();
      if (!c.ok || !doc._id) { rows.push([res, 'CREATE FAIL', JSON.stringify(doc).slice(0, 70)]); continue; }

      const u = await fetch(`${BASE}/${res}/${doc._id}`, { method: 'PUT', headers: H, body: JSON.stringify(patch) });
      const d = await fetch(`${BASE}/${res}/${doc._id}`, { method: 'DELETE', headers: H });

      if (!u.ok) { status = 'UPDATE FAIL'; note = `HTTP ${u.status}`; }
      else if (!d.ok) { status = 'DELETE FAIL'; note = `HTTP ${d.status}`; }
    } catch (e) {
      status = 'ERROR'; note = e.message;
    }
    rows.push([res, status, note]);
  }

  // gallery image needs an album
  try {
    const a = await fetch(`${BASE}/albums`, { method: 'POST', headers: H, body: JSON.stringify({ albumName: 'tmp' }) });
    const album = await a.json();
    const g = await fetch(`${BASE}/gallery`, { method: 'POST', headers: H, body: JSON.stringify({ albumId: album._id, imageUrl: '/uploads/x.png', caption: 'c' }) });
    const img = await g.json();
    const gu = await fetch(`${BASE}/gallery/${img._id}`, { method: 'PUT', headers: H, body: JSON.stringify({ caption: 'edited' }) });
    const gd = await fetch(`${BASE}/gallery/${img._id}`, { method: 'DELETE', headers: H });
    await fetch(`${BASE}/albums/${album._id}`, { method: 'DELETE', headers: H });
    rows.push(['gallery(image)', gu.ok && gd.ok ? 'PASS' : 'FAIL', '']);
  } catch (e) {
    rows.push(['gallery(image)', 'ERROR', e.message]);
  }

  // settings singleton
  try {
    const s = await fetch(`${BASE}/settings`, { method: 'PUT', headers: H, body: JSON.stringify({ tagline: 'Nurturing Minds, Shaping Futures' }) });
    rows.push(['settings(PUT)', s.ok ? 'PASS' : `FAIL ${s.status}`, '']);
  } catch (e) {
    rows.push(['settings(PUT)', 'ERROR', e.message]);
  }

  console.log('RESOURCE'.padEnd(18) + 'RESULT'.padEnd(14) + 'NOTE');
  console.log('-'.repeat(64));
  rows.forEach(([r, s, n]) => console.log(r.padEnd(18) + s.padEnd(14) + n));
  const pass = rows.filter((r) => r[1] === 'PASS').length;
  console.log(`\n${pass}/${rows.length} resources: full CRUD OK`);
})();
