"use strict";

const { dbConfig } = require("../../config");
const mongoose = require("mongoose");

mongoose.connect(dbConfig.connectionURL, undefined, (error) => {
    if (error) console.log(error);
    else console.log("connection successful");
});
