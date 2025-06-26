import mongoose from "mongoose";

/**
 * @module models/product
 * Mongoose model for products.
 *
 * Includes:
 * - name: Product name
 * - category: Product type (e.g. lens, frame, assessories, etc)
 * - gender: Product gender
 * - description: Product description (key-value pairs)
 * - variants: Array of product variant IDs
 * - reviewCount: Number of product reviews
 * - avgRating: Average product rating
 * - originalPrice: Product original price
 * - sellingPrice: Product selling price
 * - regularDiscount: Regular discount percentage
 * - images: Array of product image URLs
 * - isFeatured: Flag indicating if the product is featured
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["lens", "frame", "accessories"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
      trim: true,
    },
    description: {
      type: Map,
      of: String,
    },
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductVariant",
      },
    ],
    reviewCount: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    regularDiscount: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String, // Array of Cloudinary URLs
      },
    ],
    // isAvailable: {
    //   type: Boolean,
    //   default: true,
    // },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
