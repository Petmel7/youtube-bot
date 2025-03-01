
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiApiKey } = require("../config/config");
const { unwantedPhrases } = require("../config/promptConfig");

const genAI = new GoogleGenerativeAI(geminiApiKey);

// async function generateResponse(comment, userPrompt, retries = 5) {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const prompt = `
//         ${userPrompt || "Ты эксперт в своей области. Дай полезный ответ."}
//         Пользователь: ${comment}
//         Ответ:`;

//         const result = await model.generateContent(prompt);
//         let response = await result.response.text();

//         unwantedPhrases.forEach(phrase => {
//             response = response.replace(new RegExp(phrase, "gi"), "");
//         });

//         return response.trim();
//     } catch (error) {
//         if (error.status === 503 && retries > 0) {
//             console.warn(`⚠️ Gemini API перегружено. Повтор через 5 секунд... (${retries} попытки осталось)`);
//             await new Promise(resolve => setTimeout(resolve, 5000));
//             return generateResponse(comment, userPrompt, retries - 1);
//         }

//         console.error("❌ Error in Gemini API:", error);
//         return "Извините, я не смог сгенерировать ответ.";
//     }
// }

async function generateResponse(comment, userPrompt, retries = 5) {
    try {
        // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Нова модель

        const prompt = `
        ${userPrompt || "Ты эксперт в своей области. Дай полезный ответ."}
        Пользователь: ${comment}
        Ответ:`;

        const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
        let response = result.candidates[0]?.content?.parts[0]?.text || "Я не смог сгенерировать ответ.";

        unwantedPhrases.forEach(phrase => {
            response = response.replace(new RegExp(phrase, "gi"), "");
        });

        return response.trim();
    } catch (error) {
        if (error.status === 503 && retries > 0) {
            console.warn(`⚠️ Gemini API перегружено. Повтор через 5 секунд... (${retries} попытки осталось)`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return generateResponse(comment, userPrompt, retries - 1);
        }

        console.error("❌ Error in Gemini API:", error);
        return "Извините, я не смог сгенерировать ответ.";
    }
}

module.exports = { generateResponse };

