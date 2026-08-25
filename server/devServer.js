/**
 * Development bootstrap.
 * Starts an embedded MongoDB (real mongod binary, managed automatically),
 * stores data on disk so it PERSISTS between restarts,
 * seeds the admin user + demo content, then boots the Express API.
 *
 * Usage: npm run dev:full
 */
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const { MongoMemoryServer } = require('mongodb-memory-server');

let DB_DIR = path.join(__dirname, '.mongo-db');

(async () => {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

  // Clear a stale lock left behind by an unclean shutdown
  const lock = path.join(DB_DIR, 'mongod.lock');
  if (fs.existsSync(lock)) {
    try {
      fs.unlinkSync(lock);
      console.log('Removed stale mongod.lock');
    } catch {
      DB_DIR = path.join(__dirname, `.mongo-db-${Date.now()}`);
      fs.mkdirSync(DB_DIR, { recursive: true });
      console.log('mongod.lock held by another process — using fresh dir', path.basename(DB_DIR));
    }
  }

  console.log('Starting embedded MongoDB (first run downloads the binary, please wait)...');

  const mongo = await MongoMemoryServer.create({
    instance: {
      dbName: 'ppsbasna',
      dbPath: DB_DIR,
      storageEngine: 'wiredTiger',
    },
  });

  const uri = mongo.getUri('ppsbasna');
  process.env.MONGODB_URI = uri;
  console.log('MongoDB ready at', uri);

  // Seed data before the API starts serving
  await require('./seeders/seedAll')(uri);

  // Boot Express
  require('./server');

  const shutdown = async () => {
    console.log('\nShutting down embedded MongoDB...');
    await mongo.stop();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
})().catch((err) => {
  console.error('Failed to start dev environment:', err);
  process.exit(1);
});
