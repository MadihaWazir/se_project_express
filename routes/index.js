const express = require("express");

const userRouter = require("./users");

const router = express.Router();

const clothingItems = require("./clothingItem");

const { NOT_FOUND } = require("../utils/errors");
const { ERROR_MESSAGES } = require("../utils/errors");

router.use("/", userRouter);
router.use("/", clothingItems);

router.use((req, res) => {
  res
    .status(NOT_FOUND.status)
    .send({ message: ERROR_MESSAGES.NOT_FOUND.message });
});

module.exports = router;
