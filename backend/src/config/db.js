import mongoose from "mongoose";

// Establish MongoDB connection
export const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI and database name
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `MongoDB connected successfully! Host: ${connection.connection.host}`
    );
  } catch (err) {
    console.error(`MongoDB connection failed. ERROR: ${err.message}`, {
      stack: err.stack,
    });
    process.exit(1); // Exit with failure code
  }
};
