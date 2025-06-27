
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t("privacy.title")}</h1>
            <p>{t("privacy.updated")}</p>

            {Array.from({ length: 8 }).map((_, index) => {
                const section = (index + 1).toString();
                return (
                    <div key={section}>
                        <h2>{t(`privacy.sections.${section}.title`)}</h2>
                        <p>{t(`privacy.sections.${section}.body`)}</p>
                    </div>
                );
            })}
        </div>
    );
}
