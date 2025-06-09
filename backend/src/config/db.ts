import mongoose, { ConnectOptions } from "mongoose";

// Establish MongoDB connection
export const connectDB = async (): Promise<void> => {
  try {
    // Connect to MongoDB using the URI and database name
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    console.info(
      `MongoDB connected successfully! Host: ${connection.connection.host}`
    );
  } catch (err) {
    // Log error and exit process if connection fails
    if (err instanceof Error) {
      console.error(`MongoDB connection failed. ERROR: ${err.message}`, {
        stack: err.stack,
      });
    } else {
      console.error("MongoDB connection failed with unknown error", err);
    }

    process.exit(1); // Exit with failure code
  }
};
