
// import { useState, useEffect } from "react";
// import config from "../config/config";
// import { fetchAuthStatus } from "../services/authService";
// import { fetchStartBot } from "../services/botService";
// import styles from "../styles/dashboard.module.css"

// const Dashboard = () => {
//     const [isConnected, setIsConnected] = useState(false);
//     const [videoUrl, setVideoUrl] = useState("");
//     const [channelTheme, setChannelTheme] = useState("");
//     const [isBotRunning, setIsBotRunning] = useState(false);

//     useEffect(() => {
//         const checkAuthStatus = async () => {
//             const data = await fetchAuthStatus();
//             setIsConnected(data.connected);
//         };
//         checkAuthStatus();
//     }, []);

//     const startBot = async () => {
//         const result = await fetchStartBot(videoUrl, channelTheme, setIsBotRunning);
//         alert(result.message);
//     };

//     return (
//         <div className={styles.dashboard}>
//             <h1>YouTube Bot Dashboard</h1>
//             {isConnected ? (
//                 <>
//                     <p>✅ Connected to YouTube!</p>
//                     <input
//                         className={styles.input}
//                         type="text"
//                         placeholder="Enter YouTube video URL"
//                         value={videoUrl}
//                         onChange={(e) => setVideoUrl(e.target.value)}
//                     />
//                     <input
//                         className={styles.input}
//                         type="text"
//                         placeholder="Enter channel theme"
//                         value={channelTheme}
//                         onChange={(e) => setChannelTheme(e.target.value)}
//                     />
//                     <button
//                         className={styles.button}
//                         onClick={startBot}
//                         disabled={isBotRunning}
//                     >
//                         {isBotRunning ? "🤖 Bot is replying..." : "🤖 Start Bot"}
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






import { useState } from "react";
import { fetchStartBot } from "../services/botService";
import styles from "../styles/dashboard.module.css"

const Dashboard = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [channelTheme, setChannelTheme] = useState("");
    const [isBotRunning, setIsBotRunning] = useState(false);

    const startBot = async () => {
        const result = await fetchStartBot(videoUrl, channelTheme, setIsBotRunning);
        alert(result.message);
    };

    return (
        <div className={styles.dashboard}>
            <h1>YouTube Bot Dashboard</h1>
            <p>✅ Connected to YouTube!</p>
            <input
                className={styles.input}
                type="text"
                placeholder="Enter YouTube video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
            />
            <input
                className={styles.input}
                type="text"
                placeholder="Enter channel theme"
                value={channelTheme}
                onChange={(e) => setChannelTheme(e.target.value)}
            />
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
