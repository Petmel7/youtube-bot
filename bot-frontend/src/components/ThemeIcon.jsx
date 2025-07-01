
// import { useState, useEffect } from "react";
// import { IoMdMoon, IoMdSunny } from "react-icons/io";
// import "../index.css";

// function ThemeIcon() {
//     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//     useEffect(() => {
//         document.body.className = theme;
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     const toggleTheme = () => {
//         setTheme((prev) => (prev === "light" ? "dark" : "light"));
//     };

//     return (
//         <div onClick={toggleTheme} className="theme-toggle">
//             {theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
//         </div>
//     );
// }

// export default ThemeIcon;



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
