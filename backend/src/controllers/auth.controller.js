import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Generate JWT tokens handler
const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);

    // Validate user exists
    if (!user) {
      console.error("User not found for token generation.");
      throw new ApiError(404, "User not found for token generation.");
    }

    // Generate tokens
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // skip password validation

    return { accessToken, refreshToken };
  } catch (err) {
    console.error("Failed to generate tokens.", { stack: err.stack });
    throw new ApiError(500, "Failed to generate tokens.");
  }
};

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
};

// Sign up user
const signup = asyncHandler(async (req, res) => {
  // TODO: implement signup controller
});

// Login user
const login = asyncHandler(async (req, res) => {
  // TODO: implement login controller
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // TODO: implement get current user controller
});

// Logout user
const logout = asyncHandler(async (req, res) => {
  // TODO: implement logout controller
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

// Forget password
const forgetPassword = asyncHandler(async (req, res) => {
  // TODO: implement forget password controller
});

// Verify OTP
const verifyOTP = asyncHandler(async (req, res) => {
  // TODO: implement verify OTP controller
});

// Reset password via OTP
const resetPassword = asyncHandler(async (req, res) => {
  // TODO: implement reset password controller
});

// Refresh existing tokens
const refreshExistingTokens = asyncHandler(async (req, res) => {
  // TODO: implement refresh existing token controller
});

export {
  forgetPassword,
  getCurrentUser,
  login,
  logout,
  refreshExistingTokens,
  resetPassword,
  signup,
  updateAvatar,
  updatePassword,
  updateUserDetails,
  verifyOTP,
};
