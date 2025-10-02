import type { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/auth.services.js";

export const registerController = async (req: Request, res: Response) => {
    try {
        const result = await registerUserService(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({
            error: "Registration failed",
            details: error.message,
        });
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const result = await loginUserService(req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({
            error: "Login failed",
            details: error.message,
        });
    }
}