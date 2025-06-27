import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserRole } from "../services/userService";
import styles from "../styles/admin.module.css";

const AdminButton = () => {
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getUserRole = async () => {
            const userData = await fetchUserRole();
            if (userData) {
                setUserRole(userData.role);
            }
        };
        getUserRole();
    }, []);

    return (
        <>
            {userRole === "admin" && (
                <button className={styles.adminButton} onClick={() => navigate("/admin")}>
                    Admin
                </button>
            )}
        </>
    )
}

export default AdminButton;