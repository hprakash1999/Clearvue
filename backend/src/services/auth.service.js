import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

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
