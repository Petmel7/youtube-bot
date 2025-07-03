
import styles from "../styles/dashboard.module.css";
import { useTranslation } from "react-i18next";

const ThemeInput = ({ channelTheme, setChannelTheme, error }) => {
    const { t } = useTranslation();

    return (
        <>
            <input
                className={`${styles.input} ${error.channelTheme ? styles.inputError : ""} input-dark`}
                type="text"
                placeholder={t("theme.input.placeholder")}
                value={channelTheme}
                onChange={(e) => setChannelTheme(e.target.value)}
            />
        </>
    );
};

export default ThemeInput;