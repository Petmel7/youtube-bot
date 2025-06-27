const User = require("../models/User");

const findUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        return null;
    }
};

const storeUserTokensInSession = (req, user) => {
    req.session.tokens = user.tokens;
    console.log("✅ Session updated:", req.session);
};

module.exports = { findUserById, storeUserTokensInSession };
