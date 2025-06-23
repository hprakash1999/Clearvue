import jwt from "jsonwebtoken";

/**
 * @module utils/jwt
 * JWT utility function for user authentication
 *
 * @function verifyAccessToken
 * @param {string} accessToken - JWT access token
 * @param {string} accessTokenSecret - JWT access token secret
 * @returns {Object} Object containing validity and decoded payload
 * @throws {Error} If JWT verification fails
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
