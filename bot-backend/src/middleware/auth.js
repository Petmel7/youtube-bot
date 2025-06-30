const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated() && req.user?.tokens) {
        return next();
    }

    console.error("❌ Unauthorized: No tokens found or user is not authenticated");
    res.status(401).json({ error: "Unauthorized" });
};

module.exports = { isAuthenticated };


