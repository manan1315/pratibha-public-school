const express = require('express');
const router = express.Router();
const { getStudentLeaders, getAllStudentLeaders, createStudentLeader, updateStudentLeader, deleteStudentLeader } = require('../controllers/studentLeaderController');
const auth = require('../middleware/auth');

router.get('/', getStudentLeaders);
router.get('/all', auth, getAllStudentLeaders);
router.post('/', auth, createStudentLeader);
router.put('/:id', auth, updateStudentLeader);
router.delete('/:id', auth, deleteStudentLeader);

module.exports = router;
