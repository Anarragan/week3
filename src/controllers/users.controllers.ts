import type { Request, Response } from "express";
import { getUsersService, getUserByIdService, addUserService, deleteUserService, updateUserService } from "../services/users.service.js";

export const getUsers = async (req: Request, res: Response) => {
    try{
        const users = await getUsersService();
        res.status(200).json(users);

    } catch(err){
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const user = await getUserByIdService(Number(id));
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const addedUser = await addUserService(req.body);
    return res.status(201).json(addedUser);
  } catch (err: any) {
    console.error("Error in addUser:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedUser = await updateUserService(Number(id), req.body);

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const deleted = await deleteUserService(Number(id));

        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};