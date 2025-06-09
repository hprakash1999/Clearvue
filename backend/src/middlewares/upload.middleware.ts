import { NextFunction, Request, Response } from "express";
import fs from "fs";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Ensure temp folder exists
const tempPath = path.resolve("./public/temp");
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
}

// Helper to format date
const formatDate = (): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return new Date().toLocaleDateString("en-GB", options).replace(/\s/g, "-");
};

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${formatDate()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

// File filter with typing
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only images (jpeg, jpg, png) are allowed."));
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

// Create multer upload instance
const upload = multer({ storage, fileFilter, limits });

// Middleware for single image upload
export const uploadSingleImage = upload.single("image");

// Middleware for multiple images upload (up to 5)
export const uploadMultipleImages = upload.array("images", 5);

// Wrapper to catch multer errors and send response
export const handleUploadErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Other errors
    return res.status(400).json({ message: err.message });
  }
  next();
};
