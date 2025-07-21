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

const auth = require("../middlewares/auth");

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, validateUpdateUser, updateUser);
router.post("/signup", validateCreateUser, createUser);

router.use(validateId);

module.exports = router;
