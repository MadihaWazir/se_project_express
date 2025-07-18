const express = require("express");

const userRouter = require("./users");

const router = express.Router();

const clothingItem = require("./clothingItem");

const { ERROR_MESSAGES } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(404).send({ message: ERROR_MESSAGES.NOT_FOUND.message });
});

module.exports = router;
