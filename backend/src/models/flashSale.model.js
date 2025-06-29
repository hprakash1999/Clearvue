import mongoose from "mongoose";

/**
 * @module models/flashSale
 * Mongoose model for flash sales.
 *
 * Includes:
 * - products: Array of product IDs
 * - flashDiscount: Flash sale discount percentage
 * - startDate: Flash sale start date
 * - endDate: Flash sale end date
 * - isActive: Flag indicating if the flash sale is active
 */
const flashSaleSchema = new mongoose.Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    flashDiscount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const FlashSale = mongoose.model("FlashSale", flashSaleSchema);
