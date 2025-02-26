const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (!req.session.tokens) {
            console.error("❌ Помилка: Відсутні токени в сесії!");
            return res.status(401).json({ error: "Unauthorized: No tokens found" });
        }
        return next();
    }
    res.status(401).json({ error: "Unauthorized" });
};

module.exports = { isAuthenticated };

