/**
 * Exercises the PPS Bot answer engine against the LIVE site data.
 *
 * Verifies two things:
 *   1. questions the school HAS published get a real, data-backed answer
 *   2. questions it has NOT published fall back to the phone number
 *
 * Run: node scripts/botTest.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { pathToFileURL } from 'url';

const API = process.env.API || 'http://localhost:5080/api';
const BRAIN = new URL('../../client/src/components/ChatBot/botBrain.js', import.meta.url);

// botBrain.js is an ES module with no JSX — import it directly
const { answer } = await import(BRAIN.href);

const get = async (p, fb) => {
  try {
    const r = await fetch(API + p);
    return r.ok ? await r.json() : fb;
  } catch {
    return fb;
  }
};

const data = {
  faqs: await get('/faqs', []),
  facilities: await get('/facilities', []),
  busRoutes: await get('/bus-routes', []),
  downloads: await get('/downloads', []),
  settings: await get('/settings', {}),
  news: await get('/news', []),
  achievements: await get('/achievements', []),
  faculty: await get('/faculty', []),
};

console.log('Live data loaded:',
  `${data.faqs.length} FAQs, ${data.facilities.length} facilities,`,
  `${data.busRoutes.length} routes, ${data.downloads.length} downloads,`,
  `${data.achievements.length} achievements\n`);

const phone = data.settings.phone1 || '+91-91111-07333';

/* ---- questions the site HAS information about ---- */
const shouldAnswer = [
  ['What is the admission process?',        /enquiry|counsel|assessment|admission/i],
  ['admission kaise hoga',                  /enquiry|counsel|assessment|admission/i],
  ['What are the school timings?',          /8:00|timing|Mon/i],
  ['school ka time kya hai',                /8:00|timing|Mon/i],
  ['Is bus facility available?',            /R-\d|route|bus/i],
  ['bus route batao',                       /R-\d|route|bus/i],
  ['Which board are you affiliated to?',    /CGBSE/i],
  ['What documents are required?',          /birth|aadhaar|certificate/i],
  ['Tell me about fees',                    /fee|structure|scholarship/i],
  ['fees kitni hai',                        /fee|structure|scholarship/i],
  ['Do you give scholarships?',             /scholarship|merit|concession/i],
  ['What facilities do you have?',          /Library|Lab|Classroom|Sports/i],
  ['Do you have a library?',                /librar/i],
  ['computer lab hai kya',                  /computer|lab/i],
  ['What streams in class 11?',             /Science|Commerce|Humanities/i],
  ['What is your phone number?',            new RegExp(phone.replace(/[+]/g, '\\+'))],
  ['contact number',                        new RegExp(phone.replace(/[+]/g, '\\+'))],
  ['What can I download?',                  /Fee Structure|Calendar|Admission Form|Certificate/i],
  ['Tell me about your results',            /%|Topper|CGBSE|result|award/i],
  ['achievements batao',                    /award|champion|topper|medal|gold|silver/i],
  ['Who are your teachers?',                /teacher|M\.Sc|M\.A|HOD|qualified/i],
  ['latest news',                           /\w{4,}/],
  ['What is the age for nursery?',          /3\+|Nursery|age/i],
  ['hello',                                 /Namaste|Welcome/i],
];

/* ---- questions the site has NO information about -> must give phone ---- */
const shouldFallback = [
  'Do you have a swimming pool?',
  'Is there a horse riding club?',
  'Can my child learn violin here?',
  'Do you offer IB curriculum?',
  'What is the CEO salary?',
  'Do you have a rooftop helipad?',
];

let pass = 0, fail = 0;
const failures = [];

console.log('ANSWERED FROM WEBSITE DATA');
console.log('-'.repeat(64));
for (const [q, expect] of shouldAnswer) {
  const res = answer(q, data);
  const ok = res.matched && expect.test(res.text);
  if (ok) { pass++; console.log(`  PASS  ${q}`); }
  else {
    fail++;
    console.log(`  FAIL  ${q}`);
    failures.push({ q, got: res.text.slice(0, 110).replace(/\n/g, ' ') });
  }
}

console.log('\nNOT ON THE WEBSITE -> should give the phone number');
console.log('-'.repeat(64));
for (const q of shouldFallback) {
  const res = answer(q, data);
  const givesPhone = res.text.includes(phone);
  const ok = !res.matched && givesPhone;
  if (ok) { pass++; console.log(`  PASS  ${q}`); }
  else {
    fail++;
    console.log(`  FAIL  ${q}  (matched=${res.matched}, phone=${givesPhone})`);
    failures.push({ q, got: res.text.slice(0, 110).replace(/\n/g, ' ') });
  }
}

if (failures.length) {
  console.log('\nDETAIL');
  console.log('-'.repeat(64));
  failures.forEach((f) => console.log(`  Q: ${f.q}\n  A: ${f.got}\n`));
}

console.log('-'.repeat(64));
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
