const express = require('express');
const router = express.Router();
const { getFacilities, getAllFacilities, createFacility, updateFacility, deleteFacility } = require('../controllers/facilityController');
const auth = require('../middleware/auth');

router.get('/', getFacilities);
router.get('/all', auth, getAllFacilities);
router.post('/', auth, createFacility);
router.put('/:id', auth, updateFacility);
router.delete('/:id', auth, deleteFacility);

module.exports = router;
