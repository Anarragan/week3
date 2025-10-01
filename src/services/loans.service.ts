import { Loan, type ILoanAdd } from "../models/loans.js";

export const getLoansService = async (): Promise<Loan[]> => {
    return await Loan.findAll();
}

export const getLoanByIdService = async (id: number): Promise<Loan | null> => {
    return await Loan.findByPk(id);
}

export const addLoanService = async (loanData: ILoanAdd): Promise<Loan> => {
    const loanDate = loanData.loan_date ? new Date(loanData.loan_date) : new Date();
    const returnDate = new Date(loanDate);
    returnDate.setDate(loanDate.getDate() + 14);

    const loan = await Loan.create({
        ...loanData,
        loan_date: loanDate,
        return_date: returnDate,
    });
    return loan;
}

export const updateLoanService = async (id: number, updatedData: Partial<ILoanAdd>): Promise<Loan | null> => {
    const loan = await Loan.findByPk(id);
    if (!loan) {
        return null;
    }
    await loan.update(updatedData);
    return loan;
}

export const deleteLoanService = async (id: number): Promise<boolean> => {
    const loan = await Loan.findByPk(id);
    if (!loan) {
        return false;
    }
    await loan.destroy();
    return true;
}