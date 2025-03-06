import config from "../config/config";

export const fetchAddTheme = async (channelTheme) => {
    if (!channelTheme) {
        console.warn("❌ Введіть тематику каналу!");
        return null;
    }

    try {
        const res = await fetch(`${config.backendUrl}/user-prompt/add`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ channelTheme })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("✅ Тематика каналу додана!", data.prompt);

        return data.success ? data.prompt : null;
    } catch (error) {
        console.error("❌ Error updating channel theme:", error);
        return null;
    }
};
