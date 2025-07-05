const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { fetchUserVideos } = require("../controllers/youtubeController");

const router = express.Router();

router.get("/my-videos", isAuthenticated, fetchUserVideos);

module.exports = router;
