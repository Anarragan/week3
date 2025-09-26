import type { ILoan } from "../interfaces/loan.js";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const loansFilePath = join(__dirname, '../models/loans.json');

export async function getAllLoansService(): Promise<ILoan[]> {
    const data = await fs.readFile(loansFilePath, 'utf-8');
    return JSON.parse(data);
}

export async function getLoanByIdService(id: number): Promise<ILoan | null> {
    const data = await fs.readFile(loansFilePath, 'utf-8');
    const loans: ILoan[] = JSON.parse(data);
    return loans.find(loan => loan.id === id) || null;
}

export async function addLoanService(newLoan: ILoan): Promise<ILoan> {
    const data = await fs.readFile(loansFilePath, 'utf-8');
    const loans: ILoan[] = JSON.parse(data);
    loans.push(newLoan);
    await fs.writeFile(loansFilePath, JSON.stringify(loans, null, 2));

    return newLoan;
}

export async function updateLoanService(id: number, updateLoan: Partial<ILoan>): Promise<ILoan | null> {
    const data = await fs.readFile(loansFilePath, 'utf-8');
    const loans: ILoan[] = JSON.parse(data);
    const index = loans.findIndex(loan => loan.id === id);
    if (index === -1) return null;

    const existingLoan = loans[index];
    if (!existingLoan) {
        return null;
    }

    const updatedLoan = {
        ...existingLoan,
        ...updateLoan,
        id: existingLoan.id
    };

    loans[index] = updatedLoan;

    await fs.writeFile(loansFilePath, JSON.stringify(loans, null, 2));
    return updatedLoan;
}

export async function deleteLoanService(id: number): Promise<boolean> {
    const data = await fs.readFile(loansFilePath, 'utf-8');
    const loans: ILoan[] = JSON.parse(data);
    const index = loans.findIndex(loan => loan.id === id);
    if (index === -1) return false;

    loans.splice(index, 1);
    await fs.writeFile(loansFilePath, JSON.stringify(loans, null, 2));
    return true;
}