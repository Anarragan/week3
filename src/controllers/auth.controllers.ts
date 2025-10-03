import type { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/auth.services.js";
import { verifyRefreshToken, generateToken } from "../config/jwt.config.js";

export const registerController = async (req: Request, res: Response) => {
    try {
        const {user, token, refreshToken} = await registerUserService(req.body);

        res.cookie("refreshToken", refreshToken, { 
            httpOnly: true, 
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000  
        });
        res.status(201).json({ user, token });
    } catch (error: any) {
        res.status(400).json({
            error: "Registration failed",
            details: error.message,
        });
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const { user, token, refreshToken } = await loginUserService(req.body);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ user, token });
    } catch (error: any) {
        res.status(400).json({
            error: "Login failed",
            details: error.message,
        });
    }
}

export const refreshTokenController = (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ error: "No refresh token provided" });
    }

    const payload = verifyRefreshToken(token);
    if (!payload) {
        return res.status(403).json({ error: "Invalid refresh token" });
    }

    const newToken = generateToken(payload, '15m');
    if (!newToken) {
        return res.status(500).json({ error: "Could not generate new token" });
    }

    res.status(200).json({ token: newToken });
}

export const logoutController = (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
}