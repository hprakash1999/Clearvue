import { userRepo } from "../repositories/user.repository.js";
import { ApiError } from "../utils/apiError.util.js";

/**
 * @module services/tokens
 * Generates access and refresh tokens for a given user id.
 *
 * @async
 * @function generateAccessAndRefreshToken
 * @param {string} id - The id of the user to generate tokens for.
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
  // Find user by id
  const user = await userRepo.findByID(id);

  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(user);

  // Save refresh token on user
  const updatedUser = await userRepo.update(
    id,
    { refreshToken },
    { validateBeforeSave: false, new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return { accessToken, refreshToken };
};
