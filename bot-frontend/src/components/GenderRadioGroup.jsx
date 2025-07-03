
import styles from "../styles/dashboard.module.css";
import { useTranslation } from "react-i18next";

const GenderRadioGroup = ({ botGender, setBotGender }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.genderContainer}>
                {["male", "female"].map((gender) => (
                    <label key={gender} className={`${styles.genderLabel} ${botGender === gender ? styles.selected : ""}`}>
                        <input
                            type="radio"
                            value={gender}
                            checked={botGender === gender}
                            onChange={() => setBotGender(gender)}
                            className={styles.hiddenRadio}
                        />
                        {t(gender)}
                    </label>
                ))}
            </div>
            <p className={styles.genderDescription}>{t("select.identity")}</p>
        </>
    );
};

export default GenderRadioGroup;

