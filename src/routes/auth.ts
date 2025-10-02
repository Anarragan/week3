import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controllers.js";
import { validateRegisterMiddleware, validateLoginMiddleware } from "../middlewares/validates.js";

const router: Router = Router();

router.post("/register", validateRegisterMiddleware, registerController);
router.post("/login", validateLoginMiddleware, loginController);

export { router };