import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    size: {
      type: String,
      enum: ["small", "medium", "large", "extra-large"],
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    material: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
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
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
