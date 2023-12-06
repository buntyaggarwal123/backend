const Joi = require("joi");

class GameRequest {

    /**
     * Method: gamePlay
     * Purpose: Joi Validation
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gamePlay = (res) => {
        return Joi.object().keys({
            userId: Joi.number().required()
                .messages({
                    "any.required": `user id is required`,
                    "number": `user id must be a number`
                }),
            score: Joi.number().required()
                .messages({
                    "any.required": `score is required`,
                    "number": `score must be a number`
                })
        })
    }

    /**
     * Method: gameDetails
     * Purpose: Joi Validation
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gameDetails = (res) => {
        return Joi.object().keys({
            gameId: Joi.string().required()
                .messages({
                    "any.required": `game id is required`,
                    "string": `game id must be a string`
                }),
        })
    }

    /**
     * Method: gameScore
     * Purpose: Joi Validation
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gameScore = (res) => {
        return Joi.object().keys({
            gameId: Joi.string().required()
                .messages({
                    "any.required": `game id is required`,
                    "string": `game id must be a string`
                }),
            score: Joi.number().required()
                .messages({
                    "any.required": `score is required`,
                    "number": `score must be a number`
                })
        })
    }

}


module.exports.GameRequest = new GameRequest();