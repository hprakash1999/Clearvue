// Repositories
import { userRepo } from "../repositories/user.repository.js";

// Verify token util
import { verifyAccessToken } from "../utils/jwt.util.js";

/**
 * @module middlewares/auth
 * Middleware for user authentication
 *
 * Includes:
 * - attachUserToContext: Attach user to request context
 */

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * Attach user to request context
 *
 * @function attachUserToContext
 * @param {Object} req - Express request object
 * @returns {Promise<Object>} User object
 */
export const attachUserToContext = async (req) => {
  // Get access token from cookie
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) return null;

  // Verify access token
  const { valid, decoded } = verifyAccessToken(
    accessToken,
    ACCESS_TOKEN_SECRET
  );

  if (!valid || !decoded?._id) return null;

  // Find user and sanitize it
  const user = await userRepo.findById(decoded._id);

  return user || null;
};
