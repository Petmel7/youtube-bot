
import { FaYoutube } from "react-icons/fa";
import useUser from "../hooks/useUser";
import useTooltip from "../hooks/useTooltip";
import LogoutButton from "./LogoutButton";
import AdminButton from "./AdminButton";
import Tooltip from "./Tooltip";
import ThemeIcon from "./ThemeIcon";
import styles from "../styles/header.module.css";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { user, loading, error } = useUser();
    const { isTooltipOpen, showTooltip, hideTooltip } = useTooltip();
    const { t } = useTranslation();

    if (loading || !user) return <p>{t("loading")}</p>;
    if (error) return <p>{error}</p>;

    return (
        <header className={styles.header}>
            <div
                className={styles.headerSection}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
            >
                <FaYoutube className={styles.youTubeIcon} />
                <h3>{t("connected.to")}</h3>

                {user?.picture && (
                    <img key={user.picture} src={user.picture} alt={t("avatar.alt") || "User Avatar"} className={styles.userAvatar} />
                )}

                <p className={styles.name}>{user.name}</p>

                <Tooltip isTooltipOpen={isTooltipOpen}>
                    <AdminButton />
                    <LogoutButton />
                    <ThemeIcon />
                </Tooltip>
            </div>
        </header>
    );
};

export default Header;


