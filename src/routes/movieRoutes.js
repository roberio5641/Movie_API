const express = require('express');
const router = express.Router();
const {
    createMovie,
    getMovies,
    getMovie,
    rateMovie,
    toggleFavorite
} = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, createMovie);
router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/:id/rate', protect, rateMovie);
router.post('/:id/favorite', protect, toggleFavorite);

module.exports = router;