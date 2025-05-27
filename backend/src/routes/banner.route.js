import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/checkRole.middleware.js";

// Import controllers
import {
  addBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
} from "../controllers/banner.controller.js";

const router = Router();

// Protected routes
router
  .route("/")
  .get(verifyJwt, isAdmin, getAllBanners)
  .post(verifyJwt, isAdmin, addBanner);

router
  .route("/:bannerID")
  .patch(verifyJwt, isAdmin, updateBanner)
  .delete(verifyJwt, isAdmin, deleteBanner);

export default router;
