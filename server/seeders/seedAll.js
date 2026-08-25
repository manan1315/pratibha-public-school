/**
 * Idempotent full seeder.
 * Only inserts into a collection when it is empty, so admin edits are never
 * overwritten on restart. Called by devServer.js, also runnable standalone.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Settings = require('../models/Settings');
const Slider = require('../models/Slider');
const About = require('../models/About');
const Leadership = require('../models/Leadership');
const Faculty = require('../models/Faculty');
const StudentLeader = require('../models/StudentLeader');
const News = require('../models/News');
const Event = require('../models/Event');
const Album = require('../models/Album');
const Gallery = require('../models/Gallery');
const Achievement = require('../models/Achievement');
const Testimonial = require('../models/Testimonial');
const Facility = require('../models/Facility');
const FAQ = require('../models/FAQ');
const Announcement = require('../models/Announcement');
const BusRoute = require('../models/BusRoute');
const Download = require('../models/Download');
const Popup = require('../models/Popup');
const Visitor = require('../models/Visitor');

const { sliders, announcements } = require('./data/sliders');
const { news, events } = require('./data/news');
const { leadership, faculty, studentLeaders } = require('./data/people');
const { achievements, testimonials, faqs } = require('./data/content');
const { facilities, busRoutes, downloads, popup } = require('./data/facilities');
const { albums, albumImages, about } = require('./data/gallery');

async function fill(Model, docs, label) {
  const count = await Model.countDocuments();
  if (count > 0) return `${label}: kept ${count}`;
  await Model.insertMany(docs);
  return `${label}: seeded ${docs.length}`;
}

module.exports = async function seedAll(uri) {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri || process.env.MONGODB_URI);
  }

  const log = [];

  // Admin user
  if ((await User.countDocuments()) === 0) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'PPS@admin2025', 12);
    await User.create({
      name: 'School Admin',
      email: process.env.ADMIN_EMAIL || 'admin@ppsbasna.com',
      password: hash,
      role: 'admin',
    });
    log.push('admin: created');
  } else {
    log.push('admin: exists');
  }

  // Settings singleton
  if ((await Settings.countDocuments()) === 0) {
    await Settings.create({
      socialLinks: {
        facebook: 'https://facebook.com/',
        instagram: 'https://instagram.com/',
        youtube: 'https://youtube.com/',
        twitter: 'https://twitter.com/',
        whatsapp: '+919111107333',
      },
      parentPortalLink: '/contact',
      feePaymentLink: '/contact',
    });
    log.push('settings: seeded');
  } else {
    log.push('settings: exists');
  }

  log.push(await fill(Slider, sliders, 'sliders'));
  log.push(await fill(About, about, 'about'));
  log.push(await fill(Leadership, leadership, 'leadership'));
  log.push(await fill(Faculty, faculty, 'faculty'));
  log.push(await fill(StudentLeader, studentLeaders, 'studentLeaders'));
  log.push(await fill(News, news, 'news'));
  log.push(await fill(Event, events, 'events'));
  log.push(await fill(Achievement, achievements, 'achievements'));
  log.push(await fill(Testimonial, testimonials, 'testimonials'));
  log.push(await fill(Facility, facilities, 'facilities'));
  log.push(await fill(FAQ, faqs, 'faqs'));
  log.push(await fill(Announcement, announcements, 'announcements'));
  log.push(await fill(BusRoute, busRoutes, 'busRoutes'));
  log.push(await fill(Download, downloads, 'downloads'));

  // Albums + their images (needs album ids)
  if ((await Album.countDocuments()) === 0) {
    const created = await Album.insertMany(albums);
    const imgDocs = [];
    created.forEach((album, i) => {
      (albumImages[i] || []).forEach((img) => imgDocs.push({ ...img, albumId: album._id }));
    });
    await Gallery.insertMany(imgDocs);
    log.push(`gallery: seeded ${created.length} albums / ${imgDocs.length} images`);
  } else {
    log.push('gallery: kept');
  }

  if ((await Popup.countDocuments()) === 0) {
    await Popup.create(popup);
    log.push('popup: seeded');
  } else {
    log.push('popup: kept');
  }

  if ((await Visitor.countDocuments()) === 0) {
    await Visitor.create({ count: 1284 });
    log.push('visitor: seeded');
  } else {
    log.push('visitor: kept');
  }

  console.log('Seed summary:\n  ' + log.join('\n  '));
  return log;
};

// standalone run
if (require.main === module) {
  require('dotenv').config();
  module.exports(process.env.MONGODB_URI)
    .then(() => process.exit(0))
    .catch((e) => { console.error(e); process.exit(1); });
}
