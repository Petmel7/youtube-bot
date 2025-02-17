// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./routes/authRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/auth", authRoutes);

// module.exports = app;


// const express = require("express");
// const cors = require("cors");
// const session = require("express-session");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // ✅ Оновлюємо CORS (ВАЖЛИВО!)
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // ✅ Оновлюємо налаштування сесії
// app.use(session({
//     secret: process.env.SESSION_SECRET || "supersecretkey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false,
//         httpOnly: false,
//         sameSite: "lax"
//     }
// }));

// app.use(express.json());
// app.use("/auth", authRoutes);

// module.exports = app;
