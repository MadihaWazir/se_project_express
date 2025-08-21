const express = require("express");
const {
  validateCreateClothingItem,
  validateItemId,
} = require("../middlewares/validation");

const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

const router = express.Router();

router.post("/items", validateCreateClothingItem, createItem);

router.delete("/:itemId", validateItemId, deleteItem);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, unlikeItem);

module.exports = router;
