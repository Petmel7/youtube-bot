const mongoose = require("mongoose");

const userPromptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    channelTheme: { type: String, required: true, default: "" },
    genderText: { type: String, required: true, default: "" },
    generalPrompt: { type: String, required: true }
}, { timestamps: true });

const UserPrompt = mongoose.model("UserPrompt", userPromptSchema);
module.exports = UserPrompt;
