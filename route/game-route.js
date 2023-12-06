"use strict";
const express = require("express");
const router = express.Router();
const TokenMiddleware = require("../middleware/token.middleware");
const gameController = require("../games/game.controller");

/**
 * Purpose : insert the details of my game play
 */
router.post(
    '/game-play', 
    TokenMiddleware.authorize,
    gameController.gamePlay
);

/**
 * Purpose : get the details of my game play by game id
 */
router.get(
    '/game-detail', 
    TokenMiddleware.authorize,
    gameController.gameDetails
);

/**
 * Purpose : update my score
 */
router.put(
    '/game-score', 
    TokenMiddleware.authorize,
    gameController.gameScore
);

/**
 * Purpose : to reset user's game data
 */
router.delete(
    '/reset-stats', 
    TokenMiddleware.authorize,
    gameController.resetStats
);

module.exports = router;