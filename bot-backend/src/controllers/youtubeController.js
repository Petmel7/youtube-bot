
const { getUserChannelId, getChannelVideos } = require("../services/youtubeService");

const fetchUserVideos = async (req, res) => {
    try {
        const user = req.user;
        const channelId = await getUserChannelId(user);
        const videos = await getChannelVideos(user, channelId);

        res.json({ success: true, videos });
    } catch (error) {
        console.error("❌ fetchUserVideos error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { fetchUserVideos };