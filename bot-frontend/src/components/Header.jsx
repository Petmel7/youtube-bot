
import { useState } from "react";
import useUser from "../hooks/useUser";
import { FaYoutube } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import AdminButton from "./AdminButton";
import styles from "../styles/header.module.css";

const Header = () => {
    const { user, loading, error } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (loading || !user) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    console.log("user", user.picture);
    return (
        <header className={styles.header}>
            <div
                className={styles.headerSection}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <FaYoutube className={styles.headerIcon} />
                <h3>Connected to</h3>

                {user?.picture && (
                    <img key={user.picture} src={user.picture} alt="User Avatar" className={styles.userAvatar} />
                )}

                <p className={styles.name}>{user.name}</p>

                {isMenuOpen && (
                    <div className={styles.dropdownMenu}>
                        <AdminButton />
                        <LogoutButton />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
