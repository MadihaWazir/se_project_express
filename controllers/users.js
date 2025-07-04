const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { ERROR_MESSAGES } = require("../utils/errors");

// GET /users

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(201).send(userObject);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(ERROR_MESSAGES.CONFLICT_ERROR.status)
          .send({ message: "User with this email already exists" });
      }
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_MESSAGES.BAD_REQUEST.status)
          .send({ message: "Invalid data" });
      }
      return res
        .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(ERROR_MESSAGES.BAD_REQUEST.status)
      .send({ message: "Email and password are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_MESSAGES.BAD_REQUEST.status)
          .send({ message: "Authentication failed" });
      }
      if (err.message === "Incorrect email and password") {
        return res
          .status(ERROR_MESSAGES.UNAUTHORIZED_ERROR.status)
          .send({ message: "Incorrect email and password" });
      }
      return res
        .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_MESSAGES.BAD_REQUEST.status)
          .send({ message: "Invalid data" });
      }
      return res
        .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_MESSAGES.BAD_REQUEST.status)
          .send({ message: "Invalid data" });
      }
      return res
        .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { createUser, login, updateUser, getCurrentUser };
