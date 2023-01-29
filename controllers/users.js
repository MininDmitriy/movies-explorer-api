const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { message, SUCCESS, CREATED } = require('../helpers/constants');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { privateKey } = require('../middlewares/auth');

const getInfoTheUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    return res.status(SUCCESS).send(user);
  } catch (err) {
    return next(err);
  }
};

const updateInfoUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(userId, { email, name }, {
      new: true,
      runValidators: true,
    });
    if (user === null) {
      return next(new NotFoundError(message.errorNotFound.userId));
    }
    return res.status(SUCCESS).json(user);
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hash, name,
    });
    return res.status(CREATED).json({
      email: user.email, name: user.name,
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      return next(new UnauthorizedError(message.errorIncorrectDate.login));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new UnauthorizedError(message.errorIncorrectDate.login));
    }
    const payload = { _id: user._id };
    const token = JWT.sign(payload, privateKey, { expiresIn: '7d' });
    return res.status(SUCCESS).send({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getInfoTheUser,
  updateInfoUser,
  createUser,
  login,
};
