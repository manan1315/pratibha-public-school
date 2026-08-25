const express = require('express');
const router = express.Router();
const { getSliders, getAllSliders, createSlider, updateSlider, deleteSlider } = require('../controllers/sliderController');
const auth = require('../middleware/auth');

router.get('/', getSliders);
router.get('/all', auth, getAllSliders);
router.post('/', auth, createSlider);
router.put('/:id', auth, updateSlider);
router.delete('/:id', auth, deleteSlider);

module.exports = router;
