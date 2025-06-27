require("dotenv").config();

module.exports = {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
    sessionSecret: process.env.SESSION_SECRET,
    mongoUri: process.env.MONGO_URI,
    geminiApiKey: process.env.GEMINI_API_KEY
};
