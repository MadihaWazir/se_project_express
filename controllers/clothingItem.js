const ClothingItem = require("../models/clothingItem");
const { ERROR_MESSAGES } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
    likes: [],
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(ERROR_MESSAGES.BAD_REQUEST).send({
          message: "Invalid data",
        });
      }
      return res
        .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) =>
      res.status(200).send({ message: "Item deleted successfully", item }),
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_MESSAGES.BAD_REQUEST)
          .send({ message: "Error from deleteItem" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_MESSAGES.NOT_FOUND).send({
          message: ERROR_MESSAGES.NOT_FOUND.message,
          err: "Item not found",
        });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_MESSAGES.BAD_REQUEST)
          .send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_MESSAGES.NOT_FOUND)
          .send({ message: "Item not found" });
      }
      return res
        .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_MESSAGES.BAD_REQUEST)
          .send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_MESSAGES.NOT_FOUND)
          .send({ message: "Item not found" });
      }
      return res
        .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,

  deleteItem,
  likeItem,
  unlikeItem,
};
