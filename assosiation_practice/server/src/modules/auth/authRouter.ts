import { Router } from "express";
import { authController } from "../../container";
import { validate } from "../../middlewares/validate";
import { registerSchema, loginSchema } from "./authValidation";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;