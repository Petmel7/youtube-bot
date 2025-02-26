const User = require("../models/User");

const googleAuthCallback = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            console.error("❌ Помилка: Користувач не знайдений!");
            return res.status(404).send("User not found");
        }

        // ✅ Зберігаємо токени в сесії
        req.session.tokens = user.tokens;
        console.log("✅ Токени збережено в сесії:", req.session.tokens);

        res.redirect("http://localhost:3000/dashboard");
    } catch (error) {
        console.error("❌ Помилка Google Auth Callback:", error);
        res.status(500).send("Authentication failed.");
    }
};

const logout = (req, res, next) => {
    req.logout(err => {
        if (err) {
            console.error("Logout error:", err);
            return next(err);
        }
        res.redirect("/");
    });
};

const getStatus = (req, res) => {
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
