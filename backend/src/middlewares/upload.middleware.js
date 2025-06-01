import fs from "fs";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Ensure temp folder exists
const tempPath = "./public/temp";
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
}

// Helper to format date
const formatDate = () => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date().toLocaleDateString("en-GB", options).replace(/\s/g, "-");
};

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}-${formatDate()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only images (jpeg, jpg, png) are allowed."));
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

export const upload = multer({ storage, fileFilter, limits });
