const express = require("express");
const { addUserPrompt, getUserPrompt } = require("../controllers/userPromptController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/", isAuthenticated, getUserPrompt);
router.post("/add", isAuthenticated, addUserPrompt);

module.exports = router;
