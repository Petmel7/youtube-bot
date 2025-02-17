
const { google } = require("googleapis");
require("dotenv").config();
const { generateResponse } = require("./geminiService");
const { googleClientId, googleClientSecret } = require("../config/config");

function getOAuthClient(tokens) {
    const oauth2Client = new google.auth.OAuth2(
        googleClientId,
        googleClientSecret,
        "http://localhost:5000/auth/google/callback"  // ✅ Redirect URL
    );
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
}

async function startBot(tokens) {
    console.log("🤖 Bot started...");

    const authClient = getOAuthClient(tokens); // ✅ Тепер Google має client_id
    const youtube = google.youtube({
        version: "v3",
        auth: authClient
    });

    try {
        const response = await youtube.commentThreads.list({
            part: "snippet",
            videoId: "npxx3UmDxow", // 🔹 Замінити на реальний відео ID
            maxResults: 5
        });

        for (const item of response.data.items) {
            const commentId = item.snippet.topLevelComment.id;
            const commentText = item.snippet.topLevelComment.snippet.textOriginal;

            console.log(`💬 Found comment: ${commentText}`);

            const responseText = await generateResponse(commentText);
            await replyToComment(tokens, commentId, responseText);
        }

        console.log("✅ Bot finished replying.");
    } catch (error) {
        console.error("❌ Error in bot:", error.response ? error.response.data : error.message);
    }
}

async function replyToComment(tokens, commentId, responseText) {
    const authClient = getOAuthClient(tokens);
    const youtube = google.youtube({
        version: "v3",
        auth: authClient
    });

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
}

module.exports = { startBot, replyToComment };



