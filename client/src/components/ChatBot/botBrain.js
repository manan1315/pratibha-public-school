/**
 * PPS Bot answer engine.
 *
 * Answers strictly from the school's own live data (FAQs, facilities, bus
 * routes, downloads, settings, news, achievements). When a question does not
 * match anything the school has published, it falls back to the contact
 * details instead of inventing an answer.
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
  'me', 'mein', 'kaise', 'kitna', 'kitne', 'batao', 'chahiye', 'hoga',
]);

const tokens = (s) => norm(s).split(' ').filter((w) => w.length > 2 && !STOP.has(w));

/**
 * Words that must never be treated as intent keywords even though they are
 * substrings of real ones. "kya" contains "ya", Hinglish fillers collide with
 * English keys, etc. Matching is done on whole words to avoid this.
 */
const FILLER = new Set(['kya', 'hai', 'kaise', 'batao', 'kitna', 'kitne', 'mein']);

/**
 * Things the school does not offer. Asked about these, the bot must hand over
 * the phone number rather than answering with the nearest published topic.
 */
const NOT_OFFERED = [
  'ib', 'igcse', 'icse', 'cambridge', 'a level', 'a-level', 'ib curriculum',
  'swimming', 'pool', 'horse', 'equestrian', 'riding', 'golf', 'skating',
  'violin', 'piano', 'guitar', 'helipad', 'boarding school',
];

function mentionsUnavailable(text) {
  const t = norm(text);
  const words = t.split(' ');
  return NOT_OFFERED.some((k) =>
    k.includes(' ') ? t.includes(k) : words.includes(k)
  );
}

/** Rough similarity: shared meaningful words, weighted by rarity of length. */
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

/* ---------------- intent keywords (English + common Hinglish) ---------------- */

const INTENTS = {
  fees: ['fee', 'fees', 'fis', 'cost', 'charge', 'charges', 'tuition', 'payment', 'scholarship', 'concession', 'discount', 'shulk'],
  admission: ['admission', 'admissions', 'admit', 'enroll', 'enrolment', 'enrollment', 'apply', 'application', 'form', 'daakhila', 'dakhila'],
  timings: ['timing', 'timings', 'time', 'times', 'hours', 'open', 'close', 'closing', 'opening', 'schedule', 'samay'],
  transport: ['transport', 'transportation', 'bus', 'buses', 'route', 'routes', 'stop', 'stops', 'pickup', 'drop', 'van', 'gaadi'],
  contact: ['contact', 'phone', 'number', 'call', 'mobile', 'email', 'mail', 'address', 'location', 'reach', 'where', 'map', 'pata'],
  facilities: ['facility', 'facilities', 'lab', 'labs', 'library', 'computer', 'sports', 'ground', 'playground', 'canteen', 'cafeteria', 'medical', 'security', 'cctv', 'classroom', 'smart', 'infrastructure', 'hostel'],
  documents: ['document', 'documents', 'certificate', 'birth', 'aadhaar', 'aadhar', 'tc', 'transfer', 'marksheet', 'papers', 'kagaz'],
  board: ['board', 'cgbse', 'cbse', 'affiliation', 'affiliated', 'syllabus', 'curriculum', 'stream', 'streams', 'subject', 'subjects', 'science', 'commerce', 'arts', 'humanities'],
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
  const words = t.split(' ').filter((w) => !FILLER.has(w));
  const scores = {};
  Object.entries(INTENTS).forEach(([intent, keys]) => {
    let s = 0;
    keys.forEach((k) => {
      if (words.includes(k)) s += 3;                       // whole word — strong
      else if (k.length > 4 && t.includes(k)) s += 1;      // long substring only
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
 * @returns {{text: string, link?: {label: string, to: string}, matched: boolean}}
 */
export function answer(question, data = {}) {
  const {
    faqs = [], facilities = [], busRoutes = [], downloads = [],
    settings = {}, news = [], achievements = [], faculty = [],
  } = data;

  const phone1 = settings.phone1 || '+91-91111-07333';
  const phone2 = settings.phone2 || '+91-91111-07334';
  const email = settings.email || 'ppskhatkhati@gmail.com';
  const hours = settings.workingHours || 'Mon - Sat: 8:00 AM - 3:00 PM';
  const address = settings.address
    || 'School Campus, Village: Khatkhati, Tehsil: Basna, Dist: Mahasamund, 493554 (Chhattisgarh)';

  const fallback = () => ({
    matched: false,
    text:
      `I don't have that detail published on the website yet.\n\n` +
      `Please contact the school office directly — they'll help you right away:\n\n` +
      `📞 ${phone1}\n📞 ${phone2}\n✉️ ${email}\n🕘 ${hours}`,
    link: { label: 'Contact Us', to: '/contact' },
  });

  const q = String(question || '').trim();
  if (!q) return fallback();

  const qt = tokens(q);
  const intent = detectIntent(q);

  /* --- social niceties --- */
  if (intent === 'greeting' && qt.length <= 3) {
    return {
      matched: true,
      text:
        `Namaste! 🙏 Welcome to Pratibha Public School Basna.\n\n` +
        `You can ask me about admissions, fees, school timings, bus routes, ` +
        `facilities, documents required, results or downloads.`,
    };
  }
  if (intent === 'thanks' && qt.length <= 3) {
    return { matched: true, text: `Happy to help! 😊 Anything else you'd like to know?` };
  }

  /* --- guard: things the school does not offer must not be answered with
         the nearest published topic; hand over to the office instead --- */
  if (mentionsUnavailable(q)) return fallback();

  /* --- 0. a named facility beats everything else, but only on a strong,
         specific match. Without this "computer lab" scores against the FAQ
         "Is transport facility available?" on the word "facility"; with too
         loose a threshold "streams in class 11" hits "Smart Classrooms". --- */
  let namedFacility = null;
  facilities.forEach((f) => {
    const titleTokens = tokens(f.title);
    if (!titleTokens.length) return;
    // how much of the FACILITY NAME the visitor actually typed.
    // prefix matching needs a long common stem so "class" does not claim
    // "classrooms" — that belongs to an academics question.
    const covered = titleTokens.filter((t) => qt.some((w) => {
      if (w === t) return true;
      const shorter = w.length < t.length ? w : t;
      const longer = w.length < t.length ? t : w;
      return shorter.length >= 6 && longer.startsWith(shorter);
    })).length;
    const titleCoverage = covered / titleTokens.length;
    const queryCoverage = overlapScore(qt, f.title);
    // the visitor must have named essentially the whole facility
    if (titleCoverage >= 0.75 && queryCoverage >= 0.5) {
      const s = titleCoverage + queryCoverage;
      if (!namedFacility || s > namedFacility.s) namedFacility = { s, f };
    }
  });
  if (namedFacility) {
    return {
      matched: true,
      text: `${namedFacility.f.title}\n\n${namedFacility.f.description}`,
      link: { label: 'All facilities', to: '/facilities' },
    };
  }

  /* --- 1. best matching published FAQ (highest confidence).
         Fees are handled by the dedicated branch below, which points at the
         fee-structure download; a generic FAQ match would otherwise answer a
         plain "what are the fees?" with the scholarship FAQ. --- */
  let best = null;
  faqs.forEach((f) => {
    const s = overlapScore(qt, `${f.question} ${f.category || ''}`) * 1.0
            + overlapScore(qt, f.answer) * 0.35;
    if (!best || s > best.s) best = { s, f };
  });
  const asksAboutScholarship = /scholarship|concession|discount|chhoot/i.test(q);
  const skipFaq = intent === 'fees' && !asksAboutScholarship;
  if (best && best.s >= 0.5 && !skipFaq) {
    return { matched: true, text: best.f.answer, link: { label: 'More FAQs', to: '/admissions#faqs' } };
  }

  /* --- 2. intent-specific answers built from live site data --- */
  switch (intent) {
    case 'timings':
      return {
        matched: true,
        text: `🕘 School timings: ${hours}.\n\nPre-primary classes end earlier at 12:30 PM. The school office stays open till 4:00 PM.\n\nFor anything specific, call ${phone1}.`,
      };

    case 'contact':
      return {
        matched: true,
        text: `You can reach us at:\n\n📞 ${phone1}\n📞 ${phone2}\n✉️ ${email}\n📍 ${address}\n🕘 ${hours}`,
        link: { label: 'Contact page', to: '/contact' },
      };

    case 'transport': {
      if (!busRoutes.length) return fallback();
      const lines = busRoutes.map((r) => `${r.routeNumber} — ${r.routeName}${r.timing ? ` (${r.timing})` : ''}`);
      return {
        matched: true,
        text: `🚌 Yes, we run ${busRoutes.length} bus routes:\n\n${listify(lines, 6)}\n\nFor exact stops near your home, call ${phone1}.`,
        link: { label: 'See facilities', to: '/facilities' },
      };
    }

    case 'facilities': {
      if (!facilities.length) return fallback();
      // if they named a specific facility, answer with its description
      let hit = null;
      facilities.forEach((f) => {
        const s = overlapScore(qt, f.title);
        if (s >= 0.5 && (!hit || s > hit.s)) hit = { s, f };
      });
      if (hit) {
        return {
          matched: true,
          text: `${hit.f.title}\n\n${hit.f.description}`,
          link: { label: 'All facilities', to: '/facilities' },
        };
      }
      return {
        matched: true,
        text: `Our campus facilities include:\n\n${listify(facilities.map((f) => f.title), 9)}`,
        link: { label: 'View details', to: '/facilities' },
      };
    }

    case 'downloads': {
      if (!downloads.length) return fallback();
      return {
        matched: true,
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
      text += `\n\nFor an exact figure for your child's class, please call ${phone1}.`;
      return { matched: true, text, link: { label: feeDoc ? 'Downloads' : 'Contact Us', to: feeDoc ? '/downloads' : '/contact' } };
    }

    case 'admission': {
      const procFaq = faqs.find((f) => /process/i.test(f.question));
      const text = procFaq
        ? `${procFaq.answer}\n\nYou can submit the enquiry form online — it reaches the school office directly.`
        : `Admissions are open for Session 2025-26, from Nursery to Class 12.\n\nSubmit the online enquiry form and our counsellor will call you. For immediate help, call ${phone1}.`;
      return { matched: true, text, link: { label: 'Admission Enquiry', to: '/admissions#enquiry' } };
    }

    case 'documents': {
      const docFaq = faqs.find((f) => /document/i.test(f.question));
      if (docFaq) {
        return { matched: true, text: docFaq.answer, link: { label: 'Admissions page', to: '/admissions' } };
      }
      return {
        matched: true,
        text: `Documents required at admission:\n\n• Birth Certificate\n• Aadhaar of student and parents\n• 4 passport photographs\n• Transfer Certificate (Class 2 onwards)\n• Previous report card\n• Address proof\n\nCall ${phone1} if you're missing any of these.`,
        link: { label: 'Admissions page', to: '/admissions' },
      };
    }

    case 'classes':
      return {
        matched: true,
        text: `We offer classes from Nursery to Class 12 (CGBSE).\n\nAge criteria as on 31st March:\n• Nursery — 3+ years\n• LKG — 4+ years\n• UKG — 5+ years\n• Class 1 — 6+ years\n\nFor Class 2 and above, admission depends on seat availability and a placement assessment.`,
        link: { label: 'Age criteria', to: '/admissions#age' },
      };

    case 'board': {
      const boardFaq = faqs.find((f) => /board|affiliat|stream/i.test(f.question));
      if (boardFaq) {
        return { matched: true, text: boardFaq.answer, link: { label: 'Academics', to: '/academics' } };
      }
      return {
        matched: true,
        text: `We are affiliated to CGBSE (Chhattisgarh Board of Secondary Education) and teach from Nursery to Class 12.\n\nClass 11–12 streams: Science (PCM / PCB), Commerce and Humanities.`,
        link: { label: 'Academics', to: '/academics' },
      };
    }

    case 'results': {
      const relevant = achievements.filter((a) => /academic|result|board/i.test(`${a.category} ${a.title}`));
      const src = relevant.length ? relevant : achievements;
      if (!src.length) return fallback();
      return {
        matched: true,
        text: `Our recent academic record:\n\n${listify(src.map((a) => `${a.title}${a.year ? ` (${a.year})` : ''}`), 5)}`,
        link: { label: 'Achievements', to: '/achievements' },
      };
    }

    case 'achievements': {
      if (!achievements.length) return fallback();
      return {
        matched: true,
        text: `Recent achievements:\n\n${listify(achievements.map((a) => `${a.title}${a.studentName ? ` — ${a.studentName}` : ''}${a.year ? ` (${a.year})` : ''}`), 5)}`,
        link: { label: 'All achievements', to: '/achievements' },
      };
    }

    case 'news': {
      if (!news.length) return fallback();
      return {
        matched: true,
        text: `Latest from campus:\n\n${listify(news.map((n) => n.title), 5)}`,
        link: { label: 'News & Events', to: '/news-events' },
      };
    }

    case 'faculty': {
      if (!faculty.length) return fallback();
      return {
        matched: true,
        text: `We have ${faculty.length}+ qualified teachers across all departments.\n\nA few of them:\n${listify(faculty.map((f) => `${f.name} — ${f.designation}${f.qualification ? `, ${f.qualification}` : ''}`), 4)}`,
        link: { label: 'Meet our faculty', to: '/about#faculty' },
      };
    }

    default:
      break;
  }

  /* --- 3. looser FAQ match before giving up --- */
  if (best && best.s >= 0.3 && !skipFaq) {
    return { matched: true, text: best.f.answer, link: { label: 'More FAQs', to: '/admissions#faqs' } };
  }

  /* --- 4. nothing published about it --- */
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
