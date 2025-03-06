
// import React from "react";
// import config from "../config/config";
// import styles from "../styles/home.module.css"

// const Home = () => {
//     return (
//         <div className={styles.home}>
//             <h1>YouTube Comment Bot</h1>
//             <p>Automatically reply to comments on your YouTube channel.</p>
//             <a href={`${config.backendUrl}/auth/google`}>
//                 <button className={styles.button}>Connect YouTube</button>
//             </a>
//         </div>
//     );
// };

// export default Home;





import React from "react";
import { useState, useEffect } from "react";
import { fetchAuthStatus } from "../services/authService";
import config from "../config/config";
import styles from "../styles/home.module.css";
import Dashboard from "./Dashboard";

const Home = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const data = await fetchAuthStatus();
            setIsConnected(data.connected);
        };
        checkAuthStatus();
    }, []);

    return (
        <>
            {
                isConnected ? (
                    <div className={styles.home}>
                        <h1>YouTube Comment Bot</h1>
                        <p>Automatically reply to comments on your YouTube channel.</p>
                        <a href={`${config.backendUrl}/auth/google`}>
                            <button className={styles.button}>Connect YouTube</button>
                        </a>
                    </div>
                ) : (
                    <Dashboard />
                )}
        </>
    );
};

export default Home;