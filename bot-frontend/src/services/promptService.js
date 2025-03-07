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

export const fetchUserPrompt = async (setSavedTheme) => {
    try {
        const res = await fetch(`${config.backendUrl}/user-prompt`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        if (data.success && data.prompt) {
            setSavedTheme(data.prompt.channelTheme);
        }
    } catch (error) {
        console.error("❌ Error fetching channel theme:", error);
    }
};

export const fetchSaveTheme = async (channelTheme, setSavedTheme, setIsEditingTheme) => {
    if (!channelTheme) {
        alert("❌ Enter a channel theme!");
        return;
    }

    try {
        const res = await fetch(`${config.backendUrl}/user-prompt/update`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ channelTheme })
        });

        const data = await res.json();
        if (data.success) {
            setSavedTheme(channelTheme);
            setIsEditingTheme(false);
            alert("✅ Channel theme updated successfully!");
        } else {
            alert("❌ Failed to update channel theme.");
        }
    } catch (error) {
        console.error("❌ Error updating channel theme:", error);
    }
}
