"use strict";
const { SqlQueryBuilder } = require("../utils/sql-query-builder");

class AuthModel {

  /**
   * Method: signUp
   * Purpose: Sign Up User
   * @param {*} params
   * @returns
   */
  signUp = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(input.userName));
        newParams.push(SqlQueryBuilder.SqlParameter(input.email));
        newParams.push(SqlQueryBuilder.SqlParameter(input.password));
        const dbRes = await SqlQueryBuilder.Execute(`CALL user_signUp(?,?,?)`, newParams);
        if (dbRes && dbRes[0] && dbRes[0][0] && dbRes[0][0]['dbError']) {
          reject(dbRes[0][0]['dbError'])
        } else if (dbRes && dbRes[0] && dbRes[0][0]) {
          resolve(dbRes[0][0]);
        } else {
          reject('INVALID_REUQEST')
        }
      } catch (e) {
        reject(e)
      }
    });
  };




  /**
   * Method: signIn
   * Purpose: sign in user using username and password
   * @param {*} params
   * @returns
   */
  signIn = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter(input.email));
        const dbRes = await SqlQueryBuilder.Execute(`CALL user_signIn(?)`, newParams);
        if (dbRes && dbRes[0] && dbRes[0][0] && dbRes[0][0]['dbError']) {
          reject(dbRes[0][0]['dbError'])
        } else if (dbRes && dbRes[0] && dbRes[0][0]) {
          resolve(dbRes[0][0]);
        } else {
          reject('INVALID_REUQEST')
        }
      } catch (e) {
        reject(e)
      }
    });
  };


}

module.exports.AuthModel = new AuthModel();