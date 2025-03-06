
const { startBot } = require("../services/youtubeService");

const startBotController = async (req, res) => {
    const user = req.user;

    if (!user || !user.tokens) {
        return res.status(401).json({ error: "Unauthorized. No tokens found." });
    }

    const { videoId, prompt } = req.body;

    if (!videoId) {
        return res.status(400).json({ error: "Missing video ID" });
    }

    try {
        const totalReplies = await startBot(user, videoId, prompt);
        res.json({ success: true, message: `✅ Bot finished replying to ${totalReplies} comments.` });
    } catch (error) {
        console.error("❌ Error starting bot:", error);
        res.status(500).json({ error: "Failed to start bot" });
    }
};

module.exports = { startBotController };

