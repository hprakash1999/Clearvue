import { User } from "../../models/user.model.js";
import { signupService } from "../../services/auth.service.js";
import { ApiError } from "../../utils/ApiError.js";
import { GraphQLResponse } from "../../utils/GraphQLResponse.js";
import { generateAccessAndRefreshToken } from "../../utils/tokens.js";
import { signupValidator } from "../../validators/auth.validator.js";

export const authResolvers = {
  Mutation: {
    signup: async (_, { input }, context) => {
      const { res } = context;

      try {
        // Validate input using Zod
        const validatedInput = signupValidator.parse(input);

        // Create user
        const createdUser = await signupService(validatedInput);

        // Generate tokens
        const { accessToken, refreshToken } =
          await generateAccessAndRefreshToken(createdUser._id);

        // Fetch sanitized user
        const sanitizedUser = await User.findById(createdUser._id).select(
          "-password -refreshToken"
        );

        // Set cookies
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });

        // Return response
        return new GraphQLResponse({
          success: true,
          message: "User registered successfully!",
          user: sanitizedUser,
        });
      } catch (err) {
        // Zod validation error
        if (err.name === "ZodError") {
          console.error("Signup validation error. ERR: ", err);
          throw new ApiError(
            400,
            "Signup validation error. Please check your request data. ERR: ",
            err.errors
          );
        }

        // Custom error
        if (err instanceof ApiError) {
          throw err;
        }

        console.error("Signup error. ERR: ", err);
        throw new ApiError(500, "Internal server error. Please try again.");
      }
    },
  },
};
