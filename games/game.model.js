const Constant = require("../config/constant");
const { gameModel } = require("../collections/index");


class GameService {


    /**
     * Method: gamePlay
     * Purpose: insert the details of my game play
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gamePlay = async (request) => {
        return new Promise(async (resolve, reject) => {
            try {
                const createUser = await gameModel.create(request);
                if (createUser) {
                    resolve(createUser);
                } else {
                    reject('Invalid Request');
                }
            } catch (e) {
                reject(e)
            }
        });
    }

    /**
     * Method: gameDetails
     * Purpose: get the details of my game play by game id
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gameDetails = async (request) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = { _id: request.gameId, isDeleted: false };
                const gameDetails = await gameModel.findOne(query);
                if (gameDetails) {
                    resolve(gameDetails);
                } else {
                    reject('Invalid Game Id');
                }
            } catch (e) {
                reject(e)
            }
        });
    }

    /**
     * Method: gameScore
     * Purpose: update my score
     * @param {*} req
     * @param {*} res
     * @returns
     */
    gameScore = async (request) => {
        return new Promise(async (resolve, reject) => {
            try {
                const gameScore = await gameModel.findOneAndUpdate(
                    { _id: request.gameId },
                    { $set: { score: request.score } },
                    { new: true }
                );
                if (gameScore) {
                    resolve(gameScore);
                } else {
                    reject('Invalid Game Id');
                }
            } catch (e) {
                reject(e)
            }
        });
    }

    /**
     * Method: resetStats
     * Purpose: to reset user's game data
     * @param {*} req
     * @param {*} res
     * @returns
     */
    resetStats = async (request) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = { userId: request.userId, isDeleted: false };
                const gameDetails = await gameModel.findOne(query);
                if (gameDetails) {
                    const resetGame = await gameModel.deleteMany(query)
                    resolve(resetGame)
                }
                else {
                    reject("No Data Found")
                }
            } catch (e) {
                reject(e)
            }
        });
    }


}

module.exports = new GameService();