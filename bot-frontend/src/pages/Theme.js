import styles from "../styles/dashboard.module.css";

const Theme = ({
    isEditingTheme,
    error,
    channelTheme,
    setChannelTheme,
    savedTheme,
    saveTheme,
    setIsEditingTheme }) => {
    return (
        <>
            {isEditingTheme ? (
                <div className={styles.inputContainer}>
                    <input
                        className={`${styles.input} ${error.channelTheme ? styles.inputError : ""}`}
                        type="text"
                        placeholder="Enter new channel theme"
                        value={channelTheme}
                        onChange={(e) => setChannelTheme(e.target.value)}
                    />
                    <button className={styles.saveButton} onClick={saveTheme}>Save</button>
                </div>
            ) : savedTheme ? (
                <div className={styles.themeDisplay}>
                    <p>Channel theme: <strong>{savedTheme}</strong></p>
                    <button className={styles.editButton} onClick={() => setIsEditingTheme(true)}>Change Theme</button>
                </div>
            ) : (
                <div>
                    <input
                        className={`${styles.input} ${error.channelTheme ? styles.inputError : ""}`}
                        type="text"
                        placeholder="Enter channel theme"
                        value={channelTheme}
                        onChange={(e) => setChannelTheme(e.target.value)}
                    />
                </div>
            )}
        </>
    )
}

export default Theme;