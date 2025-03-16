import { badRequestError } from "../utils/errors.js";
import { z } from "zod";

function validateRequestBody(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequestError(res, error.issues[0]);
      }

      badRequestError(res, error.message);
    }
  };
}

export { validateRequestBody };
