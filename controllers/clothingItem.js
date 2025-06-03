const ClothingItem = require("../models/clothingItem");
const ERROR_MESSAGES = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageURL,
    owner: req.user._id,
    likes: [],
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          err: err.message,
        });
      }
      return res.status(500).send({ message: "Error from createItem", err });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error from getItems", err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) =>
      res.status(204).send({ message: "Item deleted successfully", item }),
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(500).send({ message: "Error from deleteItem", err });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: ERROR_MESSAGES.NOT_FOUND.message,
          err: "Item not found",
        });
      }
      return res.status(404).send({
        message: ERROR_MESSAGES.NOT_FOUND.message,
        err: "Item not found",
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
        return res.status(400).send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(500).send({ message: "Error from likeItem", err });
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
        return res.status(400).send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(500).send({ message: "Error from unlikeItem", err });
    });
};

module.exports = {
  createItem,
  getItems,

  deleteItem,
  likeItem,
  unlikeItem,
};
