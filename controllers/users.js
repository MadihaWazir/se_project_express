const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { ERROR_MESSAGES } = require("../utils/errors");





// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => 
  User.create({ name, avatar, email, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(ERROR_MESSAGES.CONFLICT.status).send({ message: "User with this email already exists" });
      }
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: "Invalid data" });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: "Invalid user ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_MESSAGES.NOT_FOUND.status).send({ message: "User not found" });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserbyCredentials(email, password)
    .then((user) => {

      const token = jwt.sign({_id: user._id }, JWT_SECRET, { expiresIn: "7d", });
      res.send({ token });
     }); 
        return res.status(ERROR_MESSAGES.UNAUTHORIZED_ERROR.status).send({ message: "Authentication failed" });
      
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
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: "Invalid data" });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: "An error has occurred on the server" });
    });
  };

  const updateCurrentUser = (req, res) => {
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
          return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: "Invalid data" });
        }
        return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: "An error has occurred on the server" });
      });
  };

  
module.exports = { getUsers, createUser, getUser, login, updateUser, updateCurrentUser };
 
 
