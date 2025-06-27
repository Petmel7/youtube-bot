Що було змінено 
1) Цю частину в bot-frontend/src/pages/Home.jsx
<!-- <footer className="privacy-policy">
    <a href="privacy-policy"{t("privacy.policy")}</a>
</footer> -->

2) Цю частину в bot-backend/src/config/session.js
secure: false,  // ⚠️ Змінити на true у production
з true на false