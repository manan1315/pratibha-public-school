const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers, deleteSubscriber } = require('../controllers/subscriberController');
const auth = require('../middleware/auth');

router.post('/', subscribe);
router.get('/', auth, getSubscribers);
router.delete('/:id', auth, deleteSubscriber);

module.exports = router;
