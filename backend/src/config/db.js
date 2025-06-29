import mongoose from "mongoose";

/**
 * Establish MongoDB database connection.
 *
 * Environment variables:
 * - MONGODB_URI: Base connection string
 * - DB_NAME: Name of the database
 *
 * Logs connection info or exits the process on failure.
 *
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI and database name
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);

    console.log(`MongoDB connected successfully! Host: ${connection.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection failed. ERROR: ${err.message}`, {
      stack: err.stack,
    });
    process.exit(1); // Exit with failure code
  }
};
