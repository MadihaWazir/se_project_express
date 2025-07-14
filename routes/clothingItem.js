const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  validateCreateClothingItem,

  validateId,
} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

router.get("/", getItems);

router.use(auth); // Ensure authentication for all item routes

router.post("/", auth, validateCreateClothingItem, createItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId", auth, validateId, deleteItem);
router.delete("/:itemId/likes", auth, validateId, unlikeItem);

module.exports = router;
