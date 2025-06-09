import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new banner
const addBanner = asyncHandler(async (req, res) => {
  // TODO: implement add banner controller
});

// Get all banners
const getAllBanners = asyncHandler(async (req, res) => {
  // TODO: implement get all banners controller
});

// Update a banner by ID
const updateBanner = asyncHandler(async (req, res) => {
  // TODO: implement update banner controller
});

// Delete a banner by ID
const deleteBanner = asyncHandler(async (req, res) => {
  // TODO: implement delete banner controller
});

export { addBanner, deleteBanner, getAllBanners, updateBanner };
