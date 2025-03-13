
const express = require("express");
const passport = require("passport");
require("dotenv").config();

// ✅ Імпорти конфігурацій
const connectDB = require("./src/config/db");
const sessionMiddleware = require("./src/config/session");
const corsMiddleware = require("./src/config/cors");

// ✅ Підключення Passport конфігурації
require("./src/config/passport");

// ✅ Імпорти маршрутів
const authRoutes = require("./src/routes/authRoutes");
const botRoutes = require("./src/routes/botRoutes");
const userRoutes = require("./src/routes/userRoutes");
const userPromptRoutes = require("./src/routes/userPromptRoutes");

// ✅ Ініціалізація додатку
const app = express();

// ✅ Підключення до MongoDB
connectDB();

// ✅ Налаштування middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Логування сесій (для діагностики)
app.use((req, res, next) => {
    console.log("Session:", req.session);
    next();
});

// ✅ Підключення роутів
app.use("/auth", authRoutes);
app.use("/bot", botRoutes);
app.use("/user", userRoutes);
app.use("/user-prompt", userPromptRoutes);

// ✅ Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
