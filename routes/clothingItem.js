const router = require("express").Router();
const clothingItem = require("../models/clothingItem");
const { createItem } = require("../controllers/clothingItem");

router.use("/items", clothingItem);

router.post("/", createItem);

module.exports = router;
