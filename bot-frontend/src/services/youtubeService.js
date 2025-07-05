import config from "../config/config";

export const fetchMyVideos = async () => {
    try {
        const res = await fetch(`${config.backendUrl}/youtube/my-videos`, {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();
        if (data.success) {
            return data.videos;
        } else {
            console.warn("❌ Failed to fetch videos:", data.error);
            return [];
        }
    } catch (err) {
        console.error("❌ Error:", err);
        return [];
    }
};