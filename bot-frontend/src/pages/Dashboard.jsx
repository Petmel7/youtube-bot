
import { useState, useEffect } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { fetchStartBot } from "../services/botService";
import { validateInputs } from "../validate/validateInputs";
import { fetchUserPrompt, fetchSaveTheme, fetchSaveGender, generateBotPrompt } from "../services/promptService";
import Gender from "../components/Gender";
import Theme from "../components/Theme";
import AdminButton from "../components/AdminButton";
import BotStarter from "../components/BotStarter";
import Header from "../components/Header";
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
        <div className={styles.dashboardConteaner}>
            <Header />

            <h1>YouTube Bot Dashboard</h1>

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

            <BotStarter {...{
                error,
                videoUrl,
                setVideoUrl,
                startBot,
                isBotRunning
            }} />
        </div>
    );
};

export default Dashboard;
