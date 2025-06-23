/**
 * @module utils/cookieManager
 * Set and clear auth cookies
 *
 * @param {Object} res
 * @param {Object} options
 * @param {string} options.accessToken
 * @param {string} options.refreshToken
 *
 * @returns {void}
 */

// Set auth cookies
export const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });
};

// Clear auth cookies
export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });
};
