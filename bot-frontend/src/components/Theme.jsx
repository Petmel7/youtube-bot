import { FaPlayCircle } from "react-icons/fa";
import ThemeInput from "./ThemeInput";
import Tooltip from "./Tooltip";
import useTooltip from "../hooks/useTooltip";
import styles from "../styles/dashboard.module.css";

const Theme = ({
    isEditingTheme,
    error,
    channelTheme,
    setChannelTheme,
    savedTheme,
    saveTheme,
    setIsEditingTheme
}) => {

    const { isTooltipOpen, showTooltip, hideTooltip } = useTooltip();

    return (
        <>
            {isEditingTheme ? (
                <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className={styles.inputContainer}>
                    <ThemeInput channelTheme={channelTheme} setChannelTheme={setChannelTheme} error={error} />

                    <Tooltip isTooltipOpen={isTooltipOpen}>
                        <button className={styles.cancelButton} onClick={() => setIsEditingTheme(false)} >Cancel</button>
                        <button className={`${styles.saveButton} ${styles.editAndSaveButton}`} onClick={saveTheme}>Save</button>
                    </Tooltip>
                </div>
            ) : savedTheme ? (
                <div className={styles.themeDisplay}>
                    <div className={styles.genderAndThemeInfo}>
                        <FaPlayCircle className={styles.genderAndThemeIcon} />
                        <p>Channel theme: <strong>{savedTheme}</strong></p>
                    </div>
                    <button className={`${styles.editButton} ${styles.editAndSaveButton}`} onClick={() => setIsEditingTheme(true)}>Change Theme</button>
                </div>
            ) : (
                <div>
                    <ThemeInput channelTheme={channelTheme} setChannelTheme={setChannelTheme} error={error} />
                </div>
            )}
        </>
    );
};

export default Theme;