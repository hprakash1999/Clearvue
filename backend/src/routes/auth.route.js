import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";

// Import controllers
import {
  forgetPassword,
  getCurrentUser,
  login,
  logout,
  refreshExistingTokens,
  resetPassword,
  signup,
  updateAvatar,
  updatePassword,
  updateUserDetails,
  verifyOTP,
} from "../controllers/auth.controller.js";

const router = Router();

// Public routes
router.route("/").post(login).get(getCurrentUser);

router.route("/signup").post(signup);

router.route("/verify-otp").post(verifyOTP);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password").patch(resetPassword);

// Protected routes
router.route("/").patch(verifyJwt, updateUserDetails);

router.route("/avatar").patch(verifyJwt, updateAvatar);
router.route("/tokens").post(verifyJwt, refreshExistingTokens);
router.route("/logout").post(verifyJwt, logout);

router.route("/update-password").patch(verifyJwt, updatePassword);

export default router;
