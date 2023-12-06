"use strict";
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


class CommonHelper {
  

  /**
   * Method: formatJoiError
   * Purpose: Formate array error message to single error string
   * @param {*} error
   * @param {*} LangMsg
   * @response {*} single error string
   */
  formatJoiError = (error, res) => {
    try {
      let errorType = error.details[0]["type"];
      var msg = "";
      switch (errorType) {
        case "object.unknown":
          if (res) {
            msg = msg.trim();
          } else {
            msg = error.details[0]["message"].toString();
            msg = msg.trim();
          }
          break;
        case "any.allowOnly":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "any.empty":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "string.empty":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "any.required":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "object.base":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "number.base":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "string.base":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "string.alphanum":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "string.max":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "string.min":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "string.email":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "boolean.base":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "number.max":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "number.min":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "array.max":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "array.min":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "any.only":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
        case "any.unknown":
          msg = error.details[0]["message"];
          msg = msg.trim();
          break;
        case "date.greater":
          msg = error.details[0]["message"];
          msg = msg.trim();
          break;
        default:
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = msg.trim();
          break;
      }
      return msg;
    } catch (e) {
      return e.message;
    }
  };

  /**
   * Method: sendSuccess
   * Purpose: resonse formate create
   * @param {*} res
   * @param {*} status
   * @param {*} response
   * @response {*} http response
   */
  sendSuccess(res, status, statusCode, message = null, data, total = null) {
    let resData = { success: status, data: data };
    if (total) {
      resData = Object.assign(resData, { total: total });
    }
    if (message) {
      resData = Object.assign(resData, { message: message });
    }
    res.status(statusCode).json(resData);
  }

  /**
   * Method: sendError
   * Purpose: error response formate
   * @param {*} res
   * @param {*} status
   * @param {*} response
   * @response {*} http response
   */
  sendError = (res, status, statusCode, message, data = []) => {
    res.status(statusCode).json({
      success: status,
      message: message,
      data: data,
    });
  };

  /**
   * Method: sendValidationError
   * Purpose: error response formate
   * @param {*} res
   * @param {*} status
   * @param {*} response
   * @response {*} http response
   */
  sendValidationError = (res, status, statusCode, message, data = []) => {
    res.status(statusCode).json({
      statusCode: statusCode,
      success: status,
      message: typeof message === "string" ? message : "",
      data: data,
    });
  };


  
  /**
   * Method: hashingPassword
   * Purpose : hash password
   */
  hashingPassword = async (password) => {
    if (password) {
      const hash = await bcrypt.hashSync(password, Number(Constant.SALT_ROUNDS));
      return hash;
    } else {
      return null;
    }
  };

  /**
   * Method: hashingCompairPassword
   * Purpose : hash compare password
   */
  hashingComparePassword = async (password, hashPassword) => {
    if (password) {
      const hash = bcrypt.compareSync(password, hashPassword);
      return hash;
    } else {
      return null;
    }
  };

  CompareHashText = async (text, hashText) => {
    try {
      let newText = crypto.createHash('md5').update(text).digest('hex');
      return newText == hashText;
    } catch (e) {
      return false;
    }
  }

  /**
   * Method: getHashText
   * Purpose: value convert to md5 string
   * @param {*} base64Text
   * @response {*} md5 string
   */
  getHashText = async (text) => {
    try {
      return crypto.createHash("md5").update(text).digest("hex");
    } catch (e) {
      return "";
    }
  };

}

module.exports.CommonHelper = new CommonHelper();
