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

        const book = await getBookByIdService(id);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addBook = async (req: Request, res: Response) => {
    try{
        const { title, author, isbn, genere, language, cover_url, description, owner_id, book_copies } = req.body;

        if (!title || !author || !isbn || !genere || !language || !cover_url || !description || !owner_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newBook = {
            id: (Math.random() * 1000000).toFixed(0),
            title,
            author,
            isbn,
            genere,
            language,
            cover_url,
            description,
            owner_id,
            created_at: new Date().toISOString(),
            book_copies: book_copies ?? 1
        };

        const addedBook = await addBookService(newBook);
        res.status(201).json(addedBook);
    }catch(err){
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const deleteBook = async (req: Request, res: Response ) => {
    try {
        const { id } = req.params;

        if (!id){
            return res.status(400).json({ error: "Book ID is required" });
        }
        const deleted = await deleteBookService(id);

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
        const { title, author, isbn, genere, language, cover_url, description, owner_id, book_copies } = req.body;

        if (!id) {
            return res.status(400).json({ 
                error: "Book ID is required" 
            });
        }

        const updatedBook = {
            id,
            title,
            author,
            isbn,
            genere,
            language,
            cover_url,
            description,
            owner_id,
            created_at: new Date().toISOString(),
            book_copies: book_copies ?? 1
        };

        const result = await updateBookService(id, updatedBook);
        if (!result) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}