
const googleAuthCallback = (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
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
