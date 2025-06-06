const ERROR_MESSAGES = {
  BAD_REQUEST: {
    status: 400,
    message: "Bad Request",
  },

  NOT_FOUND: {
    status: 404,
    message: "Not Found",
  },

  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
  },

  UNAUTHORIZED_ERROR: {
    status: 401,
    message: "Unauthorized",
  },

  FORBIDDEN_ERROR: {
    status: 403,
    message: "Forbidden",
  },

  CONFLICT_ERROR: {
    status: 409,
    message: "Conflict",
  },
};

module.exports = { ERROR_MESSAGES };
