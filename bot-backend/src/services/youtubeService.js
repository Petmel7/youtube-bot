
const { google } = require("googleapis");
require("dotenv").config();
const User = require("../models/User");
const { generateResponse } = require("./geminiService");
const { googleClientId, googleClientSecret, googleRedirectUri } = require("../config/config");

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
}

async function startBot(user, videoId, userPrompt) {
    console.log(`🤖 Bot started on video: ${videoId}`);
    console.log(`✅ userPrompt: ${userPrompt}`);

    const accessToken = await getValidAccessToken(user);
    console.log("🔍 Використовується токен:", accessToken);

    const authClient = new google.auth.OAuth2(googleClientId, googleClientSecret, googleRedirectUri);
    authClient.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: "v3", auth: authClient });

    let nextPageToken = null;
    let totalReplies = 0;

    try {
        do {
            const response = await youtube.commentThreads.list({
                part: "snippet",
                videoId,
                maxResults: 100,
                pageToken: nextPageToken
            });

            for (const item of response.data.items) {
                const commentId = item.snippet.topLevelComment.id;
                const commentText = item.snippet.topLevelComment.snippet.textOriginal;
                console.log(`💬 Found comment: ${commentText}`);

                const responseText = await generateResponse(commentText, userPrompt);
                await replyToComment(accessToken, commentId, responseText);
                totalReplies++;
            }

            nextPageToken = response.data.nextPageToken || null;
        } while (nextPageToken);

        console.log(`✅ Bot finished replying to ${totalReplies} comments.`);
        return totalReplies; // Повертаємо кількість відповідей

    } catch (error) {
        console.error("❌ Error in bot:", error.response ? error.response.data : error.message);
        throw error;
    }
}

async function replyToComment(accessToken, commentId, responseText) {
    const authClient = new google.auth.OAuth2(googleClientId, googleClientSecret, googleRedirectUri);
    authClient.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: "v3", auth: authClient });

    try {
        await youtube.comments.insert({
            part: "snippet",
            resource: {
                snippet: {
                    parentId: commentId,
                    textOriginal: responseText
                }
            }
        });
        console.log(`✅ Replied: ${responseText}`);
    } catch (error) {
        console.error("❌ Error replying to comment:", error.response ? error.response.data : error.message);
    }
}

module.exports = { startBot, replyToComment };
