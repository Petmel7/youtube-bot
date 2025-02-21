// Вказати тематику каналу, згенерувати промпт для цього каналу, кнопка зберегти


// const userInfo = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
//     headers: { Authorization: `Bearer ${tokens.access_token}` }
// }).then(res => res.json());

// console.log("✅ User info:", userInfo);






// const fs = require("fs");
// const path = require("path");
// const session = require("express-session");
// const { google } = require("googleapis");
// const User = require("../models/User");
// const { googleClientId, googleClientSecret, googleRedirectUri, sessionSecret } = require("../config/config");

// const TOKEN_PATH = path.join(__dirname, "token.json");

// const oauth2Client = new google.auth.OAuth2(
//     googleClientId,
//     googleClientSecret,
//     googleRedirectUri
// );

// const sessionMiddleware = session({
//     secret: sessionSecret,
//     resave: false,
//     saveUninitialized: false
// });

// const googleAuth = (req, res) => {
//     const authUrl = oauth2Client.generateAuthUrl({
//         access_type: "offline",
//         prompt: "consent",
//         scope: ["https://www.googleapis.com/auth/youtube.force-ssl"]
//     });
//     res.redirect(authUrl);
// };

// const googleCallback = async (req, res) => {
//     try {
//         const { code } = req.query;
//         if (!code) return res.status(400).send("Authorization failed");

//         let { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);

//         fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
//         console.log("✅ Токени збережено у файл!");

//         const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
//         const { data: userInfo } = await oauth2.userinfo.get();
//         console.log("✅ Отриманий профіль користувача:", userInfo);

//         const user = await User.findOneAndUpdate(
//             { googleId: userInfo.id },
//             {
//                 googleId: userInfo.id,
//                 name: userInfo.name,
//                 email: userInfo.email,
//                 picture: userInfo.picture,
//                 tokens
//             },
//             { upsert: true, new: true }
//         );

//         console.log("✅ User saved/updated:", user);

//         req.session.tokens = tokens;
//         req.session.user = { id: user.googleId, name: user.name, email: user.email, picture: user.picture };

//         req.session.save(() => {
//             console.log("✅ Session після авторизації:", req.session);
//             res.redirect("http://localhost:3000/dashboard");
//         });
//     } catch (error) {
//         console.error("❌ Google Auth Error:", error.response?.data || error);
//         res.status(500).send("Authentication failed.");
//     }
// };

// async function getValidAccessToken() {
//     if (!fs.existsSync(TOKEN_PATH)) {
//         throw new Error("❌ Токен не знайдено! Потрібна повторна авторизація.");
//     }

//     let tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));

//     if (!tokens.refresh_token) {
//         throw new Error("❌ Відсутній refresh_token! Видаліть token.json та авторизуйтесь знову.");
//     }

//     console.log("🔄 Оновлення access_token...");
//     const { credentials } = await oauth2Client.refreshAccessToken();
//     oauth2Client.setCredentials(credentials);
//     fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials, null, 2));
//     console.log("✅ Токен оновлено!");

//     return credentials.access_token;
// }

// const checkStatus = async (req, res) => {
//     try {
//         const accessToken = await getValidAccessToken();
//         res.json({ connected: true, accessToken });
//     } catch (error) {
//         res.json({ connected: false, error: error.message });
//     }
// };

// module.exports = {
//     sessionMiddleware,
//     googleAuth,
//     googleCallback,
//     checkStatus
// };