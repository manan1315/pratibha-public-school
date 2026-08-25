const express = require('express');
const router = express.Router();
const { submitEnquiry, getEnquiries, updateEnquiry, deleteEnquiry } = require('../controllers/enquiryController');
const auth = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');

router.post('/', formLimiter, submitEnquiry);
router.get('/', auth, getEnquiries);
router.put('/:id', auth, updateEnquiry);
router.delete('/:id', auth, deleteEnquiry);

module.exports = router;
