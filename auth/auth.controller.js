"use strict";
const Constant = require("../config/constant");
const bcrypt = require("bcryptjs");
const { AuthRequest } = require("./auth.request");
const { AuthModel } = require("./auth.model");
const { CommonHelper } = require("../utils/common-helper");
const { JWTHelper } = require("../utils/jwt-helper");
const { SALT_ROUNDS } = require("../config/constant");

class AuthController {

  /**
   * Method: signUp
   * Purpose: sign Up user using user data 
   * @param {*} req
   * @param {*} res
   * @returns
   */
  signUp = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = AuthRequest.signUp(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      value.email = (value.email).toLowerCase();
      value.userName = (value.userName).toLowerCase();
      bcrypt.hash(value.password, SALT_ROUNDS, async (err, hash) => {
        if (err) {
          return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
        } else {
          value.password = hash;
          const response = await AuthModel.signUp(value).catch((err) => {
            switch (err) {
              case "ALREADY_EXISTS":
                return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "This email already exists", []);
              default:
                return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
            }
          });
          if (!response) { return; }
          return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "Successfully created", response);
        }
      })
    } catch (e) {
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
    }
  };



  /**
   * Method: signIn
   * Purpose: sign in user using username and password
   * @param {*} req
   * @param {*} res
   * @returns
   */
  signIn = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = AuthRequest.signIn(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      value.email = (value.email).toLowerCase();

      const response = await AuthModel.signIn(input).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "Invalid Credentials", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
        }
      });

      if (!response) { return; }

      const hashRes = await CommonHelper.hashingComparePassword(value?.password, response?.password);
      if (!hashRes) {
        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'Invalid Credentials', []);
      }

      if (!response) { return; }
      const tokens = JWTHelper.generateToken({
        userId: response.userId
      }, Constant.JWT.TOKEN_LIFE, true);
      response["accessToken"] = tokens.accessToken;
      delete response['password']
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "Record fetch", response);

    } catch (e) {
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "Something went wrong", []);
    }
  };
}

module.exports = new AuthController();