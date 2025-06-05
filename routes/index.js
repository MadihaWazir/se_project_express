const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { ERROR_MESSAGES } = require("../utils/errors");

const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_MESSAGES.NOT_FOUND).send({ message: "NOT_FOUND" });
});

module.exports = router;
