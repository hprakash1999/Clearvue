import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

// Signup service
export const signupService = async (userData) => {
  const { email, phone } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

  if (existingUser) {
    throw new ApiError(409, "User already exists with this email or phone.");
  }

  // Create new user
  const user = await User.create(userData);

  if (!user) {
    throw new ApiError(500, "Failed to create user.");
  }

  return user;
};
