const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,

  ForbiddenError,
} = require("../utils/errors");
const { ERROR_MESSAGES } = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner,
    likes: [],
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error("Error in getItems:", err);
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message));
      }
      if (item.owner.toString() !== userId) {
        return next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN_ERROR.message));
      }

      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) =>
        res.status(200).send({
          message: "Item deleted successfully",
          item: deletedItem,
        })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message));
      }
      return next(err);
    });
};

const unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message));
      }
      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
