// Core imports
import express from "express";

// Middlewares
import cookieParser from "cookie-parser";
import cors from "cors";

// GraphQL server
import { setupGraphQL } from "./graphql/server.js";

/**
 * @module app
 * Sets up and exports the configured Express application.
 *
 * Middleware:
 * - CORS (with credentials and origin from environment)
 * - JSON and URL-encoded payload parsing (16kb limit)
 * - Static file serving from /public
 * - Cookie parsing
 *
 * Also initializes the GraphQL server.
 */

const app = express();

// Configure CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Configure express middlewares
app.use(express.json({ limit: "16kb" })); // accept json
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// GraphQL
await setupGraphQL(app);

export { app };
