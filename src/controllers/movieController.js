const { parse } = require('path');
const Movie = require('../models/movie');
const User = require('../models/user');
const { calculateAvarageRate } = require('../utils/calculatingRate');

const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: 'Erro do Servidor' });
    }
}

const getMovies = async (req, res) => {
    try{
        const {genre, year, title, director, page = 1, limit = 10} = req.query;

        const query = {};

        if (genre) query.genre = new RegExp(genre, 'i');
        if (year) query.year = parseInt(year);
        if (title) query.title = new RegExp(title, 'i');
        if (director) query.director = new RegExp(director, 'i');

        const movies = await Movie.find(query).limit(limit * 1).skip((page - 1) * limit).sort({ createdAt: -1 });

        const total = await Movie.countDocuments(query);

        res.json({
            movies,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        })
    } catch (error) {
        res.status(400).json({ message: 'Erro do Servidor' });
    }
}

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('ratings.user', 'name');

    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const rateMovie = async (req, res) => {
  try {
    const { rating } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }


    const existingRating = movie.ratings.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (existingRating) {
      existingRating.rating = rating;
    } else {

      movie.ratings.push({
        user: req.user._id,
        rating
      });
    }

    movie.averageRating = calculateAverageRating(movie.ratings);
    await movie.save();

    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const movieId = req.params.id;

    const isFavorite = user.favorites.includes(movieId);

    if (isFavorite) {
      user.favorites = user.favorites.filter(
        fav => fav.toString() !== movieId
      );
    } else {
      user.favorites.push(movieId);
    }

    await user.save();
    res.json({ 
      message: isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      isFavorite: !isFavorite 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovie,
  rateMovie,
  toggleFavorite
};