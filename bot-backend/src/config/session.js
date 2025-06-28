
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const { sessionSecret, mongoUri } = require("./config");

// const sessionMiddleware = session({
//     secret: sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         mongoUrl: mongoUri,
//         collectionName: "sessions",
//         ttl: 7 * 24 * 60 * 60  // ⏳ Зберігаємо сесії 7 днів
//     }),
//     cookie: {
//         secure: true,  // ⚠️ Змінити на true у production
//         httpOnly: false,
//         sameSite: "lax"
//     }
// });

// module.exports = sessionMiddleware;


const session = require("express-session");
const MongoStore = require("connect-mongo");
const { sessionSecret, mongoUri } = require("./config");
// const isProduction = require("../utils/env");

const isProduction = process.env.NODE_ENV === "production";

console.log("☑️isProduction:", isProduction);

const sessionMiddleware = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoUri,
        collectionName: "sessions",
        ttl: 7 * 24 * 60 * 60
    }),
    cookie: {
        secure: isProduction,             // ✅ HTTPS only в продакшні
        httpOnly: true,                   // ✅ приховати куку від JS (рекомендовано)
        sameSite: isProduction ? "none" : "lax"  // ✅ важливо для кросдоменної авторизації
    }
});

module.exports = sessionMiddleware;

