const express = require('express');
const router = express.Router();
const { incrementVisitor, getVisitorCount } = require('../controllers/visitorController');

router.get('/increment', incrementVisitor);
router.get('/', getVisitorCount);

module.exports = router;
