const cors = require("cors");
const { getClientUrl } = require("../utils/env");

const corsMiddleware = cors({
    origin: getClientUrl(),
    credentials: true
});

module.exports = corsMiddleware;
