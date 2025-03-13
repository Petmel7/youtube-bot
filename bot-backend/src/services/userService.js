const User = require("../models/User");

const fetchAllUsers = async () => {
    try {
        const users = await User.find({}, "name email role createdAt");
        return users.length > 0 ? users : null;
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        return null;
    }
};

module.exports = { fetchAllUsers };
