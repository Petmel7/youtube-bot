
const UserPrompt = require("../models/UserPrompt");
const { generatePrompt } = require("../config/promptConfig");

// Додавання нової тематики каналу
const addUserPrompt = async (req, res) => {
    try {
        const { channelTheme } = req.body;
        const userId = req.user._id;

        if (!channelTheme) {
            return res.status(400).json({ error: "Missing channelTheme" });
        }

        const existingPrompt = await UserPrompt.findOne({ userId });
        if (existingPrompt) {
            return res.status(400).json({ error: "User prompt already exists. Use update instead." });
        }

        const generalPrompt = generatePrompt(channelTheme);
        const newPrompt = new UserPrompt({ userId, channelTheme, generalPrompt });

        await newPrompt.save();
        res.json({ success: true, prompt: newPrompt });
    } catch (error) {
        console.error("❌ Error adding prompt:", error);
        res.status(500).json({ error: "Failed to add prompt" });
    }
};

// Оновлення існуючої тематики каналу
const updateUserPrompt = async (req, res) => {
    try {
        const { channelTheme } = req.body;
        const userId = req.user._id;

        if (!channelTheme) {
            return res.status(400).json({ error: "Missing channelTheme" });
        }

        const existingPrompt = await UserPrompt.findOne({ userId });
        if (!existingPrompt) {
            return res.status(404).json({ error: "User prompt not found. Use add instead." });
        }

        const generalPrompt = generatePrompt(channelTheme);
        existingPrompt.channelTheme = channelTheme;
        existingPrompt.generalPrompt = generalPrompt;

        await existingPrompt.save();
        res.json({ success: true, prompt: existingPrompt });
    } catch (error) {
        console.error("❌ Error updating prompt:", error);
        res.status(500).json({ error: "Failed to update prompt" });
    }
};

// Отримання тематики каналу
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

module.exports = { addUserPrompt, updateUserPrompt, getUserPrompt };

