
const express = require("express");
const { startBotController } = require("../controllers/botController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/start", isAuthenticated, startBotController);

module.exports = router;