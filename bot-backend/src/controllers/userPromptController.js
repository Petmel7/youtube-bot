const UserPrompt = require("../models/UserPrompt");
const { generatePrompt } = require("../config/promptConfig");

const updateUserPrompt = async (req, res) => {
    try {
        const { channelTheme } = req.body;
        const userId = req.user._id;

        if (!channelTheme) {
            return res.status(400).json({ error: "Missing channelTheme" });
        }

        const generalPrompt = generatePrompt(channelTheme);

        const updatedPrompt = await UserPrompt.findOneAndUpdate(
            { userId },
            { channelTheme, generalPrompt },
            { upsert: true, new: true }
        );

        res.json({ success: true, prompt: updatedPrompt });
    } catch (error) {
        console.error("❌ Error updating prompt:", error);
        res.status(500).json({ error: "Failed to update prompt" });
    }
};

const getUserPrompt = async (req, res) => {
    try {
        const userId = req.user._id;
        const prompt = await UserPrompt.findOne({ userId });

        if (!prompt) {
            return res.status(404).json({ error: "Prompt not found" });
        }

        res.json({ success: true, prompt });
    } catch (error) {
        console.error("❌ Error fetching prompt:", error);
        res.status(500).json({ error: "Failed to fetch prompt" });
    }
};

module.exports = { updateUserPrompt, getUserPrompt };
