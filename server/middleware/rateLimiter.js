const rateLimit = require('express-rate-limit');

const isProd = process.env.NODE_ENV === 'production';

// General API limiter — generous in development so the admin panel
// (which fires many requests per screen) never gets locked out.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 300 : 5000,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS',
});

// Login attempts — keep this strict even in dev, but not so strict
// that testing the login becomes impossible.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 10 : 100,
  message: { message: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public form submissions (enquiry / contact) — anti-spam.
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isProd ? 5 : 100,
  message: { message: 'Too many submissions, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiLimiter, authLimiter, formLimiter };
