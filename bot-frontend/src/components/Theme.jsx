
import ThemeInput from "./ThemeInput";
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

    return (
        <>
            {isEditingTheme ? (
                <div className={styles.inputContainer}>
                    <ThemeInput channelTheme={channelTheme} setChannelTheme={setChannelTheme} error={error} />
                    <button className={`${styles.saveInputButton} ${styles.saveButton} ${styles.editAndSaveButton}`} onClick={saveTheme}>Save</button>
                </div>
            ) : savedTheme ? (
                <div className={styles.themeDisplay}>
                    <p>Channel theme: <strong>{savedTheme}</strong></p>
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