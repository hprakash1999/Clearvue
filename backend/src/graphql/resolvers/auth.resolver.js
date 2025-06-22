import { User } from "../../models/user.model.js";
import { signupService } from "../../services/auth.service.js";
import { ApiError } from "../../utils/ApiError.js";
import { GraphQLResponse } from "../../utils/GraphQLResponse.js";
import { generateAccessAndRefreshToken } from "../../utils/tokens.js";
import { signupValidator } from "../../validators/auth.validator.js";

/**
 * @module graphql/resolvers/auth.resolver
 * Resolver map for auth-related GraphQL operations.
 *
 * Currently includes:
 * - Mutation.signup: Handles new user registration
 */
export const authResolvers = {
  Mutation: {
    /**
     * Signup a new user by:
     * - Validating input via Zod
     * - Creating a user via the signup service
     * - Generating JWT access & refresh tokens
     * - Setting tokens in HTTP-only cookies
     * - Returning a GraphQLResponse with the user data
     *
     * @param {Object} _ - Unused parent arg (root)
     * @param {Object} args - Resolver arguments
     * @param {Object} args.input - Signup input payload
     * @param {Object} context - GraphQL context (contains res object)
     * @returns {Promise<GraphQLResponse>}
     * @throws {ApiError} On validation or unexpected errors
     */
    signup: async (_, { input }, context) => {
      const { res } = context;

      try {
        // Validate input using Zod schema
        const validatedInput = signupValidator.parse(input);

        // Create the user in DB
        const createdUser = await signupService(validatedInput);

        // Generate tokens and save refreshToken on user
        const { accessToken, refreshToken } =
          await generateAccessAndRefreshToken(createdUser._id);

        // Fetch sanitized user (without password & tokens)
        const sanitizedUser = await User.findById(createdUser._id).select(
          "-password -refreshToken"
        );

        // Set access token as HTTP-only cookie
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });

        // Set refresh token as HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });

        // Return a formatted GraphQL response
        return new GraphQLResponse({
          success: true,
          message: "User registered successfully!",
          user: sanitizedUser,
        });
      } catch (err) {
        // Handle Zod validation errors
        if (err.name === "ZodError") {
          console.error("Signup validation error. ERR: ", err);
          throw new ApiError(
            400,
            "Signup validation error. Please check your request data.",
            err.errors
          );
        }

        // Re-throw known API errors
        if (err instanceof ApiError) {
          throw err;
        }

        // Handle unexpected errors
        console.error("Signup error. ERR: ", err);
        throw new ApiError(500, "Internal server error. Please try again.");
      }
    },
  },
};
