const Constant = require("../config/constant");
const { CommonHelper } = require("../utils/common-helper");
const { JWTHelper } = require("../utils/jwt-helper");

authorize = (req, res, next) => {
  try {
    /**
     * Authenticate user using Jwt token auth mechanism
     */
    const accessToken = req.headers["authorization"]
      ? req.headers["authorization"]
      : req.headers["authorization"]
        ? req.headers["authorization"]
        : "";
    req.headers["authorization"] = accessToken;
    if (!accessToken) {
      return CommonHelper.sendError(
        res,
        false,
        Constant.STATUS_CODE.HTTP_401_UNAUTHORIZED,
        "VALIDATION.AUTH_TOKEN_REQUIRED",
        [],
      );
    } else {
      JWTHelper.verify(accessToken)
        .then((decode) => {
          req.user = decode;
          console.log("decode",decode);
          return next();
        })
        .catch((err) => {
          switch (err.name) {
            case "TokenExpiredError":
              return CommonHelper.sendError(
                res,
                false,
                Constant.STATUS_CODE.HTTP_401_UNAUTHORIZED,
                "Token Expired",
                [],
              );
            default:
              return CommonHelper.sendError(
                res,
                false,
                Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR,
                "Invalid Token",
                [],
              );
          }
        });
    }
  } catch (e) {
    console.log("middleware exception catch ===>>>", e);
    return CommonHelper.sendError(
      res,
      false,
      Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR,
      "Invalid Token",
      [],
    );
  }
};

module.exports = {
  authorize
};