import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";

// Schema validations
import { signupSchema } from "../schemas/auth.schema.js";

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
router.route("/signup").post(validate(signupSchema), signup);

router.route("/verify").post(verifyOTP);
router.route("/password").post(forgetPassword).put(resetPassword);

export default router;
