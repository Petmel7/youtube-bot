import { FaMale, FaFemale } from "react-icons/fa";
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

    const { isTooltipOpen, showTooltip, hideTooltip } = useTooltip();

    return (
        <>
            {isEditingGender ? (
                <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className={styles.genderSelection}>
                    <GenderRadioGroup botGender={botGender} setBotGender={setBotGender} />

                    <Tooltip isTooltipOpen={isTooltipOpen}>
                        <button className={styles.cancelButton} onClick={() => setIsEditingGender(false)} >Cancel</button>
                        <button className={`${styles.saveButton} ${styles.editAndSaveButton}`} onClick={saveGender}>Save</button>
                    </Tooltip>
                </div>
            ) : savedGender ? (
                <div className={styles.genderDisplay}>
                    <div className={styles.genderAndThemeInfo}>
                        <p className={styles.genderAndThemeIcon}>{savedGender === "male" ? <FaMale /> : <FaFemale />}</p>
                        <p>Bot identity: <strong>{savedGender === "male" ? "Male" : "Female"}</strong></p>
                    </div>
                    <button className={`${styles.editButton} ${styles.editAndSaveButton}`} onClick={() => setIsEditingGender(true)}>Change Gender</button>
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
