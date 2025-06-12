const router = require("express").Router();
const { getUsers, updateUser, updateCurrentUser } = require("../controllers/users");

router.get("/", getUsers);
router.put("/me", updateCurrentUser);
router.patch("/me", updateUser);



module.exports = router;
