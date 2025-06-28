
const { findUserById, storeUserTokensInSession } = require("../services/authService");
const { getClientUrl } = require("../utils/env");

const googleAuthCallback = async (req, res) => {
    console.log("🔔 googleAuthCallback HIT");
    if (!req.user) {
        console.log("⛔ req.user is undefined");
        return res.status(401).json({ error: "Authentication failed!" });
    }

    console.log("🔍 User received after authentication:", req.user);

    const user = await findUserById(req.user.id);
    if (!user) {
        return res.status(401).json({ error: "User not found in database!" });
    }

    storeUserTokensInSession(req, user);
    console.log("☑️☑️☑️googleAuthCallback->getClientUrl()", getClientUrl());
    res.redirect(`${getClientUrl()}/dashboard`);
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
