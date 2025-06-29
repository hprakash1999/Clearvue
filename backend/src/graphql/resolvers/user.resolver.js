import { GraphQLUpload } from "graphql-upload";
import { userRepo } from "../../repositories/user.repo.js";
import { ApiError } from "../../utils/apiError.util.js";
import { uploadSingleImageToCloudinary } from "../../utils/cloudinary.util.js";
import { saveGraphQLUploadToTemp } from "../../utils/graphqlFile.util.js";

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

      try {
        if (!user) {
          console.error("Avatar upload error: User not found in context.");
          throw new ApiError(401, "Unauthorized request. Please log in.");
        }

        // Get file stream and filename from GraphQL Upload scalar
        const { createReadStream, filename } = await input;

        // Save file stream to temp folder
        const tempFilePath = await saveGraphQLUploadToTemp(
          createReadStream(),
          filename
        );

        // Upload to Cloudinary
        const uploadResult = await uploadSingleImageToCloudinary(
          tempFilePath,
          "avatars"
        ); // To "uploads/avatars" folder

        // Save URL  to user document
        await userRepo.update(
          user._id,
          { avatar: uploadResult.secure_url },
          { new: true }
        );

        return {
          success: true,
          message: "Avatar uploaded successfully!",
        };
      } catch (err) {
        console.error("Avatar upload failed. ERR: ", err);
        throw new ApiError(500, "Avatar upload failed. Please try again.");
      }
    },
  },
};
