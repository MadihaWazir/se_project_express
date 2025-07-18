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
} = require("../controllers/clothingItem");

router.post("/item", validateCreateClothingItem, createItem);

router.put("/items/:itemId/likes", validateId, likeItem);
router.delete("/items/:itemId", validateId, deleteItem);
router.delete("/items/:itemId/likes", validateId, unlikeItem);

module.exports = router;
