
const express = require("express");
const { startBotController } = require("../controllers/botController");

const router = express.Router();

router.post("/start", startBotController);

module.exports = router;