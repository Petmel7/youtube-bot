
const express = require("express");
const { addUserPrompt, updateUserPrompt, getUserPrompt } = require("../controllers/userPromptController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/", isAuthenticated, getUserPrompt);
router.post("/add", isAuthenticated, addUserPrompt);
router.put("/update", isAuthenticated, updateUserPrompt);

module.exports = router;

