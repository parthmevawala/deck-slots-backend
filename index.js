"use strict";

const http = require("http");
const cors = require("cors");
const express = require("express");
const { appConfig } = require("./config");
const router = require("./src/routes");

// Connection to mongodb
require("./src/connection");

const app = express();
const server = http.createServer(app);

app.use(
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
    express.static("./src/public")
);
app.use("/api/v1", router);

server.listen(appConfig.port, () => {
    console.info("Server is listening to port: " + appConfig.port);
});
