
const { fetchAllUsers } = require("../services/userService");

const getUsers = async (req, res) => {
    try {
        const users = await fetchAllUsers();

        if (!users) {
            return res.status(404).json({ error: "No users found" });
        }

        res.json({ success: true, users });
    } catch (error) {
        console.error("❌ Error in getUsers controller:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const getUser = async (req, res) => {
    try {
        console.log("📌 Session:", req.session);
        console.log("📌 User from session:", req.user);

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        res.json({ success: true, user: req.user });
    } catch (error) {
        console.error("❌ Error fetching user role:", error);
        res.status(500).json({ error: "Failed to fetch user" });
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

module.exports = { getUserRole, getUsers, getUser };
