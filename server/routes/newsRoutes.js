const express = require('express');
const router = express.Router();
const { getNews, getFeaturedNews, getAllNews, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const auth = require('../middleware/auth');

router.get('/', getNews);
router.get('/featured', getFeaturedNews);
router.get('/all', auth, getAllNews);
router.post('/', auth, createNews);
router.put('/:id', auth, updateNews);
router.delete('/:id', auth, deleteNews);

module.exports = router;
