import { useState } from "react";
import config from "../config/config";

const ChannelThemeInput = ({ onThemeUpdate }) => {
    const [channelTheme, setChannelTheme] = useState("");

    const updateTheme = async () => {
        if (!channelTheme) {
            alert("❌ Введіть тематику каналу!");
            return;
        }
        try {
            const res = await fetch(`${config.backendUrl}/user-prompt/update`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ channelTheme })
            });

            const data = await res.json();
            if (data.success) {
                alert("✅ Тематика каналу оновлена!");
                onThemeUpdate(data.prompt);
            } else {
                alert("❌ Не вдалося оновити тематику каналу.");
            }
        } catch (error) {
            console.error("❌ Error updating channel theme:", error);
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Введіть тематику каналу"
                value={channelTheme}
                onChange={(e) => setChannelTheme(e.target.value)}
                style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
            />
            <br />
            <button onClick={updateTheme} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Оновити тематику
            </button>
        </div>
    );
};

export default ChannelThemeInput;