import express from "express";
import authController from "../controllers/auth";
import { validateBody } from "../middlewares/validation";
import { jwtVerify } from "../middlewares/jwtVerification";
import { signUpSchema, signInSchema, profileSchema } from "../utils/validationSchemas/auth";

const router = express.Router();

router.post("/signup", validateBody(signUpSchema), authController.signUp);
router.get("/signin", validateBody(signInSchema), authController.signIn);
router.get("/profile", jwtVerify, validateBody(profileSchema), authController.profile);

export default router;
