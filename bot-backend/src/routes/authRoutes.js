
const express = require("express");
const passport = require("passport");
const { googleAuthCallback, logout, getStatus } = require("../controllers/authcontroller");

const router = express.Router();

router.get("/google", passport.authenticate("google", {
    scope: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/youtube.force-ssl"
    ],
    accessType: "offline",
    prompt: "consent"
}));

// router.get("/google", passport.authenticate("google", {
//     scope: [
//         "profile",
//         "email",
//         "https://www.googleapis.com/auth/youtube.force-ssl", // ✅ Доступ до YouTube API
//         "https://www.googleapis.com/auth/userinfo.profile", // ✅ Доступ до профілю
//         "https://www.googleapis.com/auth/userinfo.email" // ✅ Доступ до email
//     ],
//     accessType: "offline",
//     prompt: "consent"
// }));

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleAuthCallback
);

router.get("/logout", logout);
router.get("/status", getStatus);

module.exports = router;

