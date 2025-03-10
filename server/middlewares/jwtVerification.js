import jwt from "jsonwebtoken";
import { expressOptions } from "../env.js";
import { unauthorizedError } from "../utils/errors.js";

function jwtVerify(req, res, next) {
  const accessToken = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  if (!accessToken) {
    return unauthorizedError(res);
  }

  jwt.verify(accessToken, expressOptions.jwtSecret, (err) => {
    if (err) {
      return unauthorizedError(res);
    }

    next();
  });
}

export { jwtVerify };
