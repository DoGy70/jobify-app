import { Router } from "express";
const router = Router();

import { login, logout, register } from "../controllers/authController.js";
import { validateRegisterUser } from "../middleware/validationMiddleware.js";

router.post("/register", validateRegisterUser, register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
