import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { ApiError } from "./apiError.util.js";

/**
 * @module utils/cloudinary
 *
 * Utility functions for uploading images to Cloudinary
 *
 * Includes:
 * - uploadSingleImageToCloudinary: Upload a single image to Cloudinary
 * - uploadMultipleImagesToCloudinary: Upload multiple images to Cloudinary
 */

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Single Image to Cloudinary
export const uploadSingleImageToCloudinary = async (
  localFilePath,
  folder = "misc"
) => {
  if (!localFilePath) throw new ApiError(400, "Missing local file path");

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: `uploads/${folder}`, // Cloudinary folder (e.g uploads/avatars)
    });

    await fs.unlink(localFilePath); // Delete temp file after upload
    return result;
  } catch (err) {
    await safeDelete(localFilePath);
    console.error("Cloudinary Upload Error. ERR: ", err);
    throw new ApiError(500, "Failed to upload image. Please try again.");
  }
};

// Upload Multiple Images to Cloudinary
export const uploadMultipleImagesToCloudinary = async (
  localFilePaths = [],
  folder = "misc"
) => {
  try {
    const uploadResults = [];

    for (const filePath of localFilePaths) {
      const result = await uploadSingleImageToCloudinary(filePath, folder);
      uploadResults.push(result);
    }

    return uploadResults;
  } catch (err) {
    console.error("Cloudinary multi upload error. ERR: ", err);
    throw new ApiError(500, "Failed to upload images. Please try again.");
  }
};

// Safe Temp File Delete Helper
const safeDelete = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error("Failed to delete temp file. ERR: ", err);
  }
};
