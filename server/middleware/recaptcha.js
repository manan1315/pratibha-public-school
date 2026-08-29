const crypto = require('crypto');
const axios = require('axios');

/**
 * Google reCAPTCHA v2 verification.
 *
 * Frontend sends the reCAPTCHA token after the user ticks the checkbox.
 * Server verifies it with Google's siteverify API using the secret key.
 *
 * Test keys (always pass):
 *   site key:  6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
 *   secret:    6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
 *
 * Production: replace with keys from https://www.google.com/recaptcha/admin
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

/**
 * Verify a reCAPTCHA token with Google.
 */
const verifyRecaptcha = async (token) => {
  try {
    const params = new URLSearchParams();
    params.append('secret', RECAPTCHA_SECRET);
    params.append('response', token);

    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 8000 }
    );

    // data = { success: true, challenge_ts: "...", hostname: "...", score: ... }
    return { valid: !!data.success, data };
  } catch (err) {
    return { valid: false, message: 'CAPTCHA verification failed. Please try again.' };
  }
};

module.exports = { verifyRecaptcha };
