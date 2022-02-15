"use strict";

const mongoose = require("mongoose");

const RecordsSchema = new mongoose.Schema({
    _id: false,
    result_slots: [
        {
            type: String,
        },
    ],
    cost: {
        type: Number,
    },
    win: {
        type: Number,
    },
    balance: {
        type: Number,
    },
});

const PlayersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        balance: {
            type: Number,
            default: 10,
        },
        profile_image: {
            type: String,
            default: "avatar.png",
        },
        records: [RecordsSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("cl_players", PlayersSchema);
