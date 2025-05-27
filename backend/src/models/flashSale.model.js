import mongoose from "mongoose";

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
  { timestamps: true }
);

export const FlashSale = mongoose.model("FlashSale", flashSaleSchema);
