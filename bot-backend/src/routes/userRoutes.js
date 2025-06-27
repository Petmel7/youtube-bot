const express = require("express");
const { getUsers, getUser, getUserRole } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/users", isAuthenticated, getUsers);
router.get("/user", isAuthenticated, getUser);
router.get("/user-role", isAuthenticated, getUserRole);

module.exports = router;
