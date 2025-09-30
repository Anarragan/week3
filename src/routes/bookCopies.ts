import { Router } from "express";
import { getBookCopiesController, getBookCopyByIdController, addBookCopyController, updateBookCopyController, deleteBookCopyController } from "../controllers/book.copies.controllers.js";
import { validateBookCopyMiddleware } from "../middlewares/validates.js";

const router:Router = Router();

router.get('/', getBookCopiesController);
router.get('/:id', getBookCopyByIdController);
router.post('/', validateBookCopyMiddleware, addBookCopyController);
router.patch('/:id', validateBookCopyMiddleware, updateBookCopyController);
router.delete('/:id', deleteBookCopyController);

export { router };