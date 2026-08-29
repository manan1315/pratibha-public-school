/**
 * PPS Bot — simple, reliable, answers from school data.
 */

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s\u0900-\u097F]/g, ' ').replace(/\s+/g, ' ').trim();
const tokens = (s) => norm(s).split(' ').filter((w) => w.length > 2);

const INTENTS = {
  fees: ['fee', 'fees', 'fis', 'cost', 'charge', 'tuition', 'payment', 'scholarship', 'concession', 'shulk'],
  admission: ['admission', 'admit', 'enroll', 'apply', 'application', 'form', 'dakhila'],
  timings: ['timing', 'time', 'hours', 'open', 'close', 'schedule', 'samay', 'kb'],
  transport: ['transport', 'bus', 'buses', 'route', 'stop', 'pickup', 'drop', 'gaadi'],
  contact: ['contact', 'phone', 'number', 'call', 'mobile', 'email', 'address', 'where', 'pata'],
  facilities: ['facility', 'lab', 'library', 'computer', 'sports', 'ground', 'canteen', 'medical', 'cctv', 'classroom', 'smart', 'hostel'],
  documents: ['document', 'certificate', 'birth', 'aadhaar', 'tc', 'transfer', 'marksheet'],
  board: ['board', 'cbse', 'affiliation', 'syllabus', 'stream', 'science', 'commerce', 'arts'],
  classes: ['class', 'grade', 'nursery', 'lkg', 'ukg', 'age', 'kaksha'],
  results: ['result', 'marks', 'percentage', 'topper', 'exam', 'natija'],
  downloads: ['download', 'pdf', 'brochure', 'prospectus', 'calendar', 'uniform'],
  news: ['news', 'event', 'update', 'activity', 'function', 'programme'],
  achievements: ['achievement', 'award', 'prize', 'winner', 'medal', 'trophy'],
  faculty: ['teacher', 'faculty', 'staff', 'principal', 'director', 'adhyapak'],
  greeting: ['hello', 'hi', 'hey', 'namaste', 'namaskar'],
  thanks: ['thanks', 'thank', 'dhanyavad', 'shukriya', 'ok'],
};

function detectIntent(q) {
  const t = norm(q);
  const words = t.split(' ');
  const scores = {};
  for (const [intent, keys] of Object.entries(INTENTS)) {
    let s = 0;
    for (const k of keys) {
      if (words.includes(k)) s += 3;
      else if (k.length > 4 && t.includes(k)) s += 1;
    }
    if (s) scores[intent] = s;
  }
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return ranked.length ? ranked[0][0] : null;
}

function overlap(qt, text) {
  if (!qt.length) return 0;
  const hay = norm(text);
  let hits = 0;
  qt.forEach((t) => { if (hay.includes(t)) hits += 1; });
  return hits / qt.length;
}

const listify = (arr, max = 6) => arr.slice(0, max).map((x) => `• ${x}`).join('\n');

export function answer(question, data = {}) {
  const { faqs = [], facilities = [], busRoutes = [], downloads = [], settings = {}, news = [], achievements = [], faculty = [] } = data;

  const phone1 = settings.phone1 || '+91-91111-07333';
  const phone2 = settings.phone2 || '+91-91111-07334';
  const email = settings.email || 'ppskhatkhati@gmail.com';
  const hours = settings.workingHours || 'Mon - Sat: Primary 7:40 AM - 11:40 AM | Middle & Higher Secondary 7:40 AM - 1:40 PM';
  const address = settings.address || 'Village Khatkhati, Tehsil Basna, Dist Mahasamund, 493554 (Chhattisgarh)';

  const fallback = () => ({
    text: `I don't have that detail on the website yet.\n\nPlease contact the school office:\n📞 ${phone1}\n📞 ${phone2}\n✉️ ${email}\n🕘 ${hours}`,
    link: { label: 'Contact Us', to: '/contact' },
  });

  const q = String(question || '').trim();
  if (!q) return fallback();
  const qt = tokens(q);
  const intent = detectIntent(q);

  // greeting
  if (intent === 'greeting') {
    return { text: `Namaste! 🙏 Welcome to Pratibha Public School Basna.\n\nAsk me about admissions, fees, timings, bus routes, facilities, documents, results or downloads.` };
  }
  if (intent === 'thanks') {
    return { text: `Happy to help! 😊 Anything else?` };
  }

  // named facility
  for (const f of facilities) {
    const ft = tokens(f.title);
    const match = ft.filter((t) => qt.some((w) => w === t || (w.length >= 5 && w.startsWith(t)))).length;
    if (match / ft.length >= 0.6) {
      return { text: `${f.title}\n\n${f.description}`, link: { label: 'All facilities', to: '/facilities' } };
    }
  }

  // FAQ match
  let best = null;
  for (const f of faqs) {
    const s = overlap(qt, `${f.question} ${f.category || ''}`) * 1.0 + overlap(qt, f.answer) * 0.3;
    if (!best || s > best.s) best = { s, f };
  }
  if (best && best.s >= 0.25) {
    return { text: best.f.answer, link: { label: 'More FAQs', to: '/admissions#faqs' } };
  }

  // intent answers
  switch (intent) {
    case 'timings':
      return { text: `🕘 School timings:\n\n${hours}\n\nPre-primary ends earlier. Office open till 4:00 PM.` };
    case 'contact':
      return { text: `Reach us at:\n\n📞 ${phone1}\n📞 ${phone2}\n✉️ ${email}\n📍 ${address}\n🕘 ${hours}`, link: { label: 'Contact page', to: '/contact' } };
    case 'transport':
      if (!busRoutes.length) return fallback();
      return { text: `🚌 We run ${busRoutes.length} bus routes:\n\n${listify(busRoutes.map((r) => `${r.routeNumber} — ${r.routeName}${r.timing ? ` (${r.timing})` : ''}`), 6)}`, link: { label: 'Facilities', to: '/facilities' } };
    case 'facilities':
      if (!facilities.length) return fallback();
      return { text: `Our campus facilities:\n\n${listify(facilities.map((f) => f.title), 9)}`, link: { label: 'View details', to: '/facilities' } };
    case 'downloads':
      if (!downloads.length) return fallback();
      return { text: `📄 Available downloads:\n\n${listify(downloads.map((d) => d.title), 6)}`, link: { label: 'Downloads page', to: '/downloads' } };
    case 'fees': {
      const feeDoc = downloads.find((d) => /fee/i.test(d.title));
      let text = `Fees vary by class.`;
      if (feeDoc) text += ` See "${feeDoc.title}" on Downloads page.`;
      text += `\n\nFor exact figures, call ${phone1}.`;
      return { text, link: { label: feeDoc ? 'Downloads' : 'Contact Us', to: feeDoc ? '/downloads' : '/contact' } };
    }
    case 'admission': {
      const procFaq = faqs.find((f) => /process/i.test(f.question));
      const text = procFaq ? `${procFaq.answer}\n\nSubmit the enquiry form online.` : `Admissions open for 2025-26, Nursery to Class 12.\n\nSubmit the enquiry form online.`;
      return { text, link: { label: 'Admission Enquiry', to: '/admissions#enquiry' } };
    }
    case 'documents':
      return { text: `Documents required:\n\n• Birth Certificate\n• Aadhaar (student + parents)\n• 4 passport photos\n• Transfer Certificate (Class 2+)\n• Previous report card\n• Address proof`, link: { label: 'Admissions page', to: '/admissions' } };
    case 'classes':
      return { text: `Classes from Nursery to Class 12 (CBSE).\n\nAge criteria (31st March):\n• Nursery — 3+ years\n• LKG — 4+ years\n• UKG — 5+ years\n• Class 1 — 6+ years`, link: { label: 'Age criteria', to: '/admissions#age' } };
    case 'board':
      return { text: `Affiliated to CBSE (Central Board of Secondary Education).\n\nClass 11–12 streams: Science (PCM/PCB), Commerce, Humanities.`, link: { label: 'Academics', to: '/academics' } };
    case 'results':
      if (!achievements.length) return fallback();
      return { text: `Recent academic record:\n\n${listify(achievements.map((a) => `${a.title}${a.year ? ` (${a.year})` : ''}`), 5)}`, link: { label: 'Achievements', to: '/achievements' } };
    case 'achievements':
      if (!achievements.length) return fallback();
      return { text: `Recent achievements:\n\n${listify(achievements.map((a) => `${a.title}${a.studentName ? ` — ${a.studentName}` : ''}${a.year ? ` (${a.year})` : ''}`), 5)}`, link: { label: 'All achievements', to: '/achievements' } };
    case 'news':
      if (!news.length) return fallback();
      return { text: `Latest from campus:\n\n${listify(news.map((n) => n.title), 5)}`, link: { label: 'News & Events', to: '/news-events' } };
    case 'faculty':
      if (!faculty.length) return fallback();
      return { text: `${faculty.length}+ qualified teachers.\n\nA few:\n${listify(faculty.map((f) => `${f.name} — ${f.designation}`), 4)}`, link: { label: 'Meet our faculty', to: '/about#faculty' } };
    default:
      return fallback();
  }
}

export const SUGGESTIONS = ['Admission process', 'Fee structure', 'School timings', 'Bus routes', 'Documents required', 'Facilities'];
export default answer;
