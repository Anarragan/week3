export interface ILoan {
    id: number;
    book_id: number;
    user_id: number;
    loan_date: Date;
    return_date: Date;
    status: 'ongoing' | 'returned' | 'overdue';
}