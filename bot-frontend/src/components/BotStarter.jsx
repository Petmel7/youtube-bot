import styles from "../styles/dashboard.module.css";

const BotStarter = ({ error, videoUrl, setVideoUrl, startBot, isBotRunning }) => (
    <>
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
    </>
)

export default BotStarter;