const express = require('express');
const router = express.Router();
const { getBusRoutes, getAllBusRoutes, createBusRoute, updateBusRoute, deleteBusRoute } = require('../controllers/busRouteController');
const auth = require('../middleware/auth');

router.get('/', getBusRoutes);
router.get('/all', auth, getAllBusRoutes);
router.post('/', auth, createBusRoute);
router.put('/:id', auth, updateBusRoute);
router.delete('/:id', auth, deleteBusRoute);

module.exports = router;
