const { google } = require("googleapis");

async function replyToComment(auth, commentId, responseText) {
    const youtube = google.youtube({ version: "v3", auth });

    await youtube.comments.insert({
        part: "snippet",
        resource: {
            snippet: {
                parentId: commentId,
                textOriginal: responseText
            }
        }
    });

    console.log("✅ Comment replied!");
}

module.exports = { replyToComment };
