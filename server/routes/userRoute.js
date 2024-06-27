const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");

// routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
