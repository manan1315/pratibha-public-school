const express = require('express');
const router = express.Router();
const { getDownloads, createDownload, updateDownload, deleteDownload } = require('../controllers/downloadController');
const auth = require('../middleware/auth');

router.get('/', getDownloads);
router.post('/', auth, createDownload);
router.put('/:id', auth, updateDownload);
router.delete('/:id', auth, deleteDownload);

module.exports = router;
