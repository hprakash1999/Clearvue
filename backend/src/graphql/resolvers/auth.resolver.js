import { User } from "../../models/user.model.js";
import { loginService, signupService } from "../../services/auth.service.js";
import { generateAccessAndRefreshToken } from "../../services/tokens.service.js";
import { ApiError } from "../../utils/apiError.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/cookieManager.js";
import { GraphQLResponse } from "../../utils/graphQLResponse.js";

import {
  loginValidator,
  signupValidator,
} from "../../validators/auth.validator.js";

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
     * @async
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

        // Set auth cookies
        setAuthCookies(res, { accessToken, refreshToken });

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

        // Handle unexpected errors
        throw err instanceof ApiError
          ? err
          : new ApiError(500, "Internal server error. Please try again.", err);
      }
    },

    /**
     * Login an existed user by:
     * - Validating input via Zod
     * - Generating JWT access & refresh tokens
     * - Setting tokens in HTTP-only cookies
     * - Returning a GraphQLResponse with the user data
     *
     * @async
     * @param {Object} _ - Unused parent arg (root)
     * @param {Object} args - Resolver arguments
     * @param {Object} args.input - Login input payload
     * @param {Object} context - GraphQL context (contains res object)
     * @returns {Promise<GraphQLResponse>}
     * @throws {ApiError} On validation or unexpected errors
     */
    login: async (_, { input }, context) => {
      const { res } = context;

      try {
        // Validate input using Zod schema
        const validatedInput = loginValidator.parse(input);

        // Validate user credentials in DB
        const loggedInUser = await loginService(validatedInput);

        // Generate tokens and save refreshToken on user
        const { accessToken, refreshToken } =
          await generateAccessAndRefreshToken(createdUser._id);

        // Set auth cookies
        setAuthCookies(res, { accessToken, refreshToken });

        // Return a formatted GraphQL response
        return new GraphQLResponse({
          success: true,
          message: "User logged in successfully!",
          user: loggedInUser,
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

        // Handle unexpected errors
        throw err instanceof ApiError
          ? err
          : new ApiError(500, "Internal server error. Please try again.", err);
      }
    },

    /**
     * Logout user by:
     * - Clearing HTTP-only cookies
     * - Clearing refresh token from DB
     *
     * @async
     * @returns {Promise<GraphQLResponse>}
     * @throws {ApiError} On validation or unexpected errors
     */
    logout: async (_, _, context) => {
      const { res, user } = context;

      try {
        // Clear auth cookies
        clearAuthCookies(res);

        // Clear refresh token from DB
        const isLoggedOut = await logoutService(user._id);

        if (!isLoggedOut)
          throw new ApiError(500, "Failed to logout. Please try again.");

        return new GraphQLResponse({
          success: true,
          message: "User logged out successfully!",
        });
      } catch (err) {
        // Handle unexpected errors
        throw err instanceof ApiError
          ? err
          : new ApiError(500, "Internal server error. Please try again.", err);
      }
    },
  },
};
