const express = require("express");

const router = express.Router();

const {
  validateCreateClothingItem,
  validateId,
} = require("../middlewares/validation");

const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
  getItems,
} = require("../controllers/clothingItem");

router.get("/", getItems);

router.post("/item", validateCreateClothingItem, createItem);

router.delete("/items/:itemId", validateId, deleteItem);

router.put("/items/:itemId/likes", validateId, likeItem);

router.delete("/items/:itemId/likes", validateId, unlikeItem);

module.exports = router;
