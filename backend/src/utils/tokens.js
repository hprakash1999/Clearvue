import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

export const generateAccessAndRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);

    // Validate user exists
    if (!user) {
      console.error("User not found for token generation.");
      throw new ApiError(404, "User not found for token generation.");
    }

    // Generate tokens
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // skip password validation

    return { accessToken, refreshToken };
  } catch (err) {
    console.error("Failed to generate tokens.", { stack: err.stack });
    throw new ApiError(500, "Failed to generate tokens.");
  }
};
