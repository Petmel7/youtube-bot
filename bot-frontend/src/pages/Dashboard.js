
import React, { useState, useEffect } from "react";
import config from "../config/config";

const Dashboard = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [customPrompt, setCustomPrompt] = useState("");

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await fetch(`${config.backendUrl}/auth/status`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();
                console.log("data", data);
                console.log("data.connected", data.connected);
                setIsConnected(data.connected);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        checkAuthStatus();
    }, []);

    const extractVideoId = (url) => {
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        return match ? match[1] : null;
    };

    const startBot = async () => {
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            alert("❌ Невірний формат посилання!");
            return;
        }

        try {
            const res = await fetch(`${config.backendUrl}/bot/start`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoId, prompt: customPrompt })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("data:", data);
            alert(data.success ? "🤖 Bot finished replying to comments." : "❌ Failed to start bot.");
        } catch (error) {
            console.error("Bot start error:", error);
            alert("❌ Error starting bot.");
        }

    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>YouTube Bot Dashboard</h1>
            {isConnected ? (
                <>
                    <p>✅ Connected to YouTube!</p>
                    <input
                        type="text"
                        placeholder="Enter YouTube video URL"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
                    />
                    <br />
                    <textarea
                        placeholder="Enter your custom prompt"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        style={{ padding: "10px", width: "300px", height: "100px", marginBottom: "10px" }}
                    />
                    <br />
                    <button onClick={startBot} style={{ padding: "10px 20px", fontSize: "16px" }}>
                        Start Bot
                    </button>
                </>
            ) : (
                <a href={`${config.backendUrl}/auth/google`}>
                    <button style={{ padding: "10px 20px", fontSize: "16px" }}>Connect to YouTube</button>
                </a>
            )}
        </div>
    );
};

export default Dashboard;

