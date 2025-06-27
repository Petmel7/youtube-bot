import styles from "../styles/dashboard.module.css";
import { SiProbot } from "react-icons/si";

const BotStarter = ({ error, videoUrl, setVideoUrl, startBot, isBotRunning }) => (
    <div className={styles.botContainer}>
        <input
            className={`${styles.input} ${error.videoUrl ? styles.inputError : ""} input-dark`}
            type="text"
            placeholder="Enter YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
        />
        {error.videoUrl && <p className={styles.error}>❌ Enter the video link!</p>}

        <button
            className="button"
            // className={styles.button}
            onClick={startBot}
            disabled={isBotRunning}
        >
            <SiProbot className={styles.botIcon} />
            {isBotRunning ? "Bot is replying..." : "Start Bot"}
        </button>
    </div>
)

export default BotStarter;