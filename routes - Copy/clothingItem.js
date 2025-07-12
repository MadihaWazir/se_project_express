const router = require("express").Router();
const express = require("express");
const {
  validateCreateClothingItem,
  validateCreateUser,
  validateUpdateUser,
  validateId,
} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

const {
  createUser,
  updateUser,
} = require("../controllers/users");

router.post("/items", validateCreateClothingItem, createItem);

router.delete("/items/:itemId", validateId, deleteItem);

router.put("/items/:itemId/likes", validateId, likeItem);

router.delete("/items/:itemId/likes", validateId, unlikeItem);

router.post("/signup", validateCreateUser, createUser);
router.patch("/users/me", validateUpdateUser, updateUser);

module.exports = router;
