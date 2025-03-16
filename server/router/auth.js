import express from "express";
import { authController } from "../controllers/auth.js";
import { validateRequestBody } from "../middlewares/requestValidation.js";
import { jwtVerify } from "../middlewares/jwtVerification.js";
import { signUpSchema, signInSchema, profileSchema } from "../utils/validationSchemas/auth.js";

const router = express.Router();

router.post("/signup", validateRequestBody(signUpSchema), authController.signUp);
router.get("/signin", validateRequestBody(signInSchema), authController.signIn);
router.get("/profile", jwtVerify, validateRequestBody(profileSchema), authController.profile);

export default router;
