const jwt = require("jsonwebtoken");
const constant = require("../config/constant");

class JWTHelper {
    /**
     * Method: generateToken
     * Purpose: generate access token and refresh token
     * @param {*} userDT
     * @response {*} object
     */
    generateToken(payload, expireTime, isRefreshToken = false) {
        try {
            if (!payload) { return new Error("payload not define"); }
            const accessToken = jwt.sign(payload, constant.JWT.SECRET, { expiresIn: Number(expireTime) });
            return { accessToken: accessToken };

        } catch (e) {
            throw e;
        }
    }


    /**
     * Method: verify
     * Purpose: verify access token
     * @param {*} accessToken
     * @response {*} object
     */
    verify(accessToken) {
        try {
            return new Promise((resolve, reject) => {
                if (!accessToken) { return reject("NO_TOKEN_FOUND"); }
                jwt.verify(accessToken, constant.JWT.SECRET, (err, decoded) => {
                    if (err) { reject(err); }
                    resolve(decoded);
                });
            });
        } catch (e) {
            throw e;
        }
    }


    /**
     * Method: tokenVerify
     * Purpose: verify token and return payload
     * @param {*} token
     * @response {*} object
     */
    tokenVerify(token) {
        try {
            return new Promise((resolve, reject) => {
                if (!token) { return reject("NO_TOKEN_FOUND"); }
                // verifies secret and checks exp
                jwt.verify(token, constant.JWT.SECRET, (err, decoded) => {
                    if (err) { return reject(err); }
                    return resolve(decoded);
                });
            });
        } catch (e) {
            throw e;
        }
    }


    /**
     * Method: getJWTPayload
     * Purpose: decode jwt token
     * @param {*} jwtToken
     * @response {*} object
     */
    getJWTPayload(jwtToken) {
        try {
            let decodedJwt = jwt.decode(jwtToken, { complete: true });
            return decodedJwt && decodedJwt.payload ? decodedJwt.payload : null;
        } catch (error) {
            return null;
        }
    }
}
module.exports.JWTHelper = new JWTHelper();
