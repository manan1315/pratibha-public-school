/**
 * One-time migration: replace all CGBSE references with CBSE in the database.
 *
 * Usage: node scripts/migrateCGBSE.js
 *
 * This updates all collections that may contain CGBSE text.
 */
require('dotenv').config();
const mongoose = require('mongoose');

const collections = [
  { model: 'Slider', fields: ['text', 'buttonText'] },
  { model: 'News', fields: ['title', 'content'] },
  { model: 'About', fields: ['content', 'title'] },
  { model: 'Facility', fields: ['title', 'description'] },
  { model: 'Achievement', fields: ['title', 'description', 'studentName'] },
  { model: 'Testimonial', fields: ['name', 'relation', 'quote'] },
  { model: 'Faq', fields: ['question', 'answer'] },
  { model: 'Announcement', fields: ['title', 'content'] },
  { model: 'Download', fields: ['title', 'description'] },
  { model: 'Gallery', fields: ['caption', 'albumName'] },
  { model: 'Settings', fields: ['value'] },
];

(async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 });
  console.log('Connected to MongoDB\n');

  let totalUpdated = 0;

  for (const { model: modelName, fields } of collections) {
    let Model;
    try {
      Model = require(`../models/${modelName}`);
    } catch {
      console.log(`${modelName}: model not found, skipping`);
      continue;
    }

    const docs = await Model.find({});
    let updated = 0;

    for (const doc of docs) {
      let modified = false;
      for (const field of fields) {
        const val = doc.get(field);
        if (typeof val === 'string' && /CGBSE/i.test(val)) {
          doc.set(field, val.replace(/CGBSE/gi, 'CBSE').replace(/Chhattisgarh Board of Secondary Education/g, 'Central Board of Secondary Education'));
          modified = true;
        }
      }
      if (modified) {
        await doc.save();
        updated++;
      }
    }

    if (updated > 0) {
      console.log(`${modelName}: ${updated} document(s) updated`);
      totalUpdated += updated;
    }
  }

  console.log(`\nTotal: ${totalUpdated} document(s) updated`);
  await mongoose.disconnect();
  process.exit(0);
})();
