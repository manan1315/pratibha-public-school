const express = require('express');
const router = express.Router();
const { getGalleryImages, uploadImage, updateImage, deleteImage } = require('../controllers/galleryController');
const auth = require('../middleware/auth');

router.get('/', getGalleryImages);
router.post('/', auth, uploadImage);
router.put('/:id', auth, updateImage);
router.delete('/:id', auth, deleteImage);

module.exports = router;
