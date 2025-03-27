import styles from "../styles/dashboard.module.css";

const ThemeInput = ({ channelTheme, setChannelTheme, error }) => (

    <input
        className={`${styles.input} ${error.channelTheme ? styles.inputError : ""} input-dark`}
        type="text"
        placeholder="Enter new channel theme"
        value={channelTheme}
        onChange={(e) => setChannelTheme(e.target.value)}
    />
)

export default ThemeInput;