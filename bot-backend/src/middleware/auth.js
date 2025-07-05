const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated() && req.user?.tokens) {
        return next();
    }

    console.error("❌ Unauthorized: No tokens found or user is not authenticated");
    res.status(401).json({ error: "Unauthorized" });
};

module.exports = { isAuthenticated };


// const User = require("../models/User");

// const isAuthenticated = async (req, res, next) => {
//     if (req.isAuthenticated() && req.user) {
//         // Якщо req.user.tokens відсутні, підтягни з БД
//         if (!req.user.tokens || !req.user.tokens.access_token) {
//             const userFromDb = await User.findById(req.user._id);
//             if (userFromDb?.tokens) {
//                 req.user.tokens = userFromDb.tokens;
//             }
//         }
//         return next();
//     }

//     res.status(401).json({ error: "Unauthorized" });
// };

// module.exports = { isAuthenticated };



