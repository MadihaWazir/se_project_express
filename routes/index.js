const router = require("express").Router();
const clothingItem = require("./clothingItem");

const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(404).send({ message: "NOT_FOUND" });
});

module.exports = router;
