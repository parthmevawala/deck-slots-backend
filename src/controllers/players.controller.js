"use strict";

const { playersService } = require("../services");
const { deleteFile } = require("../helpers/fileHandler");

/**
 * Insert player - controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const insertPlayer = async (req, res, next) => {
    try {
        const response = await playersService.insertPlayer(req.body, req.file);
        res.status(200).json(response);
    } catch (error) {
        if (req.file) {
            deleteFile(req.file.filename);
        }
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

/**
 * Login player - controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const loginPlayer = async (req, res, next) => {
    try {
        const response = await playersService.loginPlayer(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

/**
 * Update player records - controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const updatePlayerRecords = async (req, res, next) => {
    try {
        const response = await playersService.updatePlayerRecords(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

/**
 * Fetch player - controller
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const fetchPlayer = async (req, res, next) => {
    try {
        const response = await playersService.fetchPlayer(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
        });
    }
};

module.exports = {
    insertPlayer,
    loginPlayer,
    updatePlayerRecords,
    fetchPlayer,
};
