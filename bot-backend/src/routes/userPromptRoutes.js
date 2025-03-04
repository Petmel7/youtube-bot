const express = require("express");
const { updateUserPrompt, getUserPrompt } = require("../controllers/userPromptController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/", isAuthenticated, getUserPrompt);
router.post("/update", isAuthenticated, updateUserPrompt);

module.exports = router;
