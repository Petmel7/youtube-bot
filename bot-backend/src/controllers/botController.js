
const { startBot } = require("../services/youtubeService");

const startBotController = async (req, res) => {
    const auth = req.session.tokens;
    const { videoId, prompt } = req.body;

    if (!auth) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!videoId) {
        return res.status(400).json({ error: "Missing video ID" });
    }

    try {
        await startBot(auth, videoId, prompt);
        res.json({ success: true, message: "Bot started!" });
    } catch (error) {
        console.error("❌ Error starting bot:", error);
        res.status(500).json({ error: "Failed to start bot" });
    }
};

module.exports = { startBotController };

