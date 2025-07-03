
import styles from "../styles/dashboard.module.css";
import { SiProbot } from "react-icons/si";
import { useTranslation } from "react-i18next";

const BotStarter = ({ error, videoUrl, setVideoUrl, startBot, isBotRunning }) => {

    const { t } = useTranslation();

    return (
        <div className={styles.botContainer}>
            <div>
                <input
                    className={`${styles.input} ${error.videoUrl ? styles.inputError : ""} input-dark`}
                    type="text"
                    placeholder={t("input.placeholder")}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
            </div>

            <button
                className="button"
                onClick={startBot}
                disabled={isBotRunning}
            >
                <SiProbot className={styles.botIcon} />
                {isBotRunning ? t("bot.replying") : t("bot.start")}
            </button>
        </div>
    );
};

export default BotStarter;
