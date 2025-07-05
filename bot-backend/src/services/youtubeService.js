const fetch = require("node-fetch");
const { google } = require("googleapis");
const { getValidAccessToken } = require("./authService")
const { generateResponse } = require("./geminiService");
const { googleClientId, googleClientSecret, googleRedirectUri, youtubeApiBase } = require("../config/config");

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
        return totalReplies;

    } catch (error) {
        console.error("❌ Error in bot:", error.response?.data || error.message);
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
        console.error("❌ Error replying to comment:", error.response?.data || error.message);
    }
}

const getUserChannelId = async (user) => {
    const accessToken = await getValidAccessToken(user);

    const res = await fetch(`${youtubeApiBase}/channels?part=id&mine=true`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!res.ok) throw new Error(`❌ Failed to fetch channel ID. Status: ${res.status}`);
    const data = await res.json();

    if (!data.items.length) throw new Error("❌ No channels found for user");
    return data.items[0].id;
};

const getChannelVideos = async (user, channelId) => {
    const accessToken = await getValidAccessToken(user);

    // 1. Отримуємо ID відео
    const searchRes = await fetch(`${youtubeApiBase}/search?part=snippet&channelId=${channelId}&type=video&maxResults=50`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!searchRes.ok) throw new Error(`❌ Failed to fetch videos. Status: ${searchRes.status}`);
    const searchData = await searchRes.json();

    const videoIds = searchData.items.map(item => item.id.videoId).filter(Boolean).join(",");

    if (!videoIds) return [];

    // 2. Запит повної інформації про відео
    const detailsRes = await fetch(`${youtubeApiBase}/videos?part=snippet,contentDetails,statistics&id=${videoIds}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!detailsRes.ok) throw new Error(`❌ Failed to fetch video details. Status: ${detailsRes.status}`);
    const detailsData = await detailsRes.json();

    return detailsData.items.map(video => ({
        videoId: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnail: video.snippet.thumbnails?.medium?.url || null,
        duration: video.contentDetails.duration,
        views: video.statistics?.viewCount,
        likes: video.statistics?.likeCount,
        comments: video.statistics?.commentCount
    }));
};

// const getChannelVideos = async (user, channelId) => {
//     const accessToken = await getValidAccessToken(user); // <== тут беремо токен з урахуванням оновлення

//     const res = await fetch(`${youtubeApiBase}/search?part=snippet&channelId=${channelId}&type=video&maxResults=50`, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//     });

//     if (!res.ok) throw new Error(`❌ Failed to fetch videos. Status: ${res.status}`);
//     const data = await res.json();

//     return data.items.map(item => ({
//         videoId: item.id.videoId,
//         title: item.snippet.title,
//         publishedAt: item.snippet.publishedAt
//     }));
// };

module.exports = {
    startBot,
    replyToComment,
    getUserChannelId,
    getChannelVideos
};
