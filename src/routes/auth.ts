import { Router } from "express";
import { registerController, loginController, refreshTokenController, logoutController } from "../controllers/auth.controllers.js";
import { validateRegisterMiddleware, validateLoginMiddleware } from "../middlewares/validates.js";

const router: Router = Router();

router.post("/register", validateRegisterMiddleware, registerController);
router.post("/login", validateLoginMiddleware, loginController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutController);

export { router };