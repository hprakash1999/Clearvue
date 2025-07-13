import { z } from "zod";

/**
 * @module validators/auth
 * Zod validators for validating auth-related inputs:
 *
 * Includes:
 * - updateUserProfileValidator: Update user profile input validation
 */

// Update user profile validator
export const updateUserProfileValidator = z.object({
  firstName: z.string().min(1).trim().toLowerCase().optional(),
  lastName: z.string().min(1).trim().toLowerCase().optional(),
  phone: z
    .string()
    .length(10, "Phone must be exactly 10 digits")
    .regex(/^\d+$/, "Phone must contain only digits")
    .trim()
    .optional(),
  avatar: z.string().url().optional(),

  address: z
    .object({
      street: z.string().min(1).trim().optional(),
      city: z.string().min(1).trim().optional(),
      state: z.string().min(1).trim().optional(),
      country: z.string().min(1).trim().optional(),
      pincode: z
        .string()
        .min(4)
        .max(8)
        .regex(/^\d+$/, "Pincode must be digits only")
        .trim()
        .optional(),
    })
    .optional(),
});
