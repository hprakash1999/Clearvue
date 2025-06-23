import jwt from "jsonwebtoken";

/**
 * @module utils/jwt
 * JWT utility functions for user authentication
 *
 * @function verifyAccessToken
 * @function signToken
 */

/**
 * Verify a JWT access token
 *
 * @function verifyAccessToken
 * @returns {Object} { valid: true, decoded } | { valid: false, error }
 * @throws {Object} { valid: false, error }
 */
export const verifyAccessToken = (accessToken, accessTokenSecret) => {
  try {
    // Verify jwt access token
    const decoded = jwt.verify(accessToken, accessTokenSecret);

    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, error: err };
  }
};

/**
 * Signs a payload into a JWT token
 *
 * @function signToken
 * @returns {Object} { success: true, token }
 * @throws {Object} { success: false, error }
 */
export const signToken = (payload, secret, options = {}) => {
  try {
    // Sign jwt
    const token = jwt.sign(payload, secret, options);

    return { success: true, token };
  } catch (err) {
    return { success: false, error: err };
  }
};
