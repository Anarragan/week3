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
        const newBook = {
            id: (Math.random() * 1000000).toFixed(0),
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genere: req.body.genere,
            language: req.body.language,
            cover_url: req.body.cover_url,
            description: req.body.description,
            owner_id: req.body.owner_id,
            created_at: new Date().toISOString(),
            book_copies: req.body.book_copies ?? 1
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
            return res.status(400).json({ error: "Book ID is required" });
        }
        
        const updatedFields: Record<string, any> = {};
        if (title !== undefined) updatedFields.title = title;
        if (author !== undefined) updatedFields.author = author;
        if (isbn !== undefined) updatedFields.isbn = isbn;
        if (genere !== undefined) updatedFields.genere = genere;
        if (language !== undefined) updatedFields.language = language;
        if (cover_url !== undefined) updatedFields.cover_url = cover_url;
        if (description !== undefined) updatedFields.description = description;
        if (owner_id !== undefined) updatedFields.owner_id = owner_id;
        if (book_copies !== undefined) updatedFields.book_copies = book_copies;

        const result = await updateBookService(id, updatedFields);

        if (!result) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}