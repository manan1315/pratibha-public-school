const express = require('express');
const router = express.Router();
const { getAlbums, getAllAlbums, createAlbum, updateAlbum, deleteAlbum } = require('../controllers/galleryController');
const auth = require('../middleware/auth');

router.get('/', getAlbums);
router.get('/all', auth, getAllAlbums);
router.post('/', auth, createAlbum);
router.put('/:id', auth, updateAlbum);
router.delete('/:id', auth, deleteAlbum);

module.exports = router;
