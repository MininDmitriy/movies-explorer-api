const routes = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { message } = require('../helpers/constants');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { checkAuth } = require('../middlewares/auth');
const { validationLogin, validationCreateUser } = require('../utils/handlersvalidation');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт!');
  }, 0);
});

routes.post('/signin', validationLogin, login);

routes.post('/signup', validationCreateUser, createUser);

routes.use('/users', checkAuth, userRoutes);

routes.use('/cards', checkAuth, movieRoutes);

routes.use('*', (req, res, next) => next(new NotFoundError(message.errorNotFound.page)));

module.exports = routes;
