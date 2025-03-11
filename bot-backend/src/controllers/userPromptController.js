
const UserPrompt = require("../models/UserPrompt");
const { generatePrompt } = require("../config/promptConfig");

const addUserPrompt = async (req, res) => {
    try {
        console.log("📌 Отриманий запит:", req.body);
        const { channelTheme, genderText } = req.body;  // ✅ Отримуємо ОКРЕМІ значення
        const userId = req.user._id;

        if (!channelTheme || !genderText) {
            return res.status(400).json({ error: "Missing channelTheme or genderText" });
        }

        const existingPrompt = await UserPrompt.findOne({ userId });
        if (existingPrompt) {
            return res.status(400).json({ error: "User prompt already exists. Use update instead." });
        }

        const generalPrompt = generatePrompt(channelTheme, genderText);
        const newPrompt = new UserPrompt({ userId, channelTheme, genderText, generalPrompt });

        await newPrompt.save();
        res.json({ success: true, prompt: newPrompt });
    } catch (error) {
        console.error("❌ Error adding prompt:", error);
        res.status(500).json({ error: "Failed to add prompt" });
    }
};

const updateUserPrompt = async (req, res) => {
    try {
        const { channelTheme, genderText } = req.body;
        const userId = req.user._id;

        if (!channelTheme && !genderText) {
            return res.status(400).json({ error: "Missing channelTheme or genderText" });
        }

        const updateData = {};
        if (channelTheme) updateData.channelTheme = channelTheme;
        if (genderText) updateData.genderText = genderText;

        const updatedPrompt = await UserPrompt.findOneAndUpdate(
            { userId },
            updateData,
            { upsert: true, new: true }
        );

        res.json({ success: true, prompt: updatedPrompt });
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

const updateUserGender = async (req, res) => {
    try {
        const { genderText } = req.body;
        const userId = req.user._id;

        if (!genderText) {
            return res.status(400).json({ error: "Missing genderText" });
        }

        const updatedPrompt = await UserPrompt.findOneAndUpdate(
            { userId },
            { genderText },
            { new: true }
        );

        res.json({ success: true, prompt: updatedPrompt });
    } catch (error) {
        console.error("❌ Error updating bot gender:", error);
        res.status(500).json({ error: "Failed to update bot gender" });
    }
};

module.exports = { addUserPrompt, updateUserPrompt, getUserPrompt, updateUserGender };

