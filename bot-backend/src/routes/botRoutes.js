
const express = require("express");
const { startBot } = require("../services/youtubeService");

const router = express.Router();

router.post("/start", async (req, res) => {
    const auth = req.session.tokens;

    if (!auth) return res.status(401).json({ error: "Unauthorized" });

    try {
        await startBot(auth);  // Запускаємо бота
        res.json({ success: true, message: "Bot started!" });
    } catch (error) {
        console.error("Error starting bot:", error);
        res.status(500).json({ error: "Failed to start bot" });
    }
});

module.exports = router;

