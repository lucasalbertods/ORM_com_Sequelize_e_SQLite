const Movie = require('../models/Movie');
const User = require('../models/User');
require('dotenv').config();

const createMovie = async (req, res) => {
  try {
    const {
      title,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      vote_average,
      genres,
      imdb_id,
      trailer_url,
      userId
    } = req.body;
    const movie = await Movie.create({
      title,
      overview,
      poster_path,
      backdrop_path,
      release_date,
      vote_average,
      genres,
      imdb_id,
      trailer_url,
      userId
    });
    res.status(201).json({ message: 'Filme criado', movie });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar filme', error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }

    await movie.destroy();
    return res.status(200).json({ message: 'Filme deletado com sucesso' });

  } catch (error) {
    console.error('Erro ao deletar filme', error);
    res.status(500).json({ message: 'Erro ao deletar filme', error });
  }
};

const searchMoviesByName = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "O nome do filme é obrigatório." });
  }

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=pt-BR&page=1&include_adult=false`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.results.length === 0) {
      return res.status(404).json({ message: "Nenhum filme encontrado." });
    }

    const filteredMovies = data.results.filter(movie => {
      const isDocumentary = movie.genre_ids && movie.genre_ids.includes(99);
      const hasGenre = movie.genre_ids && movie.genre_ids.length > 0;
      const hasBackdrop = movie.backdrop_path;
      const hasPoster = movie.poster_path;
      const isAboveAverage = movie.vote_average > 5;


      return !isDocumentary && hasGenre && hasBackdrop && hasPoster && isAboveAverage;
    });

    if (filteredMovies.length === 0) {
      return res.status(404).json({ message: "Nenhum filme encontrado com todos os requisitos." });
    }

    const moviesWithTrailers = await Promise.all(
      filteredMovies.map(async (movie) => {
        const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-EUA`;

        const trailerResponse = await fetch(trailerUrl, options);
        const trailerData = await trailerResponse.json();

        const trailer = trailerData.results.find(video =>
          video.type === 'Trailer' && video.site === 'YouTube'
        );

        return {
          ...movie,
          trailer_url: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
        };
      })
    );

    res.json(moviesWithTrailers);

  } catch (err) {
    console.error('Erro ao buscar filmes:', err);
    res.status(500).json({ message: 'Erro interno ao buscar filmes', error: err });
  }
};






const getUserMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: { model: Movie, as: 'movies' },
    });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    if (user.movies.length === 0) {
      return res.json({ message: 'Nenhum filme salvo!' });
    }

    return res.json(user.movies);

  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
};

module.exports = { createMovie, getUserMovies, deleteMovie, searchMoviesByName };
