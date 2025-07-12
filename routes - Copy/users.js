const router = require("express").Router();
const {
  updateUser,
  getCurrentUser,
  createUser,
} = require("../controllers/users");
const {
  validateCreateUser,
  validateUpdateUser,
  validateId,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateUser);
router.post("/signup", validateCreateUser, createUser);

module.exports = router;
