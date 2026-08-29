const crypto = require('crypto');

/**
 * Simple math CAPTCHA.
 *
 * The server generates a random arithmetic problem, stores the expected
 * answer server-side (in-memory), and sends the question to the client.
 * The client must submit the correct answer along with the login request.
 *
 * In production you'd store the answer in Redis or a signed cookie — this
 * keeps the dependency list small while still stopping scripted attacks.
 */
const captchaStore = new Map(); // token -> { answer, expires }

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

  const token = crypto.randomBytes(24).toString('hex');
  captchaStore.set(token, { answer, expires: Date.now() + 5 * 60 * 1000 });

  return { token, question: `${a} ${op} ${b} = ?` };
};

const verifyCaptcha = (token, userAnswer) => {
  const record = captchaStore.get(token);
  if (!record) return { valid: false, message: 'CAPTCHA expired. Please refresh.' };
  if (Date.now() > record.expires) {
    captchaStore.delete(token);
    return { valid: false, message: 'CAPTCHA expired. Please refresh.' };
  }

  const correct = parseInt(userAnswer, 10) === record.answer;
  captchaStore.delete(token); // one-time use
  return correct
    ? { valid: true }
    : { valid: false, message: 'Incorrect CAPTCHA answer. Please try again.' };
};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, record] of captchaStore) {
    if (now > record.expires) captchaStore.delete(token);
  }
}, 5 * 60 * 1000);

module.exports = { generateCaptcha, verifyCaptcha };
