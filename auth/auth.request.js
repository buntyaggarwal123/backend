const Joi = require("joi");

class AuthRequest {
    /**
     * Method: studentSignUp
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    signUp = (res) => {
        return Joi.object().keys({
            userName: Joi.string().trim().required()
                .messages({
                    "any.required": `user name is required`,
                    "string": `user name must be a string`
                }),
            email: Joi.string().email().trim().required().max(150)
                .messages({
                    "any.required": `Email is required`,
                    "string.email": `Email must be a valid email`,
                    "string.max": `Email length must be less than or equal to 150`,
                }),
            password: Joi.string().required()
                .messages({
                    "any.required": `Password is required`,
                    "string": `Password must be a string`
                })
        })
    }



    /**
     * Method: signIn
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    signIn = (res) => {
        return Joi.object().keys({
            email: Joi.string().email().trim().required().max(150)
                .messages({
                    "any.required": `Email is required`,
                    "string.email": `Email must be a valid email`,
                    "string.max": `Email length must be less than or equal to 150 `,
                }),
            password: Joi.string().required()
                .messages({
                    "any.required": `Password is required`
                })
        });
    };


}


module.exports.AuthRequest = new AuthRequest();