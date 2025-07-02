
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";

const ThemeIcon = () => {
    const { theme, toggleTheme } = useTheme();

    if (!theme) return null;

    return (
        <div onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
        </div>
    );
};

export default ThemeIcon;
