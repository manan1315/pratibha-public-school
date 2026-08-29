const crypto = require('crypto');

/**
 * Self-contained CAPTCHA — no in-memory store needed.
 *
 * The question and answer are encoded into a signed token (HMAC).
 * The client cannot forge the answer without the server secret.
 * No database, no Redis, no in-memory store — works across instances.
 */

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || 'ppsbasna_captcha_secret_2025_render';

function signPayload(payload) {
  const data = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', CAPTCHA_SECRET).update(data).digest('hex');
  return Buffer.from(JSON.stringify({ data, hmac })).toString('base64url');
}

function verifySignedToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    const { data, hmac } = decoded;
    const expected = crypto.createHmac('sha256', CAPTCHA_SECRET).update(data).digest('hex');
    if (hmac !== expected) return null; // tampered
    const payload = JSON.parse(data);
    if (payload.exp < Date.now()) return null; // expired
    return payload;
  } catch {
    return null;
  }
}

const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const op = ['+', '-', '×'][Math.floor(Math.random() * 3)];

  let answer;
  switch (op) {
    case '+': answer = a + b; break;
    case '-': answer = a - b; break;
    case '×': answer = a * b; break;
  }

  const token = signPayload({ a, b, op, answer, exp: Date.now() + 5 * 60 * 1000 });
  return { token, question: `${a} ${op} ${b} = ?` };
};

const verifyCaptcha = (token, userAnswer) => {
  const payload = verifySignedToken(token);
  if (!payload) return { valid: false, message: 'CAPTCHA expired. Please refresh.' };

  if (Number(userAnswer) !== payload.answer) {
    return { valid: false, message: 'Incorrect CAPTCHA answer. Please try again.' };
  }
  return { valid: true };
};

module.exports = { generateCaptcha, verifyCaptcha };
