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

        const user = await getUserByIdService(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addUser = async (req: Request, res: Response) => {
    try{
        const { name, last_name, email, password_hash, phone, adress, role } = req.body;

        if (!name || !last_name || !email || !password_hash || !phone || !adress || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = {
            id: (Math.random() * 1000000).toFixed(0),
            name,
            last_name,
            email,
            password_hash,
            phone,
            adress,
            role,
            created_at: new Date(),
        };

        const addedUser = await addUserService(newUser);
        return res.status(201).json(addedUser);

    } catch(err){
        return res.status(500).json({error: "Internal Server Error"});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, last_name, email, password_hash, phone, adress, role } = req.body;

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const updatedFields: Record<string, any> = {};
        if (name !== undefined) updatedFields.name = name;
        if (last_name !== undefined) updatedFields.last_name = last_name;
        if (email !== undefined) updatedFields.email = email;
        if (password_hash !== undefined) updatedFields.password_hash = password_hash;
        if (phone !== undefined) updatedFields.phone = phone;
        if (adress !== undefined) updatedFields.adress = adress;
        if (role !== undefined) updatedFields.role = role;

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error: "At least one field must be provided for update" });
        }

        const updatedUser = await updateUserService(id, updatedFields);

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

        const deleted = await deleteUserService(id);

        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};