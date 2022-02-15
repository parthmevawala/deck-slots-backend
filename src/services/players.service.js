"use strict";

const { Types } = require("mongoose");
const { playersModel } = require("../models");
const {
    ER_EMAIL_REQUIRED,
    ER_PASSWORD_REQUIRED,
    ER_NAME_REQUIRED,
    ER_USER_EXISTS,
    ER_LOGIN_FAIL,
    ER_USER_NOT_FOUND,
} = require("../constants/errors.constants");

/**
 * Upsert player - service
 * @param {object} body
 * @param {object} file
 * @returns
 */
const insertPlayer = async (body, file = undefined) => {
    const { email = undefined, password = undefined, name = undefined } = body;

    // validations
    if (!email) throw ER_EMAIL_REQUIRED;
    if (!password) throw ER_PASSWORD_REQUIRED;
    if (!name) throw ER_NAME_REQUIRED;

    if (await playersModel.countDocuments({ email })) throw ER_USER_EXISTS;

    let docObject = {
        email,
        password,
        name,
        profile_image: file ? file.filename : "avatar.png",
    };

    // Insert
    let doc = new playersModel(docObject);
    let data = await doc.save();

    return {
        data: data._doc || data,
        message: "User has been inserted.",
    };
};

/**
 * Player login - service
 * @param {object} body
 * @returns
 */
const loginPlayer = async (body) => {
    const { email = undefined, password = undefined } = body;

    // validations
    if (!email) throw ER_EMAIL_REQUIRED;
    if (!password) throw ER_PASSWORD_REQUIRED;

    const data = await playersModel.findOne({ email }).lean();

    if (data && data.password === password) {
        return {
            data,
            message: "Player logged in.",
        };
    }

    throw ER_LOGIN_FAIL;
};

/**
 * Record update - service
 * @param {object} body
 * @returns
 */
const updatePlayerRecords = async (body) => {
    const { _id, result_slots, cost, win } = body;
    const user = await playersModel.findById(_id).lean();

    if (!user) throw ER_USER_NOT_FOUND;
    const balance = user.balance - cost + win;

    const reflection = {
        $set: {
            balance,
        },
        $push: {
            records: {
                result_slots,
                cost,
                win,
                balance,
            },
        },
    };

    const options = {
        new: true,
        upsert: false,
        multi: false,
    };

    const data = await playersModel
        .findByIdAndUpdate(_id, reflection, options)
        .lean();

    return {
        data,
        message: "Record entered.",
    };
};

/**
 * Fetch player - service
 * @param {object} body
 * @returns
 */
const fetchPlayer = async (body) => {
    const { _id, page = 1 } = body;

    let data = await playersModel.aggregate([
        {
            $match: {
                _id: Types.ObjectId(_id),
            },
        },
        {
            $unwind: "$records",
        },
        {
            $skip: (page - 1) * 10,
        },
        {
            $limit: 11,
        },
        {
            $project: {
                records: 1,
            },
        },
        {
            $group: {
                _id: "$_id",
                entries: {
                    $push: {
                        record: "$records",
                    },
                },
            },
        },
    ]);

    let data2 = await playersModel.findById(_id, { records: 0 }).lean();

    if (data.length) {
        data = data[0].entries.map((r) => r.record);
    }

    data = { records: data, ...data2 };
    if (data.records.length === 11) {
        data.records.pop();
        data.lastPage = false;
    } else {
        data.lastPage = true;
    }
    return {
        data,
        message: "Data fetched.",
    };
};

module.exports = {
    insertPlayer,
    loginPlayer,
    updatePlayerRecords,
    fetchPlayer,
};
