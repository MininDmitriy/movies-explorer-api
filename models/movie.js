const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(http|https):\/\/[^ "]+$/.test(value),
      message: 'Невалидный URL постера к фильму!',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(http|https):\/\/[^ "]+$/.test(value),
      message: 'Невалидный URL трейлера фильма!',
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^(http|https):\/\/[^ "]+$/.test(value),
      message: 'Невалидный URL миниатюрного изображения постера!',
    },
  },
  movieId: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
