const express = require('express');
const router = express.Router();
const { submitContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const auth = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');

router.post('/', formLimiter, submitContact);
router.get('/', auth, getContacts);
router.put('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

module.exports = router;
