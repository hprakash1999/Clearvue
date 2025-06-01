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

export { forgetPassword, login, resetPassword, signup, verifyOTP };
