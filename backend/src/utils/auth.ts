import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

// Function to get user from token
export const getUserFromToken = async (token?: string) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as { _id: string };
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );
    return user;
  } catch (error) {
    console.warn("Invalid or expired token");
    return null;
  }
};

// Function to authenticate user from context
export const requireAuth = async (context: { user: any }) => {
  if (!context.user) {
    throw new Error("Authentication required");
  }
  return context.user;
};
