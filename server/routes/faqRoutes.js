const express = require('express');
const router = express.Router();
const { getFAQs, getAllFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');
const auth = require('../middleware/auth');

router.get('/', getFAQs);
router.get('/all', auth, getAllFAQs);
router.post('/', auth, createFAQ);
router.put('/:id', auth, updateFAQ);
router.delete('/:id', auth, deleteFAQ);

module.exports = router;
