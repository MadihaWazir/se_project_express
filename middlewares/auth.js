const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const { ERROR_MESSAGES } = require("../utils/errors");
const { UnauthorizedError } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED_ERROR.message)
    );
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(
      new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED_ERROR.message)
    );
  }
  req.user = payload;
  return next();
};

module.exports = auth;
