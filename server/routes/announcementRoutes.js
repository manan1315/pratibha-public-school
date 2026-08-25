const express = require('express');
const router = express.Router();
const { getAnnouncements, getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const auth = require('../middleware/auth');

router.get('/', getAnnouncements);
router.get('/all', auth, getAllAnnouncements);
router.post('/', auth, createAnnouncement);
router.put('/:id', auth, updateAnnouncement);
router.delete('/:id', auth, deleteAnnouncement);

module.exports = router;
