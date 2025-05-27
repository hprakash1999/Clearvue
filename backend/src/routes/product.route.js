import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/checkRole.middleware.js";

// Import controllers
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Public routes
router.route("/").get(getAllProducts);

router.route("/:productID").get(getProductDetails);

// Protected routes
router.route("/").post(verifyJwt, isAdmin, addProduct);

router
  .route("/:productID")
  .patch(verifyJwt, isAdmin, updateProduct)
  .delete(verifyJwt, isAdmin, deleteProduct);

export default router;
