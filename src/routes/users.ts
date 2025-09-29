import { Router } from "express";
import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../controllers/users.controllers.js";
import { validateUserMiddleware } from "../middlewares/validates.js";

const router:Router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateUserMiddleware, addUser);
router.put("/:id", validateUserMiddleware, updateUser);
router.delete("/:id", deleteUser);

export { router };