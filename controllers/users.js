// Add missing import
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors");
const { ERROR_MESSAGES } = require("../utils/errors");
// GET /users

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashPassword) =>
      User.create({ name, avatar, email, password: hashPassword })
    )
    .then((user) =>
      res
        .status(201)
        .send({ name: user.name, avatar: user.avatar, email: user.email })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.CONFLICT_ERROR.message)); // Fixed
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message)); // Fixed
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({
        token,
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.message === "Incorrect email and password") {
        return next(
          new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED_ERROR.message)
        );
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message));
      }
      return res.status(200).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message));
      }
      return res.status(200).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      return next(err);
    });
};

module.exports = { createUser, login, updateUser, getCurrentUser };
