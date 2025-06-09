import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    req.validated = schema.parse(req.body);
    next();
  } catch (err) {
    console.error("Validation error. ERROR: ", err);
    throw new ApiError(
      400,
      "Validation error. Please check your request data."
    );
  }
};
