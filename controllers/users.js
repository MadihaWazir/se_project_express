const User = require("../models/user");
const { ERROR_MESSAGES } = require("../utils/errors");





// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(ERROR_MESSAGES.BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
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
        return res.status(ERROR_MESSAGES.BAD_REQUEST).send({ message: "Invalid user ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        return res.status(ERROR_MESSAGES.NOT_FOUND).send({ message: "User not found" });
=======
        return res.status(ERROR_MESSAGE.NOT_FOUND).send({ message: "User not found" });
>>>>>>> 104fd0bf079e20e407f8a1403f63fac55825c5c8
=======
        return res.status(ERROR_MESSAGE.NOT_FOUND).send({ message: "User not found" });
>>>>>>> 104fd0bf079e20e407f8a1403f63fac55825c5c8
=======
        return res.status(ERROR_MESSAGE.NOT_FOUND).send({ message: "User not found" });
>>>>>>> 104fd0bf079e20e407f8a1403f63fac55825c5c8
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getUsers, createUser, getUser };
 
 
