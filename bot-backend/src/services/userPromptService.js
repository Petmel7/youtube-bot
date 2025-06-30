const UserPrompt = require("../models/UserPrompt");
const { generatePrompt } = require("../config/promptConfig");

const createUserPrompt = async (userId, channelTheme, genderText) => {
    if (!channelTheme || !genderText) {
        throw new Error("Missing channelTheme or genderText");
    }

    const existingPrompt = await UserPrompt.findOne({ userId });
    if (existingPrompt) {
        throw new Error("User prompt already exists. Use update instead.");
    }

    const generalPrompt = generatePrompt(channelTheme, genderText);
    const newPrompt = new UserPrompt({ userId, channelTheme, genderText, generalPrompt });

    await newPrompt.save();
    return newPrompt;
};

const updateUserPromptData = async (userId, channelTheme, genderText) => {
    if (!channelTheme && !genderText) {
        throw new Error("Missing channelTheme or genderText");
    }

    const updateData = {};
    if (channelTheme) updateData.channelTheme = channelTheme;
    if (genderText) updateData.genderText = genderText;

    return await UserPrompt.findOneAndUpdate({ userId }, updateData, { upsert: true, new: true });
};

const getUserPromptData = async (userId) => {
    const prompt = await UserPrompt.findOne({ userId });
    if (!prompt) {
        throw new Error("Prompt not found");
    }
    return prompt;
};

const updateUserGenderService = async (userId, genderText) => {
    if (!genderText) {
        throw new Error("Missing genderText");
    }

    const updatedPrompt = await UserPrompt.findOneAndUpdate(
        { userId },
        { genderText },
        { new: true }
    );

    if (!updatedPrompt) {
        throw new Error("Prompt not found or update failed");
    }

    return updatedPrompt;
};

module.exports = {
    createUserPrompt,
    updateUserPromptData,
    getUserPromptData,
    updateUserGenderService
};

