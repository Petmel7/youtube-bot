
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const botRoutes = require("./src/routes/botRoutes");
const { sessionSecret, mongoUri } = require("./src/config/config");

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

// ✅ Використання MongoDB для збереження сесій
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
        secure: false,
        httpOnly: false,
        sameSite: "lax"
    }
}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/bot", botRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
