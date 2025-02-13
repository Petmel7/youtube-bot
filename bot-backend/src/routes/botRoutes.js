const express = require("express");
const { replyToComment } = require("../services/youtubeService");

const router = express.Router();

router.post("/reply", async (req, res) => {
    const { commentId, responseText } = req.body;
    const auth = req.session.tokens;

    if (!auth) return res.status(401).json({ error: "Unauthorized" });

    try {
        await replyToComment(auth, commentId, responseText);
        res.json({ success: true });
    } catch (error) {
        console.error("Error replying:", error);
        res.status(500).json({ error: "Failed to reply" });
    }
});

module.exports = router;
