"use strict";

exports.ER_EMAIL_REQUIRED = new Error(`"email" field is required.`);
exports.ER_PASSWORD_REQUIRED = new Error(`"password" field is required.`);
exports.ER_NAME_REQUIRED = new Error(`"name" field is required.`);
exports.ER_USER_EXISTS = new Error(`A user with this email already exists.`);
exports.ER_LOGIN_FAIL = new Error(`Email or password do not match.`);
exports.ER_USER_NOT_FOUND = new Error(`This user does not exist.`);
