/**
 * PPS Bot answer engine — rebuilt.
 *
 * Answers strictly from the school's own live data (FAQs, facilities, bus
 * routes, downloads, settings, news, achievements, faculty). Only when the
 * question genuinely does not match anything the school has published does it
 * fall back to the contact details.
 */

/* ---------------- text helpers ---------------- */

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const STOP = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'do', 'does', 'did', 'i', 'we', 'you',
  'my', 'our', 'your', 'me', 'to', 'of', 'in', 'on', 'at', 'for', 'and', 'or',
  'what', 'which', 'how', 'when', 'where', 'who', 'whom', 'can', 'could',
  'would', 'should', 'will', 'please', 'tell', 'about', 'there', 'any', 'be',
  'have', 'has', 'it', 'this', 'that', 'from', 'kya', 'hai', 'ka', 'ki', 'ke',
  'me', 'mein', 'kaise', 'kitna', 'kitne', 'batao', 'chahiye', 'hoga', 'se',
]);

const tokens = (s) => norm(s).split(' ').filter((w) => w.length > 2 && !STOP.has(w));

function overlapScore(queryTokens, text) {
  if (!queryTokens.length) return 0;
  const hay = norm(text);
  let hits = 0;
  queryTokens.forEach((t) => {
    if (hay.includes(t)) hits += 1;
    else if (t.length > 4 && hay.includes(t.slice(0, Math.ceil(t.length * 0.75)))) hits += 0.6;
  });
  return hits / queryTokens.length;
}

/* ---------------- intent keywords ---------------- */

const INTENTS = {
  fees: ['fee', 'fees', 'fis', 'cost', 'charge', 'charges', 'tuition', 'payment', 'scholarship', 'concession', 'discount', 'shulk'],
  admission: ['admission', 'admissions', 'admit', 'enroll', 'enrolment', 'enrollment', 'apply', 'application', 'form', 'daakhila', 'dakhila'],
  timings: ['timing', 'timings', 'time', 'times', 'hours', 'open', 'close', 'closing', 'opening', 'schedule', 'samay'],
  transport: ['transport', 'transportation', 'bus', 'buses', 'route', 'routes', 'stop', 'stops', 'pickup', 'drop', 'van', 'gaadi'],
  contact: ['contact', 'phone', 'number', 'call', 'mobile', 'email', 'mail', 'address', 'location', 'reach', 'where', 'map', 'pata'],
  facilities: ['facility', 'facilities', 'lab', 'labs', 'library', 'computer', 'sports', 'ground', 'playground', 'canteen', 'cafeteria', 'medical', 'security', 'cctv', 'classroom', 'smart', 'infrastructure', 'hostel'],
  documents: ['document', 'documents', 'certificate', 'birth', 'aadhaar', 'aadhar', 'tc', 'transfer', 'marksheet', 'papers', 'kagaz'],
  board: ['board', 'cbse', 'affiliation', 'affiliated', 'syllabus', 'curriculum', 'stream', 'streams', 'subject', 'subjects', 'science', 'commerce', 'arts', 'humanities'],
  classes: ['class', 'classes', 'grade', 'standard', 'nursery', 'lkg', 'ukg', 'kindergarten', 'age', 'criteria', 'eligibility', 'kaksha'],
  results: ['result', 'results', 'marks', 'percentage', 'topper', 'toppers', 'exam', 'exams', 'performance', 'natija'],
  downloads: ['download', 'downloads', 'pdf', 'brochure', 'prospectus', 'calendar', 'uniform'],
  news: ['news', 'event', 'events', 'update', 'updates', 'happening', 'activity', 'activities', 'function', 'programme', 'program'],
  achievements: ['achievement', 'achievements', 'award', 'awards', 'prize', 'won', 'winner', 'medal', 'trophy'],
  faculty: ['teacher', 'teachers', 'faculty', 'staff', 'principal', 'chairman', 'director', 'qualification', 'adhyapak'],
  greeting: ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'gud', 'good', 'morning', 'evening', 'afternoon'],
  thanks: ['thanks', 'thank', 'thankyou', 'dhanyavad', 'shukriya', 'ok', 'okay'],
};

function detectIntent(text) {
  const t = norm(text);
  const words = t.split(' ');
  const scores = {};
  Object.entries(INTENTS).forEach(([intent, keys]) => {
    let s = 0;
    keys.forEach((k) => {
      if (words.includes(k)) s += 3;
      else if (k.length > 4 && t.includes(k)) s += 1;
    });
    if (s) scores[intent] = s;
  });
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return ranked.length ? ranked[0][0] : null;
}

/* ---------------- answer builders ---------------- */

const listify = (arr, max = 6) => {
  const shown = arr.slice(0, max);
  const more = arr.length - shown.length;
  return shown.map((x) => `• ${x}`).join('\n') + (more > 0 ? `\n…and ${more} more` : '');
};

/**
 * @param {string} question
 * @param {object} data { faqs, facilities, busRoutes, downloads, settings, news, achievements, faculty }
 * @returns {{text: string, link?: {label: string, to: string}}}
 */
export function answer(question, data = {}) {
  const {
    faqs = [], facilities = [], busRoutes = [], downloads = [],
    settings = {}, news = [], achievements = [], faculty = [],
  } = data;

  const phone1 = settings.phone1 || '+91-91111-07333';
  const phone2 = settings.phone2 || '+91-91111-07334';
  const email = settings.email || 'ppskhatkhati@gmail.com';
  const hours = settings.workingHours || 'Mon - Sat: Primary 7:40 AM - 11:40 AM | Middle & Higher Secondary 7:40 AM - 1:40 PM';
  const address = settings.address || 'School Campus, Village: Khatkhati, Tehsil: Basna, Dist: Mahasamund, 493554 (Chhattisgarh)';

  const fallback = () => ({
    text: `I don't have that detail published on the website yet.\n\nPlease contact the school office directly:\n\n📞 ${phone1}\n📞 ${phone2}\n✉️ ${email}\n🕘 ${hours}`,
    link: { label: 'Contact Us', to: '/contact' },
  });

  const q = String(question || '').trim();
  if (!q) return fallback();

  const qt = tokens(q);
  const intent = detectIntent(q);

  /* --- social niceties --- */
  if (intent === 'greeting' && qt.length <= 3) {
    return {
      text: `Namaste! 🙏 Welcome to Pratibha Public School Basna.\n\nYou can ask me about admissions, fees, school timings, bus routes, facilities, documents required, results or downloads.`,
    };
  }
  if (intent === 'thanks' && qt.length <= 3) {
    return { text: `Happy to help! 😊 Anything else you'd like to know?` };
  }

  /* --- 0. named facility beats everything --- */
  let namedFacility = null;
  facilities.forEach((f) => {
    const titleTokens = tokens(f.title);
    if (!titleTokens.length) return;
    const covered = titleTokens.filter((t) => qt.some((w) => {
      if (w === t) return true;
      const shorter = w.length < t.length ? w : t;
      const longer = w.length < t.length ? t : w;
      return shorter.length >= 6 && longer.startsWith(shorter);
    })).length;
    const titleCoverage = covered / titleTokens.length;
    const queryCoverage = overlapScore(qt, f.title);
    if (titleCoverage >= 0.75 && queryCoverage >= 0.5) {
      const s = titleCoverage + queryCoverage;
      if (!namedFacility || s > namedFacility.s) namedFacility = { s, f };
    }
  });
  if (namedFacility) {
    return {
      text: `${namedFacility.f.title}\n\n${namedFacility.f.description}`,
      link: { label: 'All facilities', to: '/facilities' },
    };
  }

  /* --- 1. best matching FAQ --- */
  let best = null;
  faqs.forEach((f) => {
    const s = overlapScore(qt, `${f.question} ${f.category || ''}`) * 1.0
            + overlapScore(qt, f.answer) * 0.35;
    if (!best || s > best.s) best = { s, f };
  });
  if (best && best.s >= 0.35) {
    return { text: best.f.answer, link: { label: 'More FAQs', to: '/admissions#faqs' } };
  }

  /* --- 2. intent-specific answers --- */
  switch (intent) {
    case 'timings':
      return {
        text: `🕘 School timings:\n\n${hours}\n\nPre-primary classes end earlier. The school office stays open till 4:00 PM.`,
      };

    case 'contact':
      return {
        text: `You can reach us at:\n\n📞 ${phone1}\n📞 ${phone2}\n✉️ ${email}\n📍 ${address}\n🕘 ${hours}`,
        link: { label: 'Contact page', to: '/contact' },
      };

    case 'transport': {
      if (!busRoutes.length) return fallback();
      const lines = busRoutes.map((r) => `${r.routeNumber} — ${r.routeName}${r.timing ? ` (${r.timing})` : ''}`);
      return {
        text: `🚌 Yes, we run ${busRoutes.length} bus routes:\n\n${listify(lines, 6)}`,
        link: { label: 'See facilities', to: '/facilities' },
      };
    }

    case 'facilities': {
      if (!facilities.length) return fallback();
      let hit = null;
      facilities.forEach((f) => {
        const s = overlapScore(qt, f.title);
        if (s >= 0.5 && (!hit || s > hit.s)) hit = { s, f };
      });
      if (hit) {
        return {
          text: `${hit.f.title}\n\n${hit.f.description}`,
          link: { label: 'All facilities', to: '/facilities' },
        };
      }
      return {
        text: `Our campus facilities include:\n\n${listify(facilities.map((f) => f.title), 9)}`,
        link: { label: 'View details', to: '/facilities' },
      };
    }

    case 'downloads': {
      if (!downloads.length) return fallback();
      return {
        text: `📄 These documents are available to download:\n\n${listify(downloads.map((d) => d.title), 6)}`,
        link: { label: 'Downloads page', to: '/downloads' },
      };
    }

    case 'fees': {
      const feeDoc = downloads.find((d) => /fee/i.test(`${d.title} ${d.category || ''}`));
      const scholarshipFaq = faqs.find((f) => /scholarship|concession/i.test(f.question));
      let text = `Fees vary by class.`;
      if (feeDoc) text += ` The full fee structure is available on our Downloads page ("${feeDoc.title}").`;
      if (scholarshipFaq) text += `\n\n${scholarshipFaq.answer}`;
      return { matched: true, text, link: { label: feeDoc ? 'Downloads' : 'Contact Us', to: feeDoc ? '/downloads' : '/contact' } };
    }

    case 'admission': {
      const procFaq = faqs.find((f) => /process/i.test(f.question));
      const text = procFaq
        ? `${procFaq.answer}\n\nYou can submit the enquiry form online — it reaches the school office directly.`
        : `Admissions are open for Session 2025-26, from Nursery to Class 12.\n\nSubmit the online enquiry form and our counsellor will call you.`;
      return { text, link: { label: 'Admission Enquiry', to: '/admissions#enquiry' } };
    }

    case 'documents': {
      const docFaq = faqs.find((f) => /document/i.test(f.question));
      if (docFaq) {
        return { text: docFaq.answer, link: { label: 'Admissions page', to: '/admissions' } };
      }
      return {
        text: `Documents required at admission:\n\n• Birth Certificate\n• Aadhaar of student and parents\n• 4 passport photographs\n• Transfer Certificate (Class 2 onwards)\n• Previous report card\n• Address proof`,
        link: { label: 'Admissions page', to: '/admissions' },
      };
    }

    case 'classes':
      return {
        text: `We offer classes from Nursery to Class 12 (CBSE).\n\nAge criteria as on 31st March:\n• Nursery — 3+ years\n• LKG — 4+ years\n• UKG — 5+ years\n• Class 1 — 6+ years\n\nFor Class 2 and above, admission depends on seat availability and a placement assessment.`,
        link: { label: 'Age criteria', to: '/admissions#age' },
      };

    case 'board': {
      const boardFaq = faqs.find((f) => /board|affiliat|stream/i.test(f.question));
      if (boardFaq) {
        return { text: boardFaq.answer, link: { label: 'Academics', to: '/academics' } };
      }
      return {
        text: `We are affiliated to CBSE (Central Board of Secondary Education) and teach from Nursery to Class 12.\n\nClass 11–12 streams: Science (PCM / PCB), Commerce and Humanities.`,
        link: { label: 'Academics', to: '/academics' },
      };
    }

    case 'results': {
      const relevant = achievements.filter((a) => /academic|result|board/i.test(`${a.category} ${a.title}`));
      const src = relevant.length ? relevant : achievements;
      if (!src.length) return fallback();
      return {
        text: `Our recent academic record:\n\n${listify(src.map((a) => `${a.title}${a.year ? ` (${a.year})` : ''}`), 5)}`,
        link: { label: 'Achievements', to: '/achievements' },
      };
    }

    case 'achievements': {
      if (!achievements.length) return fallback();
      return {
        text: `Recent achievements:\n\n${listify(achievements.map((a) => `${a.title}${a.studentName ? ` — ${a.studentName}` : ''}${a.year ? ` (${a.year})` : ''}`), 5)}`,
        link: { label: 'All achievements', to: '/achievements' },
      };
    }

    case 'news': {
      if (!news.length) return fallback();
      return {
        text: `Latest from campus:\n\n${listify(news.map((n) => n.title), 5)}`,
        link: { label: 'News & Events', to: '/news-events' },
      };
    }

    case 'faculty': {
      if (!faculty.length) return fallback();
      return {
        text: `We have ${faculty.length}+ qualified teachers across all departments.\n\nA few of them:\n${listify(faculty.map((f) => `${f.name} — ${f.designation}${f.qualification ? `, ${f.qualification}` : ''}`), 4)}`,
        link: { label: 'Meet our faculty', to: '/about#faculty' },
      };
    }

    default:
      break;
  }

  /* --- nothing published about it --- */
  return fallback();
}

/** Quick-tap suggestions shown under the chat header. */
export const SUGGESTIONS = [
  'Admission process',
  'Fee structure',
  'School timings',
  'Bus routes',
  'Documents required',
  'Facilities',
];

export default answer;
