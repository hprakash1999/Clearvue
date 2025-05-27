import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

// Middleware to check if user is admin
export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "You are not authorized to perform this action.");
  }

  next();
});
