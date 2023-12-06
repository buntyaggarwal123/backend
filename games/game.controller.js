"use strict";
const Constant = require("../config/constant");
const { CommonHelper } = require("../utils/common-helper");
const GameService = require("./game.model");
const { GameRequest } = require("./game.request");
const d = require("../utils/rabbitMq")

class GameController {

    /**
     * Method: gamePlay
     * Purpose: insert the details of my game play
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gamePlay = async (req, res) => {
        try {
            const input = req.body;
            const { error, value } = GameRequest.gamePlay(res).validate(input);
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }
            const response = await await GameService.gamePlay(value).catch((err) => {
                return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);

            });
            if (!response) { return; }
            // publishToQueue('game_play', { value });
            d
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "Insert Successfully", response);
        } catch (e) {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
        }
    }

    /**
     * Method: gameDetails
     * Purpose: get the details of my game play by game id
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gameDetails = async (req, res, next) => {
        try {
            const input = req.query;
            const { error, value } = GameRequest.gameDetails(res).validate(input);
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }
            const response = await await GameService.gameDetails(value).catch((err) => {
                return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);

            });
            if (!response) { return; }
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "Fetch Successfully", response);
        } catch (e) {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
        }
    }

    /**
     * Method: gameScore
     * Purpose: update my score
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gameScore = async (req, res, next) => {
        try {
            const input = req.body;
            const { error, value } = GameRequest.gameScore(res).validate(input);
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }
            const response = await await GameService.gameScore(value).catch((err) => {
                return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, err, []);

            });
            if (!response) { return; }
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "Updated Successfully", response);
        } catch (e) {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
        }
    }

    /**
     * Method: resetStats
     * Purpose: to reset user's game data
     * @param {*} req
     * @param {*} res
     * @returns
     */
    resetStats = async (req, res, next) => {
        try {
            const value = { userId: req.user.userId }
            const response = await await GameService.resetStats(value).catch((err) => {
                return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, err, []);
            });
            if (!response) { return; }
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "Reset Successfully", response);
        } catch (e) {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
        }
    }

}


module.exports = new GameController();