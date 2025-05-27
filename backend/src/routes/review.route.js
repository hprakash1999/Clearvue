import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";

// Import controllers
import {
  addProductReview,
  deleteProductReview,
  getAllReviewsByProductID,
  getReviewDetails,
} from "../controllers/review.controller.js";

const router = Router();

// Public routes
router.route("/:productID").get(getAllReviewsByProductID);

router.route("/:reviewID").get(getReviewDetails);

// Protected routes
router.route("/:productID").post(verifyJwt, addProductReview);
router.route("/:reviewID").delete(verifyJwt, deleteProductReview);

export default router;
