require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiApiKey } = require("../config/config");

const genAI = new GoogleGenerativeAI(geminiApiKey);

async function generateResponse(comment) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(comment);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("❌ Error in Gemini API:", error);
        return "Sorry, I couldn't generate a response.";
    }
}

module.exports = { generateResponse };
