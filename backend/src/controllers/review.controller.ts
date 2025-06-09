import { asyncHandler } from "../utils/asyncHandler.js";

// Add review to product by ID
const addProductReview = asyncHandler(async (req, res) => {
  // TODO: implement add review controller
});

// Get all reviews with paginations
const getAllReviewsByProductID = asyncHandler(async (req, res) => {
  // TODO: implement get reviews controller
});

// Get single review details by ID
const getReviewDetails = asyncHandler(async (req, res) => {
  // TODO: implement get single review details controller
});

// delete review by ID
const deleteProductReview = asyncHandler(async (req, res) => {
  // TODO: implement delete review controller
});

export {
  addProductReview,
  deleteProductReview,
  getAllReviewsByProductID,
  getReviewDetails,
};
