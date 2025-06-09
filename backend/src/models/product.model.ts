import mongoose, { Document, Model, Schema } from "mongoose";

// Product interface
export interface IProduct extends Document {
  name: string;
  type: string;
  size: "small" | "medium" | "large" | "extra-large";
  color: string;
  material: string;
  gender: "male" | "female" | "unisex";
  description: string;
  variants: mongoose.Types.ObjectId[];
  reviewCount: number;
  avgRating: number;
  originalPrice: number;
  sellingPrice: number;
  regularDiscount: number;
  images: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Product schema
const productSchema = new Schema<IProduct>(
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
        type: String, // Cloudinary URLs
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

export const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);
