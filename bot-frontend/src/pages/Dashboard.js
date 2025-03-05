
// import { useState, useEffect } from "react";
// import config from "../config/config";

// const Dashboard = () => {
//     const [isConnected, setIsConnected] = useState(false);
//     const [videoUrl, setVideoUrl] = useState("");
//     const [channelTheme, setChannelTheme] = useState("");
//     const [customPrompt, setCustomPrompt] = useState("");

//     useEffect(() => {
//         const checkAuthStatus = async () => {
//             try {
//                 const res = await fetch(`${config.backendUrl}/auth/status`, {
//                     method: "GET",
//                     credentials: "include",
//                     headers: { "Content-Type": "application/json" }
//                 });

//                 const data = await res.json();
//                 console.log("data", data);
//                 console.log("data.connected", data.connected);
//                 setIsConnected(data.connected);
//             } catch (error) {
//                 console.error("Fetch error:", error);
//             }
//         };

//         checkAuthStatus();
//     }, []);

//     const extractVideoId = (url) => {
//         const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
//         return match ? match[1] : null;
//     };

//     const addTheme = async () => {
//         if (!channelTheme) {
//             alert("❌ Введіть тематику каналу!");
//             return null;
//         }
//         try {
//             const res = await fetch(`${config.backendUrl}/user-prompt/add`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ channelTheme })
//             });

//             const data = await res.json();
//             if (data.success) {
//                 alert("✅ Тематика каналу додана!");
//                 setCustomPrompt(data.prompt.generalPrompt); // Оновлення state
//                 return data.prompt; // Повертаємо prompt для використання у startBot()
//             } else {
//                 alert("❌ Не вдалося додати тематику каналу.");
//                 return null;
//             }
//         } catch (error) {
//             console.error("❌ Error updating channel theme:", error);
//             return null;
//         }
//     };

//     const startBot = async () => {
//         const videoId = extractVideoId(videoUrl);
//         if (!videoId) {
//             alert("❌ Невірний формат посилання!");
//             return;
//         }

//         try {
//             const themeUpdate = await addTheme();
//             if (!themeUpdate) {
//                 alert("❌ Не вдалося оновити тематику каналу.");
//                 return;
//             }

//             const res = await fetch(`${config.backendUrl}/bot/start`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ videoId, prompt: themeUpdate.generalPrompt }) // Використовуємо оновлений prompt
//             });

//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }

//             const data = await res.json();
//             alert(data.success ? "🤖 Bot finished replying to comments." : "❌ Failed to start bot.");
//         } catch (error) {
//             console.error("Bot start error:", error);
//             alert("❌ Error starting bot.");
//         }
//     };

//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h1>YouTube Bot Dashboard</h1>
//             {isConnected ? (
//                 <>
//                     <p>✅ Connected to YouTube!</p>
//                     <input
//                         type="text"
//                         placeholder="Enter YouTube video URL"
//                         value={videoUrl}
//                         onChange={(e) => setVideoUrl(e.target.value)}
//                         style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
//                     />
//                     <br />
//                     <input
//                         type="text"
//                         placeholder="Enter channel theme"
//                         value={channelTheme}
//                         onChange={(e) => setChannelTheme(e.target.value)}
//                         style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
//                     />
//                     <br />
//                     <button onClick={startBot} style={{ padding: "10px 20px", fontSize: "16px" }}>
//                         🤖 Start Bot
//                     </button>
//                 </>
//             ) : (
//                 <a href={`${config.backendUrl}/auth/google`}>
//                     <button style={{ padding: "10px 20px", fontSize: "16px" }}>Connect to YouTube</button>
//                 </a>
//             )}
//         </div>
//     );
// };

// export default Dashboard;




import { useState, useEffect } from "react";
import config from "../config/config";

const Dashboard = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [channelTheme, setChannelTheme] = useState("");
    const [isBotRunning, setIsBotRunning] = useState(false); // Додаємо стан кнопки

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await fetch(`${config.backendUrl}/auth/status`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();
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

    const addTheme = async () => {
        if (!channelTheme) {
            alert("❌ Введіть тематику каналу!");
            return null;
        }
        try {
            const res = await fetch(`${config.backendUrl}/user-prompt/add`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ channelTheme })
            });

            const data = await res.json();
            if (data.success) {
                alert("✅ Тематика каналу додана!");
                return data.prompt; // Повертаємо prompt
            } else {
                alert("❌ Не вдалося додати тематику каналу.");
                return null;
            }
        } catch (error) {
            console.error("❌ Error updating channel theme:", error);
            return null;
        }
    };

    const startBot = async () => {
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            alert("❌ Невірний формат посилання!");
            return;
        }

        setIsBotRunning(true); // 🔹 Змінюємо стан кнопки перед початком

        try {
            const themeUpdate = await addTheme();
            if (!themeUpdate) {
                alert("❌ Не вдалося оновити тематику каналу.");
                setIsBotRunning(false);
                return;
            }

            const res = await fetch(`${config.backendUrl}/bot/start`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoId, prompt: themeUpdate.generalPrompt })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            alert(data.success ? "🤖 Bot finished replying to comments." : "❌ Failed to start bot.");
        } catch (error) {
            console.error("Bot start error:", error);
            alert("❌ Error starting bot.");
        }

        setIsBotRunning(false); // 🔹 Повертаємо стан кнопки після завершення
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
                    <input
                        type="text"
                        placeholder="Enter channel theme"
                        value={channelTheme}
                        onChange={(e) => setChannelTheme(e.target.value)}
                        style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
                    />
                    <br />
                    <button
                        onClick={startBot}
                        disabled={isBotRunning}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: isBotRunning ? "#ccc" : "#007bff",
                            cursor: isBotRunning ? "not-allowed" : "pointer"
                        }}
                    >
                        {isBotRunning ? "🤖 Bot відповідає..." : "🤖 Start Bot"}
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
