const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

router.post("/", createItem);

router.get("/", getItems);

router.delete("/:itemId", deleteItem);

router.put("/:itemId", likeItem);

router.delete("/:itemId", unlikeItem);

module.exports = router;
