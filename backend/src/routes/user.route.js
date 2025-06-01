import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";

// Import controllers
import {
  getCurrentUser,
  logout,
  refreshExistingTokens,
  updateAvatar,
  updatePassword,
  updateUserDetails,
} from "../controllers/user.controller.js";

const router = Router();

// Protected routes
router
  .route("/:id")
  .put(verifyJwt, updateUserDetails)
  .post(verifyJwt, getCurrentUser);

router.route("/:id/avatar").put(verifyJwt, updateAvatar);
router.route("/:id/password").put(verifyJwt, updatePassword);
router.route("/:id/tokens").put(verifyJwt, refreshExistingTokens);
router.route("/:id/logout").post(verifyJwt, logout);

export default router;
