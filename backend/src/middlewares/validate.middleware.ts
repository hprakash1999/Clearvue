import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      validated?: any;
    }
  }
}

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate req.body according to schema
      req.validated = schema.parse(req.body);
      next();
    } catch (err) {
      console.error("Validation error. ERROR: ", err);

      return next(
        new ApiError(400, "Validation error. Please check your request data.")
      );
    }
  };
