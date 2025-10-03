import bcrypt from 'bcrypt';
import { User } from '../models/users.js';
import type { IRegisterDTO, ILoginDTO } from '../interfaces/auth.DTO.js';
import { generateToken, generateRefreshToken } from "../config/jwt.config.js";

export const registerUserService = async (userData: IRegisterDTO) => {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) throw new Error("Email already in use");

    const password_hash = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
        ...userData,
        password_hash,
        role: "user"
    });

    const payload = { id: String(newUser.id), email: newUser.email, role: newUser.role };
    const token = generateToken(payload, '15m');
    const refreshToken = generateRefreshToken(payload, '7d');

    return { user: newUser, token, refreshToken };
}

export const loginUserService = async (userData: ILoginDTO) => {
    const user = await User.findOne({ where: { email: userData.email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(userData.password, user.password_hash);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = { id: String(user.id), email: user.email, role: user.role };
    const token = generateToken(payload, '15m');
    const refreshToken = generateRefreshToken(payload, '7d');
    return { user, token, refreshToken };
}