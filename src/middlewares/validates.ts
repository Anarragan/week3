import type { Request, Response, NextFunction } from "express";
import zod from "zod";

export const validateBookMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const bookSchema = zod.object({
        title: zod.string().nonempty(),
        author: zod.string().nonempty(),
        isbn: zod.string().nonempty(),
        genere: zod.string().nonempty(),
        language: zod.string().nonempty(),
        cover_url: zod.string().url().optional(),
        description: zod.string().max(500).optional(),
        user_id: zod.number().min(1),
        book_copies: zod.number().min(1).optional()
    });

    try {
        if (req.method === "POST") {
            req.body = bookSchema.parse(req.body);
        } else if (req.method === "PUT") {
            req.body = bookSchema.partial().parse(req.body);
        }
        next();
  } catch (error: any) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.errors,
    });
  }
};

export const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userSchema = zod.object({
        name: zod.string().nonempty(),
        last_name: zod.string().nonempty(),
        email: zod.string().email(),
        password_hash: zod.string().min(6),
        phone: zod.string().nonempty(),
        adress: zod.string().nonempty(),
        role: zod.enum(["admin", "user"]),
    });

    try {
        if (req.method === "POST") {
            req.body = userSchema.parse(req.body);
        } else if (req.method === "PUT") {
            req.body = userSchema.partial().parse(req.body);
        }
        next();
  } catch (error: any) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.errors,
    });
  }
};

export const validateLoanMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { book_id, user_id, loan_date, return_date, status } = req.body;

    const loanSchema = zod.object({
        book_id: zod.string().nonempty(),
        user_id: zod.string().nonempty(),
        loan_date: zod.string().nonempty(),
        return_date: zod.string().nonempty(),
        status: zod.enum(['ongoing', 'returned', 'overdue'])
    });

    const parseResult = loanSchema.safeParse({ book_id, user_id, loan_date, return_date, status });
    next();
}