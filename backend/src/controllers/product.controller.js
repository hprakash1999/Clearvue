import { asyncHandler } from "../utils/asyncHandler.js";

// Add new product
const addProduct = asyncHandler(async (req, res) => {
  // TODO: implement add product controller
});

// Get all products with paginations and filters
const getAllProducts = asyncHandler(async (req, res) => {
  // TODO: implement get products controller
});

// Get single product details by ID
const getProductDetails = asyncHandler(async (req, res) => {
  // TODO: implement get single product details controller
});

// Update product by ID
const updateProduct = asyncHandler(async (req, res) => {
  // TODO: implement update product controller
});

// Delete product by ID
const deleteProduct = asyncHandler(async (req, res) => {
  // TODO: implement delete product controller
});

export {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
};
