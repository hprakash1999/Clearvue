import dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/db";

dotenv.config({ path: "./.env" });

const startServer = async () => {
  await connectDB();

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
  app.listen(port, () => {
    console.info(`Server ready at http://localhost:${port}`);
  });
};

startServer().catch((err) => {
  console.error("Server failed to start", err);
});
