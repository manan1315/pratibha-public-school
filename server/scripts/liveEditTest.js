/**
 * Proves an admin edit shows up in the data the PUBLIC PAGES actually read.
 * Mirrors exactly the API calls each page makes.
 */
const BASE = process.env.API || 'http://localhost:5080/api';
const get = async (p) => (await fetch(`${BASE}${p}`)).json();

(async () => {
  const { token } = await (await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ppsbasna.com', password: 'PPS@admin2025' }),
  })).json();
  const H = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const MARK = 'ZZLIVE';
  const rows = [];
  const cleanup = [];

  // resource, create body, public endpoint the page reads, key to look for
  const cases = [
    ['Home / Facilities page', 'facilities', { title: `${MARK} Facility`, description: 'd', icon: 'book' }, '/facilities', 'title'],
    ['About page (leadership)', 'leadership', { name: `${MARK} Chair`, designation: 'Chairman', message: 'm', type: 'chairman' }, '/leadership', 'name'],
    ['About page (faculty)', 'faculty', { name: `${MARK} Teacher`, qualification: 'M.Sc.', designation: 'T' }, '/faculty', 'name'],
    ['About page (student leaders)', 'student-leaders', { name: `${MARK} Leader`, class: 'XII', position: 'Head Boy' }, '/student-leaders', 'name'],
    ['Admissions page (FAQ)', 'faqs', { question: `${MARK} Question?`, answer: 'a' }, '/faqs', 'question'],
    ['Admissions page (downloads)', 'downloads', { title: `${MARK} Form`, file: '/uploads/x.pdf' }, '/downloads', 'title'],
    ['Home (news)', 'news', { title: `${MARK} News`, content: 'c', isFeatured: true }, '/news/featured', 'title'],
    ['Home (achievements)', 'achievements', { title: `${MARK} Award`, category: 'Sports' }, '/achievements', 'title'],
    ['Home (testimonials)', 'testimonials', { name: `${MARK} Parent`, relation: 'Parent', quote: 'q', rating: 5 }, '/testimonials', 'name'],
    ['Home (hero slider)', 'sliders', { image: '/uploads/x.png', heading: `${MARK} Slide` }, '/sliders', 'heading'],
    ['Ticker (announcements)', 'announcements', { text: `${MARK} notice` }, '/announcements', 'text'],
    ['About page (vision text)', 'about', { section: 'vision', title: `${MARK} Vision`, content: 'c' }, '/about', 'title'],
    ['NewsEvents page (events)', 'events', { title: `${MARK} Event`, date: '2026-06-01' }, '/events', 'title'],
    ['Gallery page (album)', 'albums', { albumName: `${MARK} Album` }, '/albums', 'albumName'],
    ['Homepage popup', 'popups', { title: `${MARK} Popup`, content: 'c' }, '/popups/active', 'title'],
  ];

  for (const [label, res, body, publicPath, key] of cases) {
    const c = await fetch(`${BASE}/${res}`, { method: 'POST', headers: H, body: JSON.stringify(body) });
    const doc = await c.json();
    if (!c.ok || !doc._id) { rows.push([label, 'CREATE FAILED']); continue; }
    cleanup.push([res, doc._id]);

    const data = await get(publicPath);
    const list = Array.isArray(data) ? data : data ? [data] : [];
    const found = list.some((i) => String(i[key] || '').includes(MARK));
    rows.push([label, found ? 'VISIBLE' : 'NOT VISIBLE']);
  }

  // settings
  const before = await get('/settings');
  await fetch(`${BASE}/settings`, { method: 'PUT', headers: H, body: JSON.stringify({ admissionBannerText: `${MARK} banner` }) });
  const after = await get('/settings');
  rows.push(['Home CTA (settings)', after.admissionBannerText?.includes(MARK) ? 'VISIBLE' : 'NOT VISIBLE']);
  await fetch(`${BASE}/settings`, { method: 'PUT', headers: H, body: JSON.stringify({ admissionBannerText: before.admissionBannerText }) });

  for (const [res, id] of cleanup) {
    await fetch(`${BASE}/${res}/${id}`, { method: 'DELETE', headers: H });
  }

  console.log('WHERE IT APPEARS'.padEnd(32) + 'AFTER ADMIN EDIT');
  console.log('-'.repeat(56));
  rows.forEach(([a, b]) => console.log(a.padEnd(32) + b));
  const ok = rows.filter((r) => r[1] === 'VISIBLE').length;
  console.log(`\n${ok}/${rows.length} admin edits reach the public site`);
})();
