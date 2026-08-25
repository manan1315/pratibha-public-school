const express = require('express');
const router = express.Router();
const { getFaculty, getAllFaculty, createFaculty, updateFaculty, deleteFaculty } = require('../controllers/facultyController');
const auth = require('../middleware/auth');

router.get('/', getFaculty);
router.get('/all', auth, getAllFaculty);
router.post('/', auth, createFaculty);
router.put('/:id', auth, updateFaculty);
router.delete('/:id', auth, deleteFaculty);

module.exports = router;
