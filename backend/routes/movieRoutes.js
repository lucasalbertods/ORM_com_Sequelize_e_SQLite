const express = require('express');
const router = express.Router();
const { createMovie, getUserMovies, deleteMovie, searchMoviesByName } = require('../controllers/movieController');
const { authMiddleware } = require('../middleware/auth');

router.post('/api/register/movie', authMiddleware, createMovie);
router.delete('/api/delete/:id/movie', authMiddleware, deleteMovie);
router.get('/api/users/:id/movies', authMiddleware, getUserMovies);
router.get('/api/movies/search', authMiddleware, searchMoviesByName);


module.exports = router;
