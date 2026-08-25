const express = require('express');
const router = express.Router();
const { getActivePopup, getAllPopups, createPopup, updatePopup, deletePopup } = require('../controllers/popupController');
const auth = require('../middleware/auth');

router.get('/active', getActivePopup);
router.get('/', auth, getAllPopups);
router.post('/', auth, createPopup);
router.put('/:id', auth, updatePopup);
router.delete('/:id', auth, deletePopup);

module.exports = router;
