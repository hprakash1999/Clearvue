import mongoose from "mongoose";

/**
 * @module models/review
 * Mongoose model for product reviews.
 *
 * Includes:
 * - user: User id
 * - product: Product id
 * - rating: Review rating
 * - comment: Review comment
 * - isFeatured: Flag indicating if the review is featured
 */
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
