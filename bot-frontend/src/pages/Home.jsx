
import { useAuthStatus } from "../hooks/useAuthStatus";
import { FaYoutube } from "react-icons/fa";
import config from "../config/config";
import styles from "../styles/home.module.css";

const Home = () => {
    const isConnected = useAuthStatus("/dashboard");

    if (isConnected === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.home}>
            <div className={styles.youTubeConteaner}>
                <FaYoutube className={styles.youTubeIcon} />
                <h1>YouTube Comment Bot</h1>
            </div>
            <p>Automatically reply to comments on your YouTube channel.</p>
            <a href={`${config.backendUrl}/auth/google`}>
                <button className="button">Connect YouTube</button>
            </a>
        </div>
    );
};

export default Home;

