import type { Request, Response, NextFunction } from "express";

export const validateBookMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { title, author, isbn, genere, language, cover_url, description, owner_id, book_copies } = req.body;
    const { id } = req.params;
    const { method } = req;

    if (method === 'POST') {
        if (!title || !author || !isbn || !genere || !language || !cover_url || !description || !owner_id) {
            return res.status(400).json({ message: 'All fields are required for creating a book' });
        }
        if (
            typeof title !== 'string' || 
            typeof author !== 'string' || 
            typeof isbn !== 'string' || 
            typeof genere !== 'string' || 
            typeof language !== 'string' || 
            typeof cover_url !== 'string' || 
            typeof description !== 'string' || 
            typeof owner_id !== 'string'
        ) {
            return res.status(400).json({ message: 'Invalid field types' });
        }

        if (book_copies !== undefined && typeof book_copies !== 'number') {
            return res.status(400).json({ message: 'book_copies must be a number if provided' });
        }
    }

    if (method === 'PUT') {
        if (!id) {
            return res.status(400).json({ message: 'Book ID is required for update' });
        }

        const fields = { title, author, isbn, genere, language, cover_url, description, owner_id, book_copies };
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) {
                if (
                    (['title', 'author', 'isbn', 'genere', 'language', 'cover_url', 'description', 'owner_id'].includes(key) && typeof value !== 'string') ||
                    (key === 'book_copies' && typeof value !== 'number')
                ) {
                    return res.status(400).json({ message: `Invalid type for field ${key}` });
                }
            }
        }
    }

    next();
};

export const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { name, last_name, email, password_hash, phone, adress, role } = req.body;
    
    if (!name || !last_name || !email || !password_hash || !phone || !adress || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (typeof name !== 'string' || 
        typeof last_name !== 'string' || 
        typeof email !== 'string' || 
        typeof password_hash !== 'string' || 
        typeof phone !== 'string' || 
        typeof adress !== 'string' || 
        typeof role !== 'string') {
            return res.status(400).json({ error: "Invalid field types" });
        }

    if (role !== 'admin' && role !== 'user') {
        return res.status(400).json({ error: "Invalid role" });
    }

    next();
};