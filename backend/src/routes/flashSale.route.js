import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/checkRole.middleware.js";

// Import controllers
import {
  addFlashSale,
  deleteFlashSale,
  getAllFlashSales,
  updateFlashSale,
} from "../controllers/flashSale.controller.js";

const router = Router();

// Protected routes
router
  .route("/")
  .get(verifyJwt, isAdmin, getAllFlashSales)
  .post(verifyJwt, isAdmin, addFlashSale);

router
  .route("/:flashSaleID")
  .patch(verifyJwt, isAdmin, updateFlashSale)
  .delete(verifyJwt, isAdmin, deleteFlashSale);

export default router;
