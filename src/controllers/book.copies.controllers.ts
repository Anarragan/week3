import type { Request, Response } from "express";
import { getBookCopiesService, getBookCopyByIdService, addBookCopyService, updateBookCopyService, deleteBookCopyService } from "../services/book.copies.js";

export const getBookCopiesController = async (req: Request, res: Response) => {
    const copies = await getBookCopiesService();
    res.json(copies);
};

export const getBookCopyByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const copy = await getBookCopyByIdService(Number(id));
    if (!copy) {
        return res.status(404).json({ message: "Book copy not found" });
    }
    res.json(copy);
};

export const addBookCopyController = async (req: Request, res: Response) => {
    const newCopy = await addBookCopyService(req.body);
    res.status(201).json(newCopy);
};

export const updateBookCopyController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCopy = await updateBookCopyService(Number(id), req.body);
    if (!updatedCopy) {
        return res.status(404).json({ message: "Book copy not found" });
    }
    res.json(updatedCopy);
};

export const deleteBookCopyController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await deleteBookCopyService(Number(id));
    if (!deleted) {
        return res.status(404).json({ message: "Book copy not found" });
    }
    res.status(204).send();
};
