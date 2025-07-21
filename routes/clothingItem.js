const express = require("express");

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

const router = express.Router();

router.get("/items", getItems);

router.post("/items", validateCreateClothingItem, createItem);

router.use(validateId);

router.delete("/items/:itemId", deleteItem);
router.put("/items/:itemId/likes", likeItem);
router.delete("/items/:itemId/likes", unlikeItem);

module.exports = router;
