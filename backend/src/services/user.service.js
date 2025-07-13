import { userRepo } from "../repositories/user.repository.js";

// Utils
import { uploadSingleImageToCloudinary } from "../utils/cloudinary.util.js";
import { saveGraphQLUploadToTemp } from "../utils/graphqlFile.util.js";

/**
 * @module services/user
 * Service for user-related operations
 *
 * Includes:
 * - updateUserProfileService: Update user data
 * - updateUserAvatarService: Update user avatar
 */

/**
 * Handles user data update by:
 * - Validate the data provided by the user
 * - Update the user document in the database
 *
 * @async
 * @function uodateUserProfileService
 * @param {string} userId - User's id
 * @param {Object} input - Update user profile input
 *
 * @returns {boolean} True, if update is successful. False, otherwise
 */
export const updateUserProfileService = async (userId, input) => {
  // Validate the data provided by the user
  const updateData = {};

  if (input.firstName) updateData.firstName = input.firstName;
  if (input.lastName) updateData.lastName = input.lastName;
  if (input.phone) updateData.phone = input.phone;
  if (input.address) updateData.address = input.address;

  // Update user in DB
  const updatedUser = await userRepo.update(userId, updateData);

  // Check if update was successful
  if (!updatedUser) {
    console.error("Failed to update user profile. User not found.");
    return null;
  }

  return updatedUser;
};

/***
 * Handle update user avatar by:
 *
 */
export const updateUserAvatarService = async (userId, input) => {
  // Get file stream and filename from GraphQL Upload scalar
  const { createReadStream, filename } = await input;

  // Save file stream to temp folder
  const tempFilePath = await saveGraphQLUploadToTemp(createReadStream(), filename);

  // Upload to Cloudinary
  const uploadResult = await uploadSingleImageToCloudinary(tempFilePath, "avatars"); // To "uploads/avatars" folder

  // Save URL to user document
  const updatedUser = await userRepo.update(userId, { avatar: uploadResult.secure_url });

  // Check if update was successful
  if (!updatedUser) {
    console.error("Failed to update user avatar URL in DB.");
    return null;
  }

  return updatedUser;
};
