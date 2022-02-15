"use strict";

const { Router } = require("express");

const router = new Router();

router.use("/player", require("./players.route"));

module.exports = router;