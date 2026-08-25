const express = require('express');
const router = express.Router();
const { getAbout, createAbout, updateAbout, deleteAbout } = require('../controllers/aboutController');
const auth = require('../middleware/auth');

router.get('/', getAbout);
router.post('/', auth, createAbout);
router.put('/:id', auth, updateAbout);
router.delete('/:id', auth, deleteAbout);

module.exports = router;
