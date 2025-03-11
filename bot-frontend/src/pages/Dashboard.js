
import { useState, useEffect } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { fetchStartBot } from "../services/botService";
import { validateInputs } from "../validate/validateInputs";
import { fetchUserPrompt, fetchSaveTheme, fetchSaveGender, generateBotPrompt } from "../services/promptService";
import LogoutButton from "./LogoutButton";
import Gender from "./Gender";
import Theme from "./Theme";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [channelTheme, setChannelTheme] = useState("");
    const [botGender, setBotGender] = useState("male");
    const [isBotRunning, setIsBotRunning] = useState(false);
    const [error, setError] = useState({ videoUrl: false, channelTheme: false });
    const [savedTheme, setSavedTheme] = useState(null);
    const [savedGender, setSavedGender] = useState(null);
    const [isEditingTheme, setIsEditingTheme] = useState(false);
    const [isEditingGender, setIsEditingGender] = useState(false);
    const isConnected = useAuthStatus(null, "/");

    useEffect(() => {
        const getUserPrompt = async () => {
            const promptData = await fetchUserPrompt(setSavedTheme, setSavedGender);
            if (promptData) {
                setSavedTheme(promptData.channelTheme);
                setSavedGender(promptData.genderText);
            }
        };
        getUserPrompt();
    }, []);

    const saveTheme = async () => {
        await fetchSaveTheme(channelTheme, setSavedTheme, setIsEditingTheme);
    };

    const saveGender = async () => {
        await fetchSaveGender(botGender, setSavedGender, setIsEditingGender);
    };

    const startBot = async () => {
        if (!validateInputs(videoUrl, savedTheme || channelTheme, setError)) return;

        const prompt = generateBotPrompt(botGender, savedTheme, channelTheme);
        console.log("prompt", prompt);
        if (!prompt) return;

        const result = await fetchStartBot(videoUrl, prompt, botGender, setIsBotRunning);
        alert(result.message);

        setVideoUrl("");
        setSavedTheme(channelTheme);
        setSavedGender(botGender);
    };

    if (isConnected === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.dashboard}>
            <LogoutButton />
            <h1>YouTube Bot Dashboard</h1>
            <p>✅ Connected to YouTube!</p>

            <div className={styles.themeConteaner}>
                <Gender {...{
                    isEditingGender,
                    botGender,
                    setBotGender,
                    savedGender,
                    saveGender,
                    setIsEditingGender
                }} />

                <Theme {...{
                    isEditingTheme,
                    error,
                    channelTheme,
                    setChannelTheme,
                    savedTheme,
                    saveTheme,
                    setIsEditingTheme
                }} />
            </div>

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
