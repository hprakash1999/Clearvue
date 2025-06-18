import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to cloudinary
export const uploadOnCloudinary = async (localFilePath, folder = "misc") => {
  try {
    if (!localFilePath) throw new Error("File path not provided");

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      folder: `uploads/${folder}`,
    });

    await fs.unlink(localFilePath); // delete local temp file
    return result;
  } catch (err) {
    try {
      await fs.unlink(localFilePath);
    } catch (e) {
      console.error("Failed to delete temp file:", e);
    }
    console.error("Cloudinary upload failed:", err);
    throw err;
  }
};
