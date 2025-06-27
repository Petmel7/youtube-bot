import { useNavigate } from "react-router-dom";
import { fetchLogout } from "../services/authService";
import styles from "../styles/logout.module.css";

const LogoutButton = () => {
    const navigate = useNavigate();

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
            Logout
        </button>
    );
};

export default LogoutButton;