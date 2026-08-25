const express = require('express');
const router = express.Router();
const { getAchievements, getAllAchievements, createAchievement, updateAchievement, deleteAchievement } = require('../controllers/achievementController');
const auth = require('../middleware/auth');

router.get('/', getAchievements);
router.get('/all', auth, getAllAchievements);
router.post('/', auth, createAchievement);
router.put('/:id', auth, updateAchievement);
router.delete('/:id', auth, deleteAchievement);

module.exports = router;
