const router = require("express").Router();
const {
  updateUser,
  getCurrentUser,
  createUser,
} = require("../controllers/users");

const {
  validateUpdateUser,
  validateId,
  validateCreateUser,
} = require("../middlewares/validation");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", validateUpdateUser, updateUser);
router.post("/signup", validateCreateUser, createUser);

router.use(validateId);

module.exports = router;
