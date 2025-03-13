
import { useAuthStatus } from "../hooks/useAuthStatus";
import config from "../config/config";
import styles from "../styles/home.module.css";

const Home = () => {
    const isConnected = useAuthStatus("/dashboard");

    if (isConnected === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.home}>
            <h1>YouTube Comment Bot</h1>
            <p>Automatically reply to comments on your YouTube channel.</p>
            <a href={`${config.backendUrl}/auth/google`}>
                <button className={styles.button}>Connect YouTube</button>
            </a>
        </div>
    );
};

export default Home;

