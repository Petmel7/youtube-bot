
import { useNavigate } from "react-router-dom";
import { fetchLogout } from "../services/authService";
import { useTranslation } from "react-i18next";
import styles from "../styles/logout.module.css";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = async () => {
        const res = await fetchLogout();

        if (res.ok) {
            navigate("/");
        } else {
            console.error("❌ Logout failed");
        }
    };

    return (
        <button className={styles.logoutButton} onClick={handleLogout}>
            {t("logout")}
        </button>
    );
};

export default LogoutButton;
