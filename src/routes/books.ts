import { Router } from "express";
import { getBooks, addBook, updateBook, getBookById, deleteBook } from "../controllers/books.controllers.js";
import { validateBookMiddleware } from "../middlewares/validates.js";
import authenticateMiddleware from "../middlewares/authenticate.js";
import loggerMiddleware from "../middlewares/logger.js";
const router:Router = Router();

router.use(loggerMiddleware);

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validateBookMiddleware, addBook);
router.put('/:id', validateBookMiddleware, updateBook);
router.delete('/:id', deleteBook);

export { router };