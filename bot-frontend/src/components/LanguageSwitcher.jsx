
import { useState } from "react";
import { useTranslation } from "react-i18next";
import languages from "../config/languages";
import styles from "../styles/languageSwitcher.module.css";

const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        setIsOpen(false);
    };

    const currentLabel =
        languages.find(l => l.code === i18n.language)?.label || i18n.language;

    return (
        <div className={styles.languageSwitcher}>
            <div
                className={styles.customSelect}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{currentLabel}</span>
                {isOpen && (
                    <ul className={styles.customDropdown}>
                        {languages.map(({ code, label }) => (
                            <li key={code} onClick={() => handleLanguageChange(code)}>
                                {label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
