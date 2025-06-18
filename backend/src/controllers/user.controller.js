import { asyncHandler } from "../utils/asyncHandler.js";

// Get current logged-in user details
const getCurrentUser = asyncHandler(async (req, res) => {
  // TODO: implement get current user controller
});

// Update user
const updateUserDetails = asyncHandler(async (req, res) => {
  // TODO: implement update user details controller
});

// Update user's avatar
const updateAvatar = asyncHandler(async (req, res) => {
  // TODO: implement update avatar controller
});

// Update user's password
const updatePassword = asyncHandler(async (req, res) => {
  // TODO: implement update password controller
});

// Logout user
const logout = asyncHandler(async (req, res) => {
  // TODO: implement logout controller
});

// Refresh existing tokens
const refreshExistingTokens = asyncHandler(async (req, res) => {
  // TODO: implement refresh existing token controller
});

export {
  getCurrentUser,
  logout,
  refreshExistingTokens,
  updateAvatar,
  updatePassword,
  updateUserDetails,
};
