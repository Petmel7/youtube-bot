const User = require("../models/User");

const googleAuthCallback = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Authentication failed!" });
    }

    console.log("🔍 Отримано користувача після авторизації:", req.user);

    // Завантажуємо користувача з бази даних
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(401).json({ error: "User not found in database!" });
    }

    // Зберігаємо токени в сесії
    req.session.tokens = user.tokens;

    console.log("✅ Сесія оновлена:", req.session);

    res.redirect("http://localhost:3000/dashboard");
};

const logout = (req, res, next) => {
    req.logout(err => {
        if (err) {
            console.error("Logout error:", err);
            return next(err);
        }
        req.session.destroy(() => {  // Видаляємо сесію
            res.clearCookie("connect.sid");  // Очищуємо куки сесії
            res.json({ success: true, message: "Logged out successfully" });
        });
    });
};

const getStatus = (req, res) => {
    console.log("✅ getStatus req.isAuthenticated()", req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.json({ connected: true, user: req.user });
    } else {
        res.json({ connected: false });
    }
};

module.exports = {
    googleAuthCallback,
    logout,
    getStatus
};
