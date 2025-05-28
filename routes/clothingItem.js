const router = require("express").Router();
const clothingItem = require("../models/clothingItem");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

router.use("/items", clothingItem);

router.post("/", createItem);

router.get("/", getItems);

router.put("/:itemId", likeItem);

router.delete("/:itemId", unlikeItem);

module.exports = router;
