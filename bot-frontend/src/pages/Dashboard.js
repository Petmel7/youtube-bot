
import React, { useState, useEffect } from "react";
import config from "../config/config";

const Dashboard = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        fetch(`${config.backendUrl}/auth/status`, {
            method: "GET",
            credentials: "include",  // ✅ Передаємо cookie
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log("Response headers:", res.headers);  // ЛОГ
                return res.json();
            })
            .then(data => {
                console.log("Server response:", data);  // ЛОГ
                setIsConnected(data.connected);
            })
            .catch(error => console.error("Fetch error:", error));
    }, []);

    // const startBot = () => {
    //     alert("🤖 Bot started! (тут має бути виклик API для запуску бота)");
    // };

    const startBot = () => {
        fetch(`${config.backendUrl}/bot/start`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("🤖 Bot started!");
                } else {
                    alert("❌ Failed to start bot.");
                }
            })
            .catch(error => console.error("Bot start error:", error));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>YouTube Bot Dashboard</h1>
            {isConnected ? (
                <>
                    <p>✅ Connected to YouTube!</p>
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

