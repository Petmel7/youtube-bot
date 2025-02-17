
const express = require("express");
const session = require("express-session");
const { google } = require("googleapis");
const { googleClientId, googleClientSecret, googleRedirectUri, sessionSecret } = require("../config/config");

const router = express.Router();

// Налаштовуємо сесію
router.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}));

const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUri
);

// 🔹 Авторизація через Google
router.get("/google", (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/youtube.force-ssl"]
    });
    res.redirect(authUrl);
});

router.get("/google/callback", async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) return res.status(400).send("Authorization failed");

        const { tokens } = await oauth2Client.getToken(code);
        req.session.tokens = tokens;  // ✅ Записуємо токен у сесію

        req.session.save(() => {
            console.log("✅ Session після авторизації:", req.session);  // 🔥 ЛОГ ДЛЯ ПЕРЕВІРКИ
            res.redirect("http://localhost:3000/dashboard");
        });
    } catch (error) {
        console.error("❌ Google Auth Error:", error);
        res.status(500).send("Authentication failed.");
    }
});

// 🔹 Перевірка статусу підключення
router.get("/status", (req, res) => {
    console.log("🟢 Checking session:", req.session);  // 🔥 ЛОГ ДЛЯ ПЕРЕВІРКИ
    res.json({ connected: !!req.session.tokens, session: req.session });
});

module.exports = router;

