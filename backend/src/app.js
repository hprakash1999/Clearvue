import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { setupGraphQL } from "./graphql/server.js";

const app = express();

// Configure CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Configure express
app.use(express.json({ limit: "16kb" })); // accept json
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// GraphQL
await setupGraphQL(app);

export { app };
