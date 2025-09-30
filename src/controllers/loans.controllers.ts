import type { Request, Response } from "express";
import { getLoansService, getLoanByIdService, addLoanService, updateLoanService, deleteLoanService } from "../services/loans.service.js";

export const getLoans = async (req: Request, res: Response) => {
    try {
        const loans = await getLoansService();
        return res.status(200).json(loans);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getLoanById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const loan = await getLoanByIdService(Number(id));

        if (!loan) {
            return res.status(404).json({ error: "Loan not found" });
        }

        return res.status(200).json(loan);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addLoan = async (req: Request, res: Response) => {
    try {
        const addedLoan = await addLoanService(req.body);
        return res.status(201).json(addedLoan);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateLoan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedLoan = await updateLoanService(Number(id), req.body);

        if (!updatedLoan) {
            return res.status(404).json({ error: "Loan not found" });
        }

        return res.status(200).json(updatedLoan);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteLoan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await deleteLoanService(Number(id));

        if (!deleted) {
            return res.status(404).json({ error: "Loan not found" });
        }

        return res.status(200).json({ message: "Loan deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};