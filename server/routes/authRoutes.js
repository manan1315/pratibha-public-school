const express = require('express');
const router = express.Router();
const { login, logout, verify, changePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/verify', auth, verify);
router.put('/change-password', auth, changePassword);

module.exports = router;
