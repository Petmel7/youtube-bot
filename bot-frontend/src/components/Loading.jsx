
import { useTranslation } from "react-i18next";
import styles from "../styles/loading.module.css";

const Loading = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>{t("loading")}</p>
        </div>
    );
};

export default Loading;
