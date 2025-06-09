import { ApiError } from "../utils/ApiError";

export function requireAdmin(context: { user?: { role?: string } }) {
  if (!context.user) {
    throw new ApiError(401, "Authentication required");
  }

  if (context.user.role !== "admin") {
    throw new ApiError(403, "You are not authorized to perform this action.");
  }

  return context.user;
}
