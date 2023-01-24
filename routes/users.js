const userRoutes = require('express').Router();
const { getInfoTheUser, updateInfoUser } = require('../controllers/users');
const { validationUpdateInfoUser } = require('../utils/handlersvalidation');

userRoutes.get('/me', getInfoTheUser);

userRoutes.patch('/me', validationUpdateInfoUser, updateInfoUser);

module.exports = userRoutes;
