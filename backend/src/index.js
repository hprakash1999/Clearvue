import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

/**
 * @module index
 * Entry point of the application.
 *
 * - Loads environment variables from `.env`
 * - Connects to the MongoDB database
 * - Starts the Express server if DB connection is successful
 */

// Load environment variables
dotenv.config({ path: "./.env" });

// Connect DB with server
connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start due to database connection issue", {
      stack: err.stack,
    });
  });
