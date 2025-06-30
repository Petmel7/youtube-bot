
const { createUserPrompt, updateUserPromptData, getUserPromptData, updateUserGenderService } = require("../services/userPromptService");

const addUserPrompt = async (req, res) => {
    try {
        console.log("📌 Отриманий запит:", req.body);
        const { channelTheme, genderText } = req.body;
        const userId = req.user._id;

        const newPrompt = await createUserPrompt(userId, channelTheme, genderText);
        res.json({ success: true, prompt: newPrompt });
    } catch (error) {
        console.error("❌ Error adding prompt:", error.message);
        res.status(400).json({ error: error.message });
    }
};

const updateUserPrompt = async (req, res) => {
    try {
        const { channelTheme, genderText } = req.body;
        const userId = req.user._id;

        const updatedPrompt = await updateUserPromptData(userId, channelTheme, genderText);
        res.json({ success: true, prompt: updatedPrompt });
    } catch (error) {
        console.error("❌ Error updating prompt:", error.message);
        res.status(400).json({ error: error.message });
    }
};

const getUserPrompt = async (req, res) => {
    try {
        const userId = req.user._id;
        const prompt = await getUserPromptData(userId);
        res.json({ success: true, prompt });
    } catch (error) {
        console.error("❌ Error fetching prompt:", error.message);
        res.status(404).json({ error: error.message });
    }
};

const updateUserGender = async (req, res) => {
    try {
        const userId = req.user._id;
        const { genderText } = req.body;

        const updatedPrompt = await updateUserGenderService(userId, genderText);
        res.json({ success: true, prompt: updatedPrompt });
    } catch (error) {
        console.error("❌ Error updating bot gender:", error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addUserPrompt,
    updateUserPrompt,
    getUserPrompt,
    updateUserGender
};
