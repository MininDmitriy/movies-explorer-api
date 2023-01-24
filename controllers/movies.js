const Movie = require('../models/movie');
const { message, SUCCESS, CREATED } = require('../helpers/constants');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).populate(['owner']);
    return res.status(SUCCESS).json(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      createdAt, country, director, duration,
      year, description, image, trailerLink,
      nameRU, nameEN, thumbnail, movieId, _id, owner,
    } = await Movie.create({
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
      thumbnail: req.body.thumbnail,
      movieId: req.body.movieId,
      owner: req.user._id,
    });
    return res.status(CREATED).json({
      createdAt,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      _id,
      owner: { _id: owner },
    });
  } catch (err) {
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;
    const movie = await Movie.findByIdAndRemove(movieId);
    if (movie === null) {
      return next(new NotFoundError(message.errorNotFound.movieId));
    }
    if (userId !== JSON.stringify(movie.owner).replace(/\W/g, '')) {
      return next(new ForbiddenError(message.errorForbidden));
    }
    return res.status(SUCCESS).json({ message: message.success.movieDelete });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
