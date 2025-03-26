
import { useState, useEffect } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import "../index.css";

function ThemeIcon() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.className = theme; // Додаємо клас до body
        localStorage.setItem("theme", theme); // Зберігаємо тему в LocalStorage
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
        </div>
    );
}

export default ThemeIcon;