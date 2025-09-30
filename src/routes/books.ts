import { Router } from "express";
import { getBooks, addBook, updateBook, getBookById, deleteBook } from "../controllers/books.controllers.js";
import { validateBookMiddleware } from "../middlewares/validates.js";

const router:Router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validateBookMiddleware, addBook);
router.patch('/:id', validateBookMiddleware, updateBook);
router.delete('/:id', deleteBook);

export { router };