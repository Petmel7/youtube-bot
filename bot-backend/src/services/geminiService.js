
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiApiKey } = require("../config/config");
const { unwantedPhrases } = require("../config/promptConfig");

const genAI = new GoogleGenerativeAI(geminiApiKey);

async function generateResponse(comment, userPrompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        ${userPrompt || "You are an expert. Give a helpful response."}
        User: ${comment}
        Response:`;

        const result = await model.generateContent(prompt);
        let response = await result.response.text();

        unwantedPhrases.forEach(phrase => {
            response = response.replace(new RegExp(phrase, "gi"), "");
        });

        return response.trim();
    } catch (error) {
        console.error("❌ Error in Gemini API:", error);
        return "Sorry, I couldn't generate a response.";
    }
}

module.exports = { generateResponse };

