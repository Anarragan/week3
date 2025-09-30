import {Router} from "express";
import { getLoans, getLoanById, addLoan, updateLoan, deleteLoan } from "../controllers/loans.controllers.js";
import { validateLoanMiddleware } from "../middlewares/validates.js";

const router: Router = Router();

router.get("/", getLoans);
router.get("/:id", getLoanById);
router.post("/", validateLoanMiddleware, addLoan);
router.patch("/:id", validateLoanMiddleware, updateLoan);
router.delete("/:id", deleteLoan);

export { router };