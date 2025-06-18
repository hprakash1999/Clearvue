import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Middleware to verify JWT
export const verifyJwt = asyncHandler(async (req, res, next) => {
  // Get token from cookies or authorization header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.error("Unauthorized request! No token provided.");
    throw new ApiError(401, "Unauthorized request! No token provided.");
  }

  // Verify and decode token
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // Find user by decoded token ID
  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    console.error("User not found! Invalid access token.");
    throw new ApiError(404, "User not found! Invalid access token.");
  }

  // Attach user info to request
  req.user = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  // console.log("User from JWT Middleware:", req.user);

  next();
});
