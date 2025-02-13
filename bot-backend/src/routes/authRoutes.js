const express = require("express");
const session = require("express-session");
const { google } = require("googleapis");
const { googleClientId, googleClientSecret, googleRedirectUri, sessionSecret } = require("../config/config");

const router = express.Router();

router.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
}));

const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUri
);

router.get("/google", (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/youtube.force-ssl"]
    });
    res.redirect(authUrl);
});

router.get("/google/callback", async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send("Authorization failed");

    const { tokens } = await oauth2Client.getToken(code);
    req.session.tokens = tokens;
    res.redirect("http://localhost:3000/dashboard");
});

module.exports = router;
