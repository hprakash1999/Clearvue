import mongoose from "mongoose";

/**
 * @module models/banner
 * Mongoose model for application banners.
 *
 * Includes:
 * - headline: Banner headline
 * - image: Banner image URL
 * - description: Banner description
 * - ctaText: Call to Action text
 * - ctaLink: Call to Action link
 * - type: Banner type (e.g festive, seasonal, etc.)
 * - priorityOrder: Priority order for display (1-7)
 * - isActive: Flag indicating if the banner is active
 */

const bannerSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
    description: {
      type: String,
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
      enum: ["festival", "seasonal", "product"],
    },
    priorityOrder: {
      type: Number,
      min: 1,
      max: 7,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Banner = mongoose.model("Banner", bannerSchema);
