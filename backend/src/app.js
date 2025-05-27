import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

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

// Import routes
import authRouter from "./routes/auth.route.js";
import bannerRouter from "./routes/banner.route.js";
import flashSaleRouter from "./routes/flashSale.route.js";
import productRouter from "./routes/product.route.js";
import productVariantRouter from "./routes/productVariant.route.js";
import reviewRouter from "./routes/review.route.js";

// Route declarations
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/productVariant", productVariantRouter);
app.use("/api/v1/banner", bannerRouter);
app.use("/api/v1/flash-sale", flashSaleRouter);
app.use("/api/v1/review", reviewRouter);

export { app };
