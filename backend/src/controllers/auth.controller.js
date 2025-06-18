import { User } from "../models/user.model.js";
import { signupService } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Generate JWT tokens handler
const generateAccessAndRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);

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

// Signup user
export const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, password, gender, address } =
    req.body;

  // Create new user
  const createdUser = await signupService(
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    address
  );

  // Return response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully!"));
});

// Login user
export const login = asyncHandler(async (req, res) => {
  // TODO: implement login controller
});

// Forget password
export const forgetPassword = asyncHandler(async (req, res) => {
  // TODO: implement forget password controller
});

// Verify OTP
export const verifyOTP = asyncHandler(async (req, res) => {
  // TODO: implement verify OTP controller
});

// Reset password via OTP
export const resetPassword = asyncHandler(async (req, res) => {
  // TODO: implement reset password controller
});
