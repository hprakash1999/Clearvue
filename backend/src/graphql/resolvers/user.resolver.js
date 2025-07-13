import { GraphQLUpload } from "graphql-upload-ts";

// Validators
import { updateUserProfileValidator } from "../../validators/user.validator.js";

// Utils
import { ApiError } from "../../utils/apiError.util.js";

// Services
import { updateUserAvatarService, updateUserProfileService } from "../../services/user.service.js";

/**
 * @module graphql/resolvers/user
 * Resolver map for user-related GraphQL operations.
 *
 * Currently includes:
 * - Mutation.avatar: Upload existed user's avatar.
 */
export const userResolver = {
  Upload: GraphQLUpload,

  Mutation: {
    /**
     * Upload existed user's avatar by:
     * - Getting file stream and filename from GraphQL Upload scalar
     * - Saving file stream to temp folder
     * - Uploading to Cloudinary inside "uploads/avatars" folder
     * - Saving Cloudinary secure_url to user document in DB
     *
     * @async
     * @param {object} _parent - Parent object (not used in this resolver)
     * @param {object} args.input - GraphQL Upload scalar
     * @param {object} context - GraphQL context object
     * @returns {object} - Response object
     */
    avatar: async (_parent, { input }, context) => {
      const { user } = context;
      if (!user) {
        console.error("Avatar upload error: User not found in context.");
        throw new ApiError(401, "Unauthorized request. Please log in.");
      }

      try {
        const updatedUser = await updateUserAvatarService(user._id, input);

        if (!updatedUser) {
          console.error("Avatar upload failed: failed to update user avatar in DB.");
          throw new ApiError(404, "Avatar upload failed. Please try again.");
        }

        return {
          success: true,
          message: "Avatar uploaded successfully!",
        };
      } catch (err) {
        console.error("Avatar upload failed. ERR: ", err);
        throw new ApiError(500, "Avatar upload failed. Please try again.");
      }
    },

    /**
     * Update user profile by:
     * - Checking if user exists
     * - Validating input using Zod schema
     * - Only updating fields that are provided
     * - Updating user document in DB
     *
     * @async
     * @param {object} _parent - Parent object (not used in this resolver)
     * @param {object} args.input - Update user profile input
     * @param {object} context - GraphQL context object
     * @returns {object} - Response object
     */
    updateUserProfile: async (_parent, { input }, context) => {
      const { user } = context;

      if (!user) {
        console.error("Update user profile error: User not found in context.");
        throw new ApiError(401, "Unauthorized request. Please log in.");
      }

      try {
        // Validate input using zod
        const validatedInput = updateUserProfileValidator.parse(input);

        // Ensure at least one field was sent
        if (!validatedInput || Object.keys(validatedInput).length === 0) {
          console.error("Update user profile failed: No data provided for update.");
          throw new ApiError(400, "No profile fields provided for update.");
        }

        // Update user
        const updatedUser = await updateUserProfileService(user._id, validatedInput);

        if (!updatedUser) {
          console.error("Update user profile failed: User not updated in db.");
          throw new ApiError(500, "Profile update failed. Please try again.");
        }

        return {
          success: true,
          message: "Profile updated successfully!",
        };
      } catch (err) {
        // Handle zod validation error
        if (err.name === "ZodError") {
          console.error("Update user profile validation error. ERR: ", err);

          throw new ApiError(400, "Invalid profile data. Please review your input.", err.errors);
        }

        // Handle unexpected error
        console.error("Failed to update user profile. ERR: ", err);

        throw err instanceof ApiError
          ? err
          : new ApiError(500, "Profile update failed. Please try again.", err);
      }
    },
  },
};
