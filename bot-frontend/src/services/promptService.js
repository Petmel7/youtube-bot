import config from "../config/config";

export const fetchAddTheme = async (channelTheme, botGender) => {
    if (!channelTheme || !botGender) {
        console.warn("❌ Введіть тематику каналу та виберіть стать!");
        return null;
    }

    const genderText = botGender === "male" ? "You are a man." : "You are a woman.";

    try {
        const res = await fetch(`${config.backendUrl}/user-prompt/add`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ channelTheme, genderText })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("✅ Тематика каналу та стать бота додані!", data.prompt);
        return data.success ? data.prompt : null;
    } catch (error) {
        console.error("❌ Error adding channel theme:", error);
        return null;
    }
};

export const fetchUserPrompt = async (setSavedTheme, setSavedGender) => {
    try {
        const res = await fetch(`${config.backendUrl}/user-prompt`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        if (data.success && data.prompt) {
            setSavedTheme(data.prompt.channelTheme);
            setSavedGender(data.prompt.genderText);
        }
    } catch (error) {
        console.error("❌ Error fetching channel theme:", error);
    }
};

// ✅ Отримати тематику каналу
export const fetchGetTheme = async () => {
    try {
        console.log("📌 Виконуємо fetchGetTheme...");
        const res = await fetch(`${config.backendUrl}/user-prompt`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        console.log("📌 Отримана тема res:", res);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data.prompt || null;
    } catch (error) {
        console.error("❌ Error fetching channel theme:", error);
        return null;
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

export const generateBotPrompt = (botGender, savedTheme, channelTheme) => {
    console.log("📌 Вибраний гендер:", botGender);

    if (!botGender) {
        alert("❌ Please select bot identity (Male/Female).");
        return null;
    }

    const genderText = botGender === "male" ? "You are a man." : "You are a woman.";

    return {
        channelTheme: savedTheme || channelTheme,
        genderText,
        generalPrompt: `${savedTheme || channelTheme}\n${genderText}`
    };
};

export const fetchSaveGender = async (botGender, setSavedGender, setIsEditingGender) => {
    if (!botGender) {
        alert("❌ Select bot identity!");
        return;
    }

    try {
        const res = await fetch(`${config.backendUrl}/user-prompt/update-gender`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ genderText: botGender })
        });

        const data = await res.json();
        if (data.success) {
            setSavedGender(botGender);
            setIsEditingGender(false);
            alert("✅ Bot gender updated successfully!");
        } else {
            alert("❌ Failed to update bot gender.");
        }
    } catch (error) {
        console.error("❌ Error updating bot gender:", error);
    }
};




