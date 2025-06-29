// Utils
import { ApiError } from "../../utils/apiError.util.js";
import { GraphQLResponse } from "../../utils/graphQLResponse.util.js";
import { sanitizeUser } from "../../utils/sanitizeUser.util.js";

// Cookie manager
import { clearAuthCookies, setAuthCookies } from "../../utils/cookieManager.util.js";

// Validators
import { loginValidator, signupValidator } from "../../validators/auth.validator.js";

// Services
import { loginService, logoutService, signupService } from "../../services/auth.service.js";
import { generateAccessAndRefreshToken } from "../../services/tokens.service.js";

/**
 * @module graphql/resolvers/auth
 * Resolver map for auth-related GraphQL operations.
 *
 * Includes:
 * - Mutation.signup: Handles new user registration
 * - Mutation.login: Handles user login
 * - Mutation.logout: Handles user logout
 */
export const authResolvers = {
  Mutation: {
    /**
     * Signup a new user by:
     * - Validating input via Zod
     * - Creating a user via the signup service
     * - Generating JWT access & refresh tokens
     * - Setting tokens in HTTP-only cookies
     *
     * @async
     * @param {Object} _parent - Unused parent arg (root)
     * @param {Object} args.input - Signup input payload
     * @param {Object} context - GraphQL context (contains res object)
     * @returns {Promise<GraphQLResponse>}
     * @throws {ApiError} On validation or unexpected errors
     */
    signup: async (_parent, { input }, context) => {
      const { res } = context;

      try {
        // Validate input using Zod schema
        const validatedInput = signupValidator.parse(input);

        // Create the user in DB
        const createdUser = await signupService(validatedInput);

        // Generate tokens and save refreshToken on user
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(createdUser._id);

        // Sanitize user data
        const sanitizedUser = sanitizeUser(createdUser);

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
            err.errors,
          );
        }

        // Handle unexpected errors
        console.error("Signup unexpected error. ERR: ", err);

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
     *
     * @async
     * @param {Object} _parent - Unused parent arg (root)
     * @param {Object} args.input - Login input payload
     * @param {Object} context - GraphQL context (contains res object)
     * @returns {Promise<GraphQLResponse>}
     * @throws {ApiError} On validation or unexpected errors
     */
    login: async (_parent, { input }, context) => {
      const { res } = context;

      try {
        // Validate input using Zod schema
        const validatedInput = loginValidator.parse(input);

        // Validate user credentials in DB
        const loggedInUser = await loginService(validatedInput);

        // Generate tokens and save refreshToken on user
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(loggedInUser._id);

        // Set auth cookies
        setAuthCookies(res, { accessToken, refreshToken });

        // Sanitize user data
        const sanitizedUser = sanitizeUser(loggedInUser);

        // Return a formatted GraphQL response
        return new GraphQLResponse({
          success: true,
          message: "User logged in successfully!",
          user: sanitizedUser,
        });
      } catch (err) {
        // Handle Zod validation errors
        if (err.name === "ZodError") {
          console.error("Login validation error. ERR: ", err);

          throw new ApiError(
            400,
            "Login validation error. Please check your credentials.",
            err.errors,
          );
        }

        // Handle unexpected errors
        console.error("Login unexpected error. ERR: ", err);

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
     * @param {Object} context - GraphQL context (contains res object)
     * @returns {Promise<GraphQLResponse>}
     * @throws {ApiError} On validation or unexpected errors
     */
    logout: async (_parent, _args, context) => {
      const { res, user } = context;

      try {
        if (!user) {
          console.error("Logout error: User not found in context.");
          throw new ApiError(401, "Unauthorized request. Please log in.");
        }

        // Clear auth cookies
        clearAuthCookies(res);

        // Clear refresh token from DB
        const isLoggedOut = await logoutService(user._id);

        return new GraphQLResponse({
          success: isLoggedOut,
          message: "User logged out successfully!",
        });
      } catch (err) {
        console.error("Logout unexpected error. ERR: ", err);
        // Handle unexpected errors
        throw err instanceof ApiError
          ? err
          : new ApiError(500, "Internal server error. Please try again.", err);
      }
    },
  },
};
