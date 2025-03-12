const User = require("../models/User");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "name email role createdAt");

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        res.json({ success: true, users });
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const getUserRole = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        res.json({ success: true, user: { role: user.role } });
    } catch (error) {
        console.error("❌ Error fetching user role:", error);
        res.status(500).json({ error: "Failed to fetch user role" });
    }
};

module.exports = { getUserRole, getUsers };
