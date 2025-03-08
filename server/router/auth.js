import express from "express";
import { authController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validation.js";
import { jwtVerify } from "../middlewares/jwtVerification.js";
import { signUpSchema, signInSchema, profileSchema } from "../utils/validationSchemas/auth.js";

const router = express.Router();

router.post("/signup", validateBody(signUpSchema), authController.signUp);
router.get("/signin", validateBody(signInSchema), authController.signIn);
router.get("/profile", jwtVerify, validateBody(profileSchema), authController.profile);

export default router;
