const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

router.post("/", auth, createItem);

router.get("/", getItems);

router.delete("/:itemId", auth, deleteItem);

router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
