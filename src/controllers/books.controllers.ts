import type { Request, Response } from "express";
import { getBooksService, 
    getBookByIdService, 
    addBookService, 
    deleteBookService, 
    updateBookService } from "../services/books.service.js";

export const getBooks = async (req: Request, res: Response) => {
   try{
        const books = await getBooksService();
        res.status(200).json(books);
   } catch(err){
       res.status(500).json({error: "Internal Server Error"});
   }
};

export const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Book ID is required" });
        }

        const book = await getBookByIdService(Number(id));

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addBook = async (req: Request, res: Response) => {
    try {
        const newBook = req.body;
        const createdBook = await addBookService(newBook);
        return res.status(201).json(createdBook);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteBook = async (req: Request, res: Response ) => {
    try {
        const { id } = req.params;

        if (!id){
            return res.status(400).json({ error: "Book ID is required" });
        }
        const deleted = await deleteBookService(Number(id));

        if (!deleted) {
            return res.status(404).json({ error: "Book not found" });
        }
        
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await updateBookService(Number(id), req.body);

        if (!result) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}