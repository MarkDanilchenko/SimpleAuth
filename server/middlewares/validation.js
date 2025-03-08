import { badRequestError } from "../utils/errors.js";

function validateBody(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      badRequestError(res, error.message);
    }
  };
}

export { validateBody };
