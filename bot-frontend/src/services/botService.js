
import config from "../config/config";
import { fetchAddTheme, fetchGetTheme } from "./promptService";

export const fetchStartBot = async (videoUrl, prompt, botGender, setIsBotRunning) => {
    const extractVideoId = (url) => {
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        return match ? match[1] : null;
    };

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        console.warn("❌ Невірний формат посилання!");
        return { success: false, message: "Invalid video URL format!" };
    }

    setIsBotRunning(true);

    try {
        const savedTheme = await fetchGetTheme();
        if (!savedTheme) {
            console.log("ℹ️ Тематика каналу ще не задана. Додаємо нову...");
            const addTheme = await fetchAddTheme(prompt.channelTheme, botGender);
            if (!addTheme) {
                console.warn("❌ Не вдалося додати тематику каналу.");
                setIsBotRunning(false);
                return { success: false, message: "Failed to add channel theme!" };
            }
        } else {
            console.log(`✅ Тематика вже є: ${savedTheme.channelTheme}`);
        }

        // 🔥 Запуск бота з передачею `prompt`
        const res = await fetch(`${config.backendUrl}/bot/start`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoId, prompt: prompt.generalPrompt }) // ✅ Тепер prompt передається
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
        setIsBotRunning(false);
    }
};

