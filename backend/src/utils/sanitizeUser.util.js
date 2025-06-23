/**
 * @module utils/sanitizeUser
 * Sanitize user data before sending to client
 *
 * @function sanitizeUser
 * @param {Object} userDoc - User document
 * @returns {Object} Sanitized user data
 */
export const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject();

  // Remove sensitive fields
  delete user.password;
  delete user.refreshToken;
  delete user.otp;

  return user;
};
