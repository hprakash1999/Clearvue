import { userRepo } from "../repositories/user.repository.js";
import { ApiError } from "../utils/apiError.util.js";

/**
 * @module services/tokens
 * Generates access and refresh tokens for a given user ID.
 *
 * @async
 * @function generateAccessAndRefreshToken
 * @param {string} id - The ID of the user to generate tokens for.
 * @returns {Promise<Object>} An object containing the generated access and refresh tokens.
 * @throws {ApiError} If the user is not found.
 */

// Generate tokens handler
export const generateTokens = async (user) => {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  return { accessToken, refreshToken };
};

// Generate access and refresh tokens and save refresh token on user
export const generateAccessAndRefreshToken = async (id) => {
  // Validate user exists
  const user = await userRepo.findById(id);

  if (!user) throw new ApiError(404, "User not found. Please try again.");

  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(user);

  // Save refresh token on user
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
