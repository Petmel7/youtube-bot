import styles from "../styles/header.module.css";

const Tooltip = ({ children, isTooltipOpen }) => (
    <>
        {isTooltipOpen && (
            <div className={styles.dropdownMenu}>
                {children}
            </div>)}
    </>
)

export default Tooltip;

