import { z } from "zod";

/**
 * @module validators/auth
 * Zod validators for validating auth-related inputs:
 *
 * Includes:
 * - signupValidator: Signup input validation
 * - loginValidator: Login input validation
 */

// Signup validator
export const signupValidator = z.object({
  firstName: z.string().min(1, "First name is required").trim().toLowerCase(),

  lastName: z.string().min(1, "Last name is required").trim().toLowerCase(),

  email: z.string().email("Invalid email").trim().toLowerCase(),

  phone: z
    .string()
    .length(10, "Phone must be exactly 10 digits")
    .regex(/^\d+$/, "Phone must contain only digits")
    .trim(),

  password: z.string().min(8, "Password must be at least 8 characters long"),

  gender: z.enum(["male", "female", "other"]),

  address: z.object({
    street: z.string().min(1, "Street is required").trim(),

    city: z.string().min(1, "City is required").trim(),

    state: z.string().min(1, "State is required").trim(),

    country: z.string().min(1, "Country is required").trim(),

    pincode: z
      .string()
      .min(4, "Pincode too short")
      .max(8, "Pincode too long")
      .regex(/^\d+$/, "Pincode must be digits only")
      .trim(),
  }),
});
