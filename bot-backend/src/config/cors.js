const cors = require("cors");
const { getClientUrl } = require("../utils/env");

console.log("☑️☑️corsMiddleware->getClientUrl", getClientUrl());

const corsMiddleware = cors({
    origin: getClientUrl(),
    credentials: true
});

module.exports = corsMiddleware;
