const express = require("express");

const router = express.Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItem");

const { NOT_FOUND } = require("../utils/errors");
const { ERROR_MESSAGES } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItems);

router.use((req, res, next) => {
  next(new NOT_FOUND(ERROR_MESSAGES.NOT_FOUND.message));
});

module.exports = router;
