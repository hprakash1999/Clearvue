import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * @module utils/graphqlFile
 *
 * Utility functions for handling GraphQL file uploads
 *
 * Includes:
 * - saveGraphQLUploadToTemp: Save a single GraphQL Upload stream to a local temp file
 * - saveMultipleGraphQLUploadsToTemp: Save multiple GraphQL Upload streams to local temp files
 */

// Save GraphQL Upload stream to local temp file
export const saveGraphQLUploadToTemp = async (stream, filename) => {
  const tempFilePath = path.join("./public/temp", `${uuidv4()}-${filename}`); // Unique filename

  const out = await fs.open(tempFilePath, "w");
  stream.pipe(out.createWriteStream());

  return new Promise((resolve, reject) => {
    stream.on("end", () => resolve(tempFilePath));
    stream.on("error", reject);
  });
};

// Save multiple GraphQL Upload streams to local temp files
export const saveMultipleGraphQLUploadsToTemp = async (uploads) => {
  const tempFilePaths = [];

  for (const upload of uploads) {
    const { createReadStream, filename } = await upload;

    const tempFilePath = await saveGraphQLUploadToTemp(
      createReadStream(),
      filename
    );
    tempFilePaths.push(tempFilePath);
  }

  return tempFilePaths;
};
