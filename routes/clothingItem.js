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

router.post("/", validateCreateClothingItem, createItem);

router.delete("/:itemId", validateId, deleteItem);
router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, unlikeItem);

module.exports = router;
