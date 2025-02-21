// src/routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const { googleAuthCallback, logout, getStatus } = require("../controllers/authcontroller");

const router = express.Router();

// ✅ Google OAuth маршрути
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleAuthCallback
);

router.get("/logout", logout);
router.get("/status", getStatus);

module.exports = router;

