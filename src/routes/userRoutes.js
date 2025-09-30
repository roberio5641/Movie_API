const express = require('express');
const router = express.Router();
const { getMe, getFavorite } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.get('/me', protect, getMe);
router.get('/favorites', protect, getFavorite);

module.exports = router;