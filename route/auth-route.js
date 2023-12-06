"use strict";
const express = require("express");
const router = express.Router();
const authController = require("../auth/auth.controller");

/**
 * Purpose : register user
 */
router.post(
    "/register",
    authController.signUp
);

/**
 * Purpose : login user
 */
router.post(
    "/login",
    authController.signIn
);

module.exports = router;