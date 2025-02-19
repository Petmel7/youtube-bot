
const { google } = require("googleapis");
require("dotenv").config();
const { generateResponse } = require("./geminiService");
const { googleClientId, googleClientSecret } = require("../config/config");

function getOAuthClient(tokens) {
    const oauth2Client = new google.auth.OAuth2(
        googleClientId,
        googleClientSecret,
        "http://localhost:5000/auth/google/callback"
    );
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
}

async function startBot(tokens, videoId, userPrompt) {
    console.log(`🤖 Bot started on video: ${videoId}`);
    console.log(`✅ userPrompt: ${userPrompt}`);

    const authClient = getOAuthClient(tokens);
    const youtube = google.youtube({
        version: "v3",
        auth: authClient
    });

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
                await replyToComment(tokens, commentId, responseText);
                totalReplies++;
            }

            nextPageToken = response.data.nextPageToken || null;
        } while (nextPageToken);

        console.log(`✅ Bot finished replying to ${totalReplies} comments.`);
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
