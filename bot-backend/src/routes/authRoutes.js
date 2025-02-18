
const express = require("express");
const { googleAuth, googleCallback, checkStatus, sessionMiddleware } = require("../controllers/authcontroller");

const router = express.Router();

// Додаємо middleware сесій
router.use(sessionMiddleware);

// 🔹 Google Auth
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

// 🔹 Перевірка статусу підключення
router.get("/status", checkStatus);

module.exports = router;
