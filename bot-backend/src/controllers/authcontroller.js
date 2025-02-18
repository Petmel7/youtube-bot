
const session = require("express-session");
const { google } = require("googleapis");
const { googleClientId, googleClientSecret, googleRedirectUri, sessionSecret } = require("../config/config");

const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUri
);

// Налаштовуємо сесію для використання у маршрутах
const sessionMiddleware = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
});

// 🔹 Авторизація через Google
const googleAuth = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/youtube.force-ssl"]
    });
    res.redirect(authUrl);
};

// 🔹 Обробка Google Callback
const googleCallback = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) return res.status(400).send("Authorization failed");

        const { tokens } = await oauth2Client.getToken(code);
        req.session.tokens = tokens;

        req.session.save(() => {
            console.log("✅ Session після авторизації:", req.session);
            res.redirect("http://localhost:3000/dashboard");
        });
    } catch (error) {
        console.error("❌ Google Auth Error:", error);
        res.status(500).send("Authentication failed.");
    }
};

// 🔹 Перевірка статусу підключення
const checkStatus = (req, res) => {
    console.log("🟢 Checking session:", req.session);
    res.json({ connected: !!req.session.tokens, session: req.session });
};

module.exports = {
    sessionMiddleware,
    googleAuth,
    googleCallback,
    checkStatus
};