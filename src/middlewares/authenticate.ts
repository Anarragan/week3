import type { Request, Response, NextFunction } from "express";

const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (token !== '12345') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
};

export default authenticateMiddleware;