import { Router } from "express";
import { getBooks, addBook, updateBook, getBookById, deleteBook } from "../controllers/books.controllers.js";

const router:Router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export { router };