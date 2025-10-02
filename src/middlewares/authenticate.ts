import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt.config.js";

const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = verifyToken(token);

    if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    (req as any ).user = user;
    next();
};

export default authenticateMiddleware;