
const { startBot } = require("../services/youtubeService");

const startBotController = async (req, res) => {
    console.log("User:", req.user);

    const user = req.user;  // Використовуємо req.user замість req.session.tokens

    if (!user || !user.tokens) {
        return res.status(401).json({ error: "Unauthorized. No tokens found." });
    }

    const { videoId, prompt } = req.body;

    if (!videoId) {
        return res.status(400).json({ error: "Missing video ID" });
    }

    try {
        await startBot(user, videoId, prompt);
        res.json({ success: true, message: "Bot started!" });
    } catch (error) {
        console.error("❌ Error starting bot:", error);
        res.status(500).json({ error: "Failed to start bot" });
    }
};

module.exports = { startBotController };

