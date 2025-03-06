import config from "../config/config";
import { fetchAddTheme } from "./promptService";

export const fetchStartBot = async (videoUrl, channelTheme, setIsBotRunning) => {
    const extractVideoId = (url) => {
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        return match ? match[1] : null;
    };

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        console.warn("❌ Невірний формат посилання!");
        return { success: false, message: "Invalid video URL format!" };
    }

    setIsBotRunning(true); // 🔹 Встановлюємо статус перед початком

    try {
        const themeUpdate = await fetchAddTheme(channelTheme);
        if (!themeUpdate) {
            console.warn("❌ Не вдалося оновити тематику каналу.");
            setIsBotRunning(false);
            return { success: false, message: "Failed to update channel theme!" };
        }

        const res = await fetch(`${config.backendUrl}/bot/start`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoId, prompt: themeUpdate.generalPrompt })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return { success: data.success, message: data.message || "Bot started!" };
    } catch (error) {
        console.error("❌ Bot start error:", error);
        return { success: false, message: "Error starting bot!" };
    } finally {
        setIsBotRunning(false); // 🔹 Завжди повертаємо стан кнопки
    }
};
