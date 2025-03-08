
import { useState, useEffect } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { fetchStartBot } from "../services/botService";
import { validateInputs } from "../validate/validateInputs";
import { fetchUserPrompt, fetchSaveTheme } from "../services/promptService";
import LogoutButton from "./LogoutButton";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [channelTheme, setChannelTheme] = useState("");
    const [isBotRunning, setIsBotRunning] = useState(false);
    const [error, setError] = useState({ videoUrl: false, channelTheme: false });
    const [savedTheme, setSavedTheme] = useState(null);
    const [isEditingTheme, setIsEditingTheme] = useState(false);
    const isConnected = useAuthStatus(null, "/");

    useEffect(() => {
        const getUserPrompt = async () => {
            await fetchUserPrompt(setSavedTheme);
        };
        getUserPrompt();
    }, []);

    const saveTheme = async () => {
        await fetchSaveTheme(channelTheme, setSavedTheme, setIsEditingTheme);
    };

    const startBot = async () => {
        if (!validateInputs(videoUrl, savedTheme || channelTheme, setError)) return;

        const result = await fetchStartBot(videoUrl, savedTheme || channelTheme, setIsBotRunning);
        alert(result.message);
    };

    if (isConnected === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.dashboard}>
            <LogoutButton />
            <h1>YouTube Bot Dashboard</h1>
            <p>✅ Connected to YouTube!</p>

            {isEditingTheme ? (
                <div className={styles.inputContainer}>
                    <input
                        className={`${styles.input} ${error.channelTheme ? styles.inputError : ""}`}
                        type="text"
                        placeholder="Enter new channel theme"
                        value={channelTheme}
                        onChange={(e) => setChannelTheme(e.target.value)}
                    />
                    <button className={styles.saveButton} onClick={saveTheme}>Save</button>
                </div>
            ) : savedTheme ? (
                <div className={styles.themeDisplay}>
                    <p>Channel theme: <strong>{savedTheme}</strong></p>
                    <button className={styles.editButton} onClick={() => setIsEditingTheme(true)}>Change Theme</button>
                </div>
            ) : (
                <div>
                    <input
                        className={`${styles.input} ${error.channelTheme ? styles.inputError : ""}`}
                        type="text"
                        placeholder="Enter channel theme"
                        value={channelTheme}
                        onChange={(e) => setChannelTheme(e.target.value)}
                    />
                </div>
            )}

            <input
                className={`${styles.input} ${error.videoUrl ? styles.inputError : ""}`}
                type="text"
                placeholder="Enter YouTube video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
            />
            {error.videoUrl && <p className={styles.error}>❌ Enter the video link!</p>}

            <button
                className={styles.button}
                onClick={startBot}
                disabled={isBotRunning}
            >
                {isBotRunning ? "🤖 Bot is replying..." : "🤖 Start Bot"}
            </button>
        </div>
    );
};

export default Dashboard;

