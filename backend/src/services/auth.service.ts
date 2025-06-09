import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

// Signup service
export const signupService = async (
  firstName,
  lastName,
  email,
  phone,
  password,
  gender,
  address
) => {
  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

  if (existingUser) {
    console.error("User already exists with this email or phone.");
    throw new ApiError(409, "User already exists with this email or phone.");
  }

  // Create a new user
  const user = new User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    address,
  });

  if (!user) {
    console.error("Failed to create user.");
    throw new ApiError(500, "Failed to create user.");
  }

  // Remove sensitive fields from the response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    console.error("Failed to retrieve created user.");
    throw new ApiError(500, "Failed to retrieve created user!");
  }

  console.log("User created successfully:", createdUser);

  return user;
};
