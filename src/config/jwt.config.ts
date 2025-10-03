import jwt, { type SignOptions } from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH = process.env.JWT_REFRESH as string;

export interface UserPayload {
    id?: string;
    email: string;
    role: string;
}

export const generateToken = (user: UserPayload, expiresIn: SignOptions['expiresIn'] = '15m'): string | null => {
    try {
        return jwt.sign(user, JWT_SECRET as string, { expiresIn });
    } catch (error) {
        console.error('Error generating token:', error);
        return null;
    }
}

export const generateRefreshToken = (user: UserPayload, expiresIn: SignOptions['expiresIn'] = '7d'): string | null => {
    try {
        return jwt.sign(user, JWT_REFRESH as string, { expiresIn });
    } catch (error) {
        console.error('Error generating refresh token:', error);
        return null;
    }
}

export const verifyToken = (token: string): UserPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET as string) as UserPayload;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}

export const verifyRefreshToken = (token: string): UserPayload | null => {
    try {
        return jwt.verify(token, JWT_REFRESH as string) as UserPayload;
    } catch (error) {
        console.error('Error verifying refresh token:', error);
        return null;
    }
}