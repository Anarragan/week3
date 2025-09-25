import { Router } from "express";
import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../controllers/users.controllers.js";

const router:Router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router };
