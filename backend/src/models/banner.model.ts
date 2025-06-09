import mongoose, { Document, Model, Schema } from "mongoose";

// Banner interface
export interface IBanner extends Document {
  headline: string;
  image: string; // Cloudinary URL
  description: string;
  ctaText: string;
  ctaLink: string;
  type: string;
  priorityOrder: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Banner schema
const bannerSchema = new Schema<IBanner>(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ctaText: {
      type: String,
      required: true,
    },
    ctaLink: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    priorityOrder: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Banner: Model<IBanner> = mongoose.model<IBanner>(
  "Banner",
  bannerSchema
);
