const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getInfoTheUser, updateInfoUser } = require('../controllers/users');

userRoutes.get('/me', getInfoTheUser);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateInfoUser);

module.exports = userRoutes;
