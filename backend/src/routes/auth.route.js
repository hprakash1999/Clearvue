import { Router } from "express";

// Import controllers
import {
  forgetPassword,
  login,
  resetPassword,
  signup,
  verifyOTP,
} from "../controllers/auth.controller.js";

const router = Router();

// Public routes
router.route("/").post(login);
router.route("/signup").post(signup);

router.route("/verify").post(verifyOTP);
router.route("/password").post(forgetPassword).put(resetPassword);

export default router;
