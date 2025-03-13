import { useNavigate } from "react-router-dom";
import styles from "../styles/dashboard.module.css";

const AdminButton = ({ userRole }) => {
    const navigate = useNavigate();

    return (
        <>
            {userRole === "admin" && (
                <button className={styles.adminButton} onClick={() => navigate("/admin")}>
                    🚀 Admin Panel
                </button>
            )}
        </>
    )
}

export default AdminButton;