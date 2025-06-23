import { userRepo } from "../repositories/user.repository.js";
import { ApiError } from "../utils/apiError.util.js";

/**
 * @module services/auth
 * Service for auth-related operations
 *
 * Includes:
 * - signupService: Create a new user after checking for duplicates
 * - loginService: Authenticate a user and return tokens
 */

/**
 * Handles user signup by:
 * - Checking if user already exists via email or phone
 * - Creating a new user if not found
 *
 * @async
 * @function signupService
 * @param {Object} userData - New user's data
 * @param {string} userData.firstName
 * @param {string} userData.lastName
 * @param {string} userData.email
 * @param {string} userData.phone
 * @param {string} userData.password
 * @param {string} userData.gender
 * @param {Object} userData.address
 *
 * @returns {Promise<Object>} Created user document
 * @throws {ApiError} If user exists or creation fails
 */
export const signupService = async (userData) => {
  const { email, phone } = userData;

  // Check if user already exists
  const existingUser = await userRepo.findByEmailOrPhone(email, phone);

  if (existingUser) {
    throw new ApiError(409, "User already exists with this email or phone.");
  }

  // Create new user
  const user = await userRepo.insert(userData);

  if (!user) {
    throw new ApiError(500, "Failed to create user. Please try again.");
  }

  return user;
};

/**
 * Handles user login by:
 * - Authenticating user via email
 * - Generating access & refresh tokens
 * - Saving refresh token on user
 *
 * @async
 * @function loginService
 * @param {Object} loginData - User's login credentials
 * @param {string} userData.email
 * @param {string} userData.password
 *
 * @returns {Promise<Object>} User document
 * @throws {ApiError} If authentication fails
 */
export const loginService = async (loginData) => {
  const { email, password } = loginData;

  // Find user by email
  const user = await userRepo.findByEmail(email);

  if (!user) {
    throw new ApiError(
      404,
      "User not found. Please check your email and try again."
    );
  }

  // Check password
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      401,
      "Incorrect email or password. Please check and try again."
    );
  }

  return user;
};

/**
 * Handles user logout by:
 * - Clearing refresh token from user
 *
 * @async
 * @function logoutService
 * @param {string} userID - User's ID
 *
 * @returns {Promise<boolean>} True, if logout is successful
 * @throws {ApiError} If user not found for logout
 */
export const logoutService = async (userID) => {
  // Find user in DB
  const user = await userRepo.findById(userID);

  if (!user) throw new ApiError(404, "User not found for logout");

  // Clear refresh token
  user.refreshToken = null;

  await user.save({ validateBeforeSave: false });

  return true;
};
