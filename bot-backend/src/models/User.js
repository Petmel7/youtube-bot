const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    role: { type: String, required: true, default: "user" },
    tokens: {
        access_token: String,
        refresh_token: String,
        scope: String,
        token_type: String,
        expiry_date: Number
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
