"use strict";

const { Router } = require("express");
const { playersController } = require("../controllers");
const { uploadFile } = require("../helpers/fileHandler");
const playerRouter = new Router();

playerRouter.post(
    "/insert",
    uploadFile.single("profileImage"),
    playersController.insertPlayer
);
playerRouter.post("/login", playersController.loginPlayer);
playerRouter.put("/update-records", playersController.updatePlayerRecords);
playerRouter.post("/fetch", playersController.fetchPlayer);

module.exports = playerRouter;
