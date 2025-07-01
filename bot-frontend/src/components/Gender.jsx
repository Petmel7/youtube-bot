
import { FaMale, FaFemale } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import GenderRadioGroup from "./GenderRadioGroup";
import Tooltip from "./Tooltip";
import useTooltip from "../hooks/useTooltip";
import styles from "../styles/dashboard.module.css";

const Gender = ({
    isEditingGender,
    botGender,
    setBotGender,
    savedGender,
    saveGender,
    setIsEditingGender
}) => {

    const { t } = useTranslation();
    const { isTooltipOpen, showTooltip, hideTooltip } = useTooltip();

    return (
        <>
            {isEditingGender ? (
                <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className={styles.genderSelection}>
                    <GenderRadioGroup botGender={botGender} setBotGender={setBotGender} />

                    <Tooltip isTooltipOpen={isTooltipOpen}>
                        <button className={styles.cancelButton} onClick={() => setIsEditingGender(false)}>{t("cancel")}</button>
                        <button className={`${styles.saveButton} ${styles.editAndSaveButton}`} onClick={saveGender}>{t("save")}</button>
                    </Tooltip>
                </div>
            ) : savedGender ? (
                <div className={styles.genderDisplay}>
                    <div className={styles.genderAndThemeInfo}>
                        <p className={styles.genderAndThemeIcon}>{savedGender === "male" ? <FaMale /> : <FaFemale />}</p>
                        <p>{t("bot.gender")}: <strong>{savedGender === "male" ? t("male") : t("female")}</strong></p>
                    </div>
                    <button className={`${styles.editButton} ${styles.editAndSaveButton}`} onClick={() => setIsEditingGender(true)}>{t("change.gender")}</button>
                </div>
            ) : (
                <div className={styles.genderSelection}>
                    <GenderRadioGroup botGender={botGender} setBotGender={setBotGender} />
                </div>
            )}
        </>
    );
};

export default Gender;

