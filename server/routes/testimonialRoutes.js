const express = require('express');
const router = express.Router();
const { getTestimonials, getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const auth = require('../middleware/auth');

router.get('/', getTestimonials);
router.get('/all', auth, getAllTestimonials);
router.post('/', auth, createTestimonial);
router.put('/:id', auth, updateTestimonial);
router.delete('/:id', auth, deleteTestimonial);

module.exports = router;
