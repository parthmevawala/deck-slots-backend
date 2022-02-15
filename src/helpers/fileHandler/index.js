"use strict";

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: "./src/public",
    filename: (req, file, cb) => {
        const filename = `${Date.now().toString()}-${Math.floor(
            Math.random() * 1000000
        ).toString()}-${file.originalname}`;
        cb(null, filename);
    },
});

const uploadFile = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!["image/jpeg", "image/png"].includes(file.mimetype))
            cb(new Error("File needs to be in .jpg, .jpeg or .png formats."));
        else cb(null, true);
    },
});

const deleteFile = (filename) => {
    fs.unlink(`./src/public/${filename}`, (error) => {
        if (error) console.log(error);
    });
};

module.exports = {
    uploadFile,
    deleteFile,
};
