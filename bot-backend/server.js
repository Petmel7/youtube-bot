const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("dotenv").config();

// ✅ Підключення Passport конфігурації
require("./src/config/passport");

const authRoutes = require("./src/routes/authRoutes");
const botRoutes = require("./src/routes/botRoutes");
const userPromptRoutes = require("./src/routes/userPromptRoutes");

const { sessionSecret, mongoUri } = require("./src/config/config");

// ✅ Ініціалізація додатку
const app = express();

// ✅ Підключення до MongoDB Atlas
mongoose.connect(mongoUri)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Налаштування CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// ✅ Налаштування сесій з використанням MongoStore
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoUri,
        collectionName: "sessions",
        ttl: 7 * 24 * 60 * 60  // ⏳ Зберігаємо сесії 7 днів
    }),
    cookie: {
        secure: false,  // ⚠️ Змініть на true для production
        httpOnly: false,
        sameSite: "lax"
    }
}));

// ✅ Ініціалізація Passport (ПЕРЕД роутами)
app.use(passport.initialize());
app.use(passport.session());

// ✅ Підтримка JSON в запитах
app.use(express.json());

// ✅ Логування сесій для діагностики
app.use((req, res, next) => {
    console.log("Session:", req.session);
    next();
});

// ✅ Підключення роутів
app.use("/auth", authRoutes);
app.use("/bot", botRoutes);
app.use("/user-prompt", userPromptRoutes);

// ✅ Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

