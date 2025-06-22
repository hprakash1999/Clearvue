import mongoose from "mongoose";

/**
 * @module models/productVariant
 * Mongoose model for product variants.
 *
 * Includes:
 * - name: Variant name
 * - attribute: Variant attribute
 * - variants: Array of variant values
 * - products: Array of product IDs
 */
const productVariantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    attribute: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    variants: [
      {
        type: String,
        required: true,
        lowercase: true,
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const ProductVariant = mongoose.model(
  "ProductVariant",
  productVariantSchema
);
