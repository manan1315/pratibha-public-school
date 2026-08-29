const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const isProd = process.env.NODE_ENV === 'production';

// ============ IP Blocking ============
// Block IPs with too many failed login attempts
const failedAttempts = new Map(); // ip -> { count, firstAttempt, blocked }

const BLOCK_THRESHOLD = isProd ? 5 : 20;     // failures before block
const BLOCK_WINDOW = 15 * 60 * 1000;          // 15 minutes
const BLOCK_DURATION = 30 * 60 * 1000;        // block for 30 minutes

const ipBlocker = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const record = failedAttempts.get(ip);

  if (record && record.blocked) {
    if (Date.now() - record.blockedAt < BLOCK_DURATION) {
      return res.status(403).json({
        message: 'IP temporarily blocked due to suspicious activity. Try again later.',
      });
    }
    // Block expired — reset
    failedAttempts.delete(ip);
  }
  next();
};

const recordFailedAttempt = (ip) => {
  const now = Date.now();
  const record = failedAttempts.get(ip);

  if (!record || now - record.firstAttempt > BLOCK_WINDOW) {
    failedAttempts.set(ip, { count: 1, firstAttempt: now, blocked: false });
    return;
  }

  record.count++;
  if (record.count >= BLOCK_THRESHOLD) {
    record.blocked = true;
    record.blockedAt = now;
  }
};

const recordSuccess = (ip) => {
  failedAttempts.delete(ip);
};

// ============ Rate Limiting ============
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 300 : 5000,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS',
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 10 : 100,
  message: { message: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isProd ? 5 : 100,
  message: { message: 'Too many submissions, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============ Speed Limiter ============
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: isProd ? 50 : 200,
  delayMs: (hits) => hits * 100, // each extra hit adds 100ms delay
});

// ============ Header Validation ============
// Don't trust X-Forwarded-For — use real IP from connection
const headerValidation = (req, res, next) => {
  // Override any spoofed headers
  req.ip = req.connection.remoteAddress?.replace('::ffff:', '') || 'unknown';
  delete req.headers['x-forwarded-for'];
  delete req.headers['x-real-ip'];
  next();
};

module.exports = {
  apiLimiter,
  authLimiter,
  formLimiter,
  speedLimiter,
  ipBlocker,
  headerValidation,
  recordFailedAttempt,
  recordSuccess,
};
