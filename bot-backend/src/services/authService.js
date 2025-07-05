const User = require("../models/User");
const { google } = require("googleapis");
const { googleClientId, googleClientSecret, googleRedirectUri } = require("../config/config");

const findUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        return null;
    }
};

const storeUserTokensInSession = (req, user) => {
    req.session.tokens = user.tokens;
    console.log("✅ Session updated:", req.session);
};

async function getValidAccessToken(user) {
    if (!user.tokens.refresh_token) {
        throw new Error("❌ Відсутній refresh_token! Видаліть токени та авторизуйтесь знову.");
    }

    if (user.tokens.expiry_date < Date.now()) {
        console.log("🔄 Оновлення access_token...");

        const oauth2Client = new google.auth.OAuth2(googleClientId, googleClientSecret, googleRedirectUri);
        oauth2Client.setCredentials({ refresh_token: user.tokens.refresh_token });

        try {
            const { credentials } = await oauth2Client.refreshAccessToken();

            await User.findByIdAndUpdate(user._id, {
                tokens: {
                    access_token: credentials.access_token,
                    refresh_token: user.tokens.refresh_token,
                    expiry_date: Date.now() + 3600 * 1000
                }
            });

            console.log("✅ Токен оновлено!");
            return credentials.access_token;
        } catch (error) {
            console.error("❌ Помилка оновлення токена:", error.response ? error.response.data : error.message);

            if (error.response?.data?.error === "invalid_grant") {
                console.error("⚠️ `invalid_grant` – Токен відкликано! Видаляю токени...");
                await User.findByIdAndUpdate(user._id, { $unset: { tokens: "" } });
                throw new Error("Токен відкликано. Повторна авторизація необхідна.");
            }

            throw new Error("Не вдалося оновити `access_token`.");
        }
    }

    return user.tokens.access_token;
};

module.exports = {
    findUserById,
    storeUserTokensInSession,
    getValidAccessToken
};
