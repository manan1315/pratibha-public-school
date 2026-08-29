const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { verifyRecaptcha } = require('../middleware/recaptcha');
const { recordFailedAttempt, recordSuccess } = require('../middleware/rateLimiter');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'ppsbasna_fallback_secret_2025_render_deploy';
  const expire = process.env.JWT_EXPIRE || '24h';
  return jwt.sign({ id }, secret, { expiresIn: expire });
};

exports.login = async (req, res) => {
  try {
    const { email, password, recaptchaToken } = req.body;

    // reCAPTCHA verification
    if (process.env.NODE_ENV === 'production') {
      if (!recaptchaToken) {
        return res.status(400).json({ message: 'Please complete the CAPTCHA.' });
      }
      const captchaResult = await verifyRecaptcha(recaptchaToken);
      if (!captchaResult.valid) {
        return res.status(400).json({ message: captchaResult.message || 'CAPTCHA verification failed.' });
      }
    }

    const user = await User.findOne({ email });
    if (!user) {
      recordFailedAttempt(req.ip);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      recordFailedAttempt(req.ip);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    recordSuccess(req.ip);
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

exports.verify = async (req, res) => {
  res.json({ user: req.user });
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
