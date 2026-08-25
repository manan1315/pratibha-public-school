const express = require('express');
const router = express.Router();
const { getLeadership, getAllLeadership, createLeadership, updateLeadership, deleteLeadership } = require('../controllers/leadershipController');
const auth = require('../middleware/auth');

router.get('/', getLeadership);
router.get('/all', auth, getAllLeadership);
router.post('/', auth, createLeadership);
router.put('/:id', auth, updateLeadership);
router.delete('/:id', auth, deleteLeadership);

module.exports = router;
