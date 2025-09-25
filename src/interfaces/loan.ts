export interface ILoan {
    id: string;
    book_id: string;
    user_id: string;
    loan_date: string;
    return_date: string;
    status: 'ongoing' | 'returned' | 'overdue';
}